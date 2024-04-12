import { getDetailCourse, getListCourses } from "./service";
import styles from "./page.module.scss";
import DetailClinicClient from "./client";
import { parseSlugDetail } from "./service";
import NotFound from "../../not-found/page";
import { PREFIX_IMAGE_URL } from "@/src/const/const";
import { redirect } from "next/navigation";

// export async function generateMetadata({ params, searchParams }) {
//   let detailClinic = null;
//   try {
//     detailClinic = await getDetailClinic(params.slug);
//     if (searchParams?.dichvu) {
//       dataParseSlug = await parseSlugDetail(searchParams?.dichvu);
//     }
//   } catch (error) {
//     console.log(error);
//   }
//   const bannerImage = detailClinic?.image?.find(
//     (item) => item.image_type === "BANNER"
//   );
//   const images = bannerImage ? [`${PREFIX_IMAGE_URL}${bannerImage.key}`] : [];
//   const parsedHtml = detailClinic?.introduce?.replace(/<[^>]+>/g, "");
//   const introduce =
//     parsedHtml?.length > 155 ? parsedHtml.slice(0, 155) : parsedHtml;
//   const siteURL = "https://nhakhoahub.vn";

//   console.log("searchParams", searchParams);
//   //xử lý old slug
//   if (detailClinic && detailClinic?.params_slug) {
//     return {
//       title: detailClinic?.name + " | NhaKhoaHub",
//       description: introduce,
//       openGraph: {
//         images: images,
//       },
//       alternates: searchParams?.dichvu
//         ? {
//           canonical: `${siteURL}/phong-kham/${detailClinic.params_slug}`,
//         }
//         : null,
//     };
//   }
//   return {
//     title: detailClinic?.name + " | NhaKhoaHub",
//     description: introduce,
//     openGraph: {
//       images: images,
//     },
//     alternates:
//       searchParams?.dichvu
//         ? {
//           canonical: `${siteURL}/phong-kham/${params.slug}`,
//         }
//         : null,
//   };
// }

export default async function DetailClinic({ params, searchParams }) {
  let detailCourse = null;
  let listCourse = null;
  // let dataParseSlug = null;

  try {
    detailCourse = await getDetailCourse(params.slug);
    const prototypeCourse = await getListCourses();
    listCourse = prototypeCourse?.filter(item => item.course_id !== parseInt(params.slug))

    //getListCourse loại trừ param ở đây
    // if (searchParams?.dichvu) {
    //   dataParseSlug = await parseSlugDetail(searchParams?.dichvu);
    // }
  } catch (error) {
    console.log(error);
  }
  if (!detailCourse) {
    return <NotFound />;
  }
  //xử lý old slug
  // if (detailClinic.params_slug) {
  //   redirect("/phong-kham/" + detailClinic.params_slug);
  // }

  return (
    <div className={styles.wpPageDetailClinic}>
      <DetailClinicClient
        detailCourse={detailCourse}
        searchParams={params}
        listCourse={listCourse}
        // dataParseSlug={dataParseSlug}
      />
    </div>
  );
}
