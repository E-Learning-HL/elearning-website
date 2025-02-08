import styles from "./page.module.scss";
import LearnPage from "./client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getCourse, getOwnedCourse } from "./service";

export async function generateMetadata({ params, searchParams }) {
  return {
    title: "Learn | S eLearning",
  };
}

export default async function Learn({ params, searchParams }) {
  const session = await getServerSession(authOptions);

  let ownedCourse = null;
  let dataCourse = null;

  try {
    //course id (slug)
    ownedCourse = await getOwnedCourse(session.user.access_token);
    console.log("ownedCourse", ownedCourse);

    dataCourse = await getCourse(params.slug, session.user.access_token);
    console.log("dataCourse", dataCourse);
    // dataCourse = resutlDataCourse;

    // ownedCourse = resultOwnedCourse;
  } catch (error) {
    console.log("error", error);
  }
  const ownedCourseId = ownedCourse?.find(
    (item) => item.course.id == params.slug
  );
  if (!ownedCourseId) return null;

  // const listOwnerCourse = ownedCourse?.map(item => item.id)
  // console.log("listOwnerCourse", listOwnerCourse)

  return (
    <div className={styles.wpLearnPage}>
      <LearnPage dataCourse={dataCourse} ownedCourse={ownedCourse} params={params.slug}/>
    </div>
  );
}
