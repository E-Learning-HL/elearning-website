import StartExamPage from "./client";
import styles from "./page.module.scss";
import { getOwnedCourse, getCourse } from "../../service";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
export default async function StartExam({ params, searchParams }) {
  const session = await getServerSession(authOptions);
  let dataLesson = null;
  let ownedCourse = null;
  let dataCourse = null;

  async function getData(access_token, slug) {
    const res = await Promise.all([
      getOwnedCourse(access_token),
      getCourse(slug, access_token),
    ]);
    // useStore.setState({ data: res[6] })
    return res;
  }

  try {
    const data = await getData(
      session?.user?.access_token,
      parseInt(params?.slug)
    );
    ownedCourse = data[0];
    dataCourse = data[1];
    dataLesson = dataCourse?.course.section
      .flatMap((section) => section.lesson)
      .find((lesson) => lesson.id === parseInt(params.id));
    console.log("========ownedCourse", ownedCourse);
    console.log("=========dataLesson", dataLesson);
  } catch (error) {
    console.log("error", error);
  }
//   const check = ownedCourse?.find((item) => item.course.id == params.slug);
//   if (!check || !dataLesson) return null;

  return (
    <div className={styles.wpVideoLearning}>
      {/* <StartExamPage dataLesson={dataLesson} dataCourse={dataCourse}/> */}
      <StartExamPage/>
    </div>
  );
}
