import { getDetailPostAxios, getDetailClinicAxios } from "../../service";
import BodyGetPost from "./client";
import styles from "@/src/app/blog/[slug]/page.module.scss";
import { PREFIX_IMAGE_URL } from "@/src/const/const";
// import NotFound from "../../../not-found/page"

export async function generateMetadata({ params, searchParams }) {
  let detailPost = null;
  try {
    detailPost = await getDetailPostAxios(params.id);
  } catch (error) {
    console.log(error);
  }
  const bannerImage = detailPost?.image?.find(
    (item) => item.image_type === "INTRODUCE"
  );
  const image = bannerImage ? [`${PREFIX_IMAGE_URL}${bannerImage.key}`] : [];
  const parsedHtml = detailPost.content?.replace(/<[^>]+>/g, "");
  const content =
    parsedHtml?.length > 155 ? parsedHtml.slice(0, 155) : parsedHtml;
  const siteURL = "https://nhakhoahub.vn";

  return {
    title: detailPost.title + " | NhaKhoaHub",
    description: content,
    openGraph: {
      images: image,
    },
    alternates: {
      canonical: `${siteURL}/phong-kham/${params.slug}/tin-tuc/${params.id}`,
    },
  };
}

export default async function GetPost({ params, searchParams }) {
  let dataDetailPost = null;
  let dataDetailClinic = null;

  dataDetailClinic = await getDetailClinicAxios(params.slug);
  if (!dataDetailClinic) {
    return <NotFound />;
  }
  try {
    dataDetailPost = await getDetailPostAxios(params.id);
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <div className={styles.wpListPost}>
        <BodyGetPost
          dataDetailPost={dataDetailPost}
          clinic={dataDetailClinic}
        />
      </div>
    </>
  );
}
