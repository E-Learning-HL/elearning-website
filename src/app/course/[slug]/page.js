import { getDetailCourse, getListCourses } from "./service";
import styles from "./page.module.scss";
import DetailClinicClient from "./client";
import { parseSlugDetail } from "./service";
import NotFound from "../../not-found/page";
import { PREFIX_IMAGE_URL } from "@/src/const/const";
import { redirect } from "next/navigation";


export async function generateMetadata({ params, searchParams }) {
  return {
    title: "Khóa học | HL eLearning",
  };
}

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
