import Image from "next/image";
import styles from "./page.module.scss";
import coverHome from "@/public/image/cover-home-page.png";
import FormSearch from "@/src/component/home/form-search";
import PopularTag from "@/src/component/home/popular-tag";
import Header from "@/src/component/header/header";
import Footer from "../component/footer/footer";
import ReputableDT from "../component/home/reputable-dt";
import axios from "axios";
import Frequentlyquest from "../component/frequentlyquest/frequentlyquest";
import RemarkableService from "../component/home/remarkable-service";
import ReviewDentistry from "../component/home/review-dt";
import KnowledgeDentistry from "../component/home/knowledge-dt";
import RegistrationClinic from "../component/home/registration-clinic";
import Feature from "../component/home/feature";
import { searchTopDentistry } from "@/src/component/home/search-province-dt.js";
import { getAllPublicCourse } from "@/src/app/service.js";
import imgabove from "@/public/image/footerimg1.svg";
import { BASE_URL } from "@/src/const/const";

export async function generateMetadata({ params, searchParams }) {
  return {
    title: "HL eLearning",
  };
}
export const revalidate = 5;
export default async function Home() {
  let topCourse = null;
  // let knowledgeDentistryData = null;
  // let reputableData = null;
  try {
    const res = await Promise.all([
      getAllPublicCourse()
    ]);
    topCourse = res[0]
    console.log("=====",topCourse)
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      {/* <Header /> */}
      {/* <Nav name={['trang chu', {name: 'dich vu', link: '/dich-vu'} ]} /> */}
      <main className={styles.wpMain}>
        <div className={styles.wpTop}>
          <div className={styles.wpSectionSearch}>
            <div className={styles.wpContentSearch}>
              <h2 className={styles.title}>
                Nền&nbsp;Tảng <br />
                <span>Học&nbsp;&&nbsp;Luyện Thi</span>
                <br />
                Thông&nbsp;Minh
              </h2>
              {/* <div className={styles.subTitle}>
              Nền tảng review và tìm kiếm nha khoa uy tín hàng đầu Việt Nam
            </div>
            <div className={styles.formSearch}>
              <FormSearch />
            </div> */}
            </div>
            <div className={styles.wpCoverHome}>
              <Image className={styles.coverHome} src={coverHome} alt="cover" />
            </div>
          </div>
        </div>

        {/* <PopularTag />
        {reputableData?.data && (
          <ReputableDT reputableData={reputableData?.data} />
        )}
        <RemarkableService />
        {reviewDentistryData?.data?.result && (
          <ReviewDentistry
            reviewDentistryData={reviewDentistryData?.data?.result}
          />
        )}
        {knowledgeDentistryData?.data?.result && (
          <KnowledgeDentistry
            knowledgeDentistryData={knowledgeDentistryData?.data?.result}
          />
        )}*/}
        
        <Feature />
        <RemarkableService topCourse={topCourse}/>
        <Frequentlyquest /> 
        <RegistrationClinic />
      </main>
    </>
  );
}
