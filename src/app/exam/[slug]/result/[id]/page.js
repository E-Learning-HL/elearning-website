import ResultExamPage from "./client";
import NotFound from "@/src/app/not-found/page";
import styles from "./page.module.scss";
import { getOwnedCourse, getResultTest } from "../../service";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function generateMetadata({ params, searchParams }) {
    return {
      title: "Exam result | S eLearning",
    };
  }
  
export default async function ResultExam({ params, searchParams }){
    console.log("paramsss", params)
    const session = await getServerSession(authOptions);
    let dataResultTest = null;
    let ownedCourse = null;
    // let dataAllTests = null;
    async function getData(access_token, id) {
        const res = await Promise.all([
          getOwnedCourse(access_token),
          getResultTest(id, access_token),
        ]);
        // useStore.setState({ data: res[6] })
        return res;
      }
    
      try {
        const data = await getData(
          session?.user?.access_token,
          parseInt(params?.id)
        );
        ownedCourse = data[0];
        dataResultTest = data[1];
        // console.log("========ownedCourse", ownedCourse);
        // console.log("=========dataLesson", dataTests);
      } catch (error) {
        console.log("error", error);
      }
      const check = ownedCourse?.find((item) => item.course.id == params.slug);
      if (!check || !dataResultTest) return <NotFound />;
    return(
        <div className={styles.wpResultExam}>
            <ResultExamPage dataResultTest={dataResultTest} slug={params.slug}/>
        </div>
    );
}