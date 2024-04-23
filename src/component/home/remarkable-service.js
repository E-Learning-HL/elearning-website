"use client";
import Image from "next/image";
import { Col, Row } from "antd";
import { START_POINT, TARGET_POINT } from "@/src/const/const";
import styles from "@/src/component/home/remarkable-service.module.scss";
import * as NProgress from "nprogress";
import { toSlug } from "@/src/util/util";
import Link from "next/link";
import iconLesson from "@/public/icon/icon-lesson-home.svg";
import iconTests from "@/public/icon/icon-tests-home.svg";
import iconRightGreen from "@/public/icon/icon-right-green.svg";
import ImageCommon from "../image/image";

export default function RemarkableService(props) {
  console.log(props);
  const data = props.topCourse?.slice(0, 4);
  const itemArray = data?.map((item) => {
    const start = START_POINT.find(
      (items) => items.value == item?.course_start
    )?.lable;
    const target = TARGET_POINT.find(
      (items) => items.value == item?.course_target
    )?.lable;
    return (
      <Col xs={12} sm={12} md={6} xl={6}>
        <Link
          href={"/course/" + item.course_id}
          className={`${styles.itemService} `}
        >
          <div className={styles.itemImage}>
            {/* image of course */}
            <ImageCommon
              data={item.url}
              style={styles.serviceImage}
              alt="image"
            ></ImageCommon>
          </div>
          <div className={styles.itemTitle}>
            <h3>{item.course_name_course}</h3>
            <div className={styles.level}>
              <span>Level:&nbsp;</span>&nbsp;{start}&nbsp;-&nbsp;{target}
            </div>
            <div className={styles.statistic}>
              <div className={styles.wpLesson}>
                <Image src={iconLesson} width={12} height={12}></Image>
                &nbsp;{item.countlesson}&nbsp; lessons
              </div>
              <div className={styles.wpLesson}>
                <Image src={iconTests} width={12} height={12}></Image>&nbsp;
                100+ tests
              </div>
            </div>
            <div className={`${styles.detail} button-blue`}>Xem chi tiết</div>
          </div>
        </Link>
      </Col>
    );
  });

  return (
    <div className={styles.wpRemarkableService}>
      <div className={styles.wpRemarkableServiceContent}>
        <div className={styles.wpTitle}>
          <h2>Khóa học nổi bật!</h2>
          <Link href={"/course"}>
            <div className={styles.seeMore}>
              Xem thêm
              <Image
                src={iconRightGreen}
                width={20}
                height={20}
                style={{ marginLeft: "8px" }}
              ></Image>
            </div>
          </Link>

          {/* <div className={styles.line}></div> */}
        </div>
        <Row
          gutter={[
            { xs: 14, sm: 14, md: 20, xl: 30 },
            { xs: 14, sm: 14, md: 20, xl: 30 },
          ]}
          className={styles.listRemarkableService}
        >
          {itemArray}
        </Row>
      </div>
    </div>
  );
}
