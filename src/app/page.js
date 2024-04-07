import Image from "next/image";
import styles from "./page.module.scss";
import coverHome from "@/public/image/cover-home.jpg";
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
import { searchTopDentistry } from "@/src/component/home/search-province-dt.js";
import { getBlog } from "@/src/app/service.js";
import imgabove from "@/public/image/footerimg1.svg";
import { BASE_URL } from "@/src/const/const";

// export async function generateMetadata({ params, searchParams }) {
//   return {
//     openGraph: {
//       description:
//         "Giúp tìm kiếm và lựa chọn cơ sở nha khoa uy tín, chất lượng tốt nhất. Review hơn 10.000 nha khoa trên toàn quốc từ trải nghiệm thực tế của khách hàng.",
//       images: ["@/public/image/cover-meta.png"],
//     },
//   };
// }

export const revalidate = 5;
export default async function Home() {
  // let reviewDentistryData = null;
  // let knowledgeDentistryData = null;
  // let reputableData = null;
  // try {
  //   const res = await Promise.all([
  //     getBlog(1, "kien-thuc-nha-khoa", 6),
  //     getBlog(1, "review-nha-khoa", 4),
  //     searchTopDentistry(1),
  //   ]);
  //   knowledgeDentistryData = res.length == 3 ? res[0] : null;
  //   reviewDentistryData = res.length == 3 ? res[1] : null;
  //   reputableData = res.length == 3 ? res[2] : null;
  // } catch (error) {
  //   console.log(error);
  // }

  return (
    <>
      {/* <Header /> */}
      {/* <Nav name={['trang chu', {name: 'dich vu', link: '/dich-vu'} ]} /> */}
      <main className={styles.wpMain}>
        <div className={styles.wpSectionSearch}>
          <Image className={styles.coverHome} src={coverHome} alt="cover" />
          <div className={styles.wpContentSearch}>
            <h2 className={styles.title}>
              Tìm Kiếm Nha Khoa Uy&nbsp;Tín Phù&nbsp;Hợp Nhất Với Bạn
            </h2>
            <div className={styles.subTitle}>
              Nền tảng review và tìm kiếm nha khoa uy tín hàng đầu Việt Nam
            </div>
            <div className={styles.formSearch}>
              <FormSearch />
            </div>
          </div>
        </div>
        <h1 className={styles.hiddenH1}>
          NhaKhoaHub - Nền tảng review và tìm kiếm nha khoa uy tín
        </h1>
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
        )}
        <Frequentlyquest /> */}
        <RegistrationClinic />
      </main>
    </>
  );
}
