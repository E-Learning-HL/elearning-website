import { getDetailClinic, getDetailClinicAxios } from "./service";
import styles from "./page.module.scss";
import DetailClinicClient from "./client";
import { parseSlugDetail } from "./service";
import NotFound from "../../not-found/page";
import { PREFIX_IMAGE_URL } from "@/src/const/const";
import { redirect } from "next/navigation";

export async function generateMetadata({ params, searchParams }) {
  let detailClinic = null;
  try {
    detailClinic = await getDetailClinic(params.slug);
    if (searchParams?.dichvu) {
      dataParseSlug = await parseSlugDetail(searchParams?.dichvu);
    }
  } catch (error) {
    console.log(error);
  }
  const bannerImage = detailClinic?.image?.find(
    (item) => item.image_type === "BANNER"
  );
  const images = bannerImage ? [`${PREFIX_IMAGE_URL}${bannerImage.key}`] : [];
  const parsedHtml = detailClinic?.introduce?.replace(/<[^>]+>/g, "");
  const introduce =
    parsedHtml?.length > 155 ? parsedHtml.slice(0, 155) : parsedHtml;
  const siteURL = "https://nhakhoahub.vn";

  console.log("searchParams", searchParams);
  //xử lý old slug
  if (detailClinic && detailClinic?.params_slug) {
    return {
      title: detailClinic?.name + " | NhaKhoaHub",
      description: introduce,
      openGraph: {
        images: images,
      },
      alternates: searchParams?.dichvu
        ? {
          canonical: `${siteURL}/phong-kham/${detailClinic.params_slug}`,
        }
        : null,
    };
  }
  return {
    title: detailClinic?.name + " | NhaKhoaHub",
    description: introduce,
    openGraph: {
      images: images,
    },
    alternates:
      searchParams?.dichvu
        ? {
          canonical: `${siteURL}/phong-kham/${params.slug}`,
        }
        : null,
  };
}

export default async function DetailClinic({ params, searchParams }) {
  // const id = params.slug.match(/cid+\d+/)[0].replace("cid", "");
  // const slug = params.slug.replace(/-cid+\d+/, "");
  let detailClinic = null;
  let dataParseSlug = null;

  try {
    detailClinic = await getDetailClinicAxios(params.slug);

    if (searchParams?.dichvu) {
      dataParseSlug = await parseSlugDetail(searchParams?.dichvu);
    }
  } catch (error) {
    console.log(error);
  }
  if (!detailClinic) {
    return <NotFound />;
  }
  //xử lý old slug
  if (detailClinic.params_slug) {
    redirect("/phong-kham/" + detailClinic.params_slug);
  }

  return (
    <div className={styles.wpPageDetailClinic}>
      <DetailClinicClient
        detailClinic={detailClinic}
        searchParams={searchParams}
        dataParseSlug={dataParseSlug}
      />
    </div>
  );
}
