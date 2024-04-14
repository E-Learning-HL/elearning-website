import styles from "./page.module.scss";
import ExamPage from "./client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getAllTest, getOwnedCourse } from "./service";

export default async function Exam({ params, searchParams }) {
  const session = await getServerSession(authOptions);

  let ownedCourse = null;
  let dataAllTest = null;

  try {
    //course id (slug)
    ownedCourse = await getOwnedCourse(session.user.access_token);
    console.log("ownedCourse", ownedCourse);

    dataAllTest = await getAllTest(params.slug, session.user.access_token);
    // console.log("dataCourse", dataCourse);
    // dataCourse = resutlDataCourse;

    // ownedCourse = resultOwnedCourse;
  } catch (error) {
    console.log("error", error);
  }
  const ownedCourseId = ownedCourse?.find(
    (item) => item.course.id == params.slug
  );
  if (!ownedCourseId) return null;
  if (!dataAllTest) return null;
  // const listOwnerCourse = ownedCourse?.map(item => item.id)
  // console.log("listOwnerCourse", listOwnerCourse)

  return (
    <div className={styles.wpLearnPage}>
      <ExamPage ownedCourse={ownedCourse} dataAllTest={dataAllTest}/>
    </div>
  );
}
