import styles from "./page.module.scss";
import coverCoursePage from "@/public/image/cover_course_page.png"
import Image from "next/image";
import AllCoursePage from "./client";
import { getListCourse } from "./service";

export async function generateMetadata({ params, searchParams }) {
  return {
    title: "Khóa học | HL eLearning",
  };
}

export default async function AllCourses() {
let listCourse = null;
try {
    listCourse = await getListCourse()
} catch (error) {
    
}
  return (
    <div className={styles.wpAllCourse}>
      <div className={styles.wpSectionSearch}>
        <Image className={styles.coverHome} src={coverCoursePage} alt="cover" />
        <div className={styles.wpContentSearch}>
          <h2 className={styles.title}>
            Học IELTS Online Cam&nbsp;Kết Đầu&nbsp;Ra
          </h2>
          {/* <div className={styles.subTitle}>
            Nền tảng review và tìm kiếm nha khoa uy tín hàng đầu Việt Nam
          </div> */}
          {/* <div className={styles.formSearch}>
          </div> */}
        </div>
      </div>
      <AllCoursePage listCourse={listCourse}/>
    </div>
  );
}
