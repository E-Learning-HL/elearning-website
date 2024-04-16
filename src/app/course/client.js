"use client";
import Image from "next/image";
import { Col, Row, Skeleton } from "antd";
import { MARKER_HL } from "@/src/const/const";
import Link from "next/link";
import "@/src/style/all-course.css";
import ImageCommon from "@/src/component/image/image";
import imageTest from "@/public/image/cover-meta.png";

export default function AllCoursePage({listCourse}) {
    console.log("listCourse", listCourse)
  return (
    <div className="wp-allcourse">
      <div className="wpRemarkableServiceContent">
        <Row
          gutter={[
            { xs: 14, sm: 14, md: 20, xl: 30 },
            { xs: 14, sm: 14, md: 20, xl: 30 },
          ]}
          className={"listRemarkableService"}
        >
          {MARKER_HL.map((item) => (
            <Col xs={12} sm={12} md={6} xl={6}>
              <div className="itemService block-animation">
                <div className="itemImage">
                  <Image
                    src={item.link}
                    className="serviceImage"
                    alt="image"
                  ></Image>
                </div>
                <div className="itemTitle">
                  <h3>{item.name}</h3>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div className="wpListCourse">
        <div>
          <h2>Danh sách khóa học</h2>
        </div>
        <div className="line"></div>
        <div className="listDentistry">
          <Row gutter={[{ xl: 20, md: 20, xs: 0, sm: 20 }, 30]}>
            {listCourse?.map((item, index) => (
              <Col xs={24} sm={24} md={8} xl={8} key={item.course_id}>
                <div
                  className="dentistryItem block-animation-darker"
                //   onClick={() => onShowDetail(data?.slug)}
                >
                  <ImageCommon data={item?.url} style="dentistryImg" />
                  <div className="dentistryInfo">
                    <div className="titleCourse">{item?.course_name_course}</div>
                    <div className="buttonMobile">
                      <div
                        className="buttonAdvise"
                      >
                        Giá : {item?.course_price?.toLocaleString("en-US")}
                      </div>
                      <Link
                        href={"/course/" + item.course_id}
                        // href={"/"}
                        className="buttonDetail button-blue"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
