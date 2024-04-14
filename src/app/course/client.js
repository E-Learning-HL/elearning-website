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
                    {/* <div style={{ display: "flex" }}>
                      <div className="dentistryLogo">
                        <ImageCommon data={logo} style="img" />
                      </div>
                      <div className="dentistryDetails">
                        <div className="coverContainer">
                          <h4 className="dentistryName">{data.name}</h4>
                        </div>
                        <div className="wpRatingLine">
                          {data?.average_rating != 0 && (
                            <div className="wpPoint">
                              <div className="ratingPoint">
                                <div className="point">
                                  {data?.average_rating
                                    ? data?.average_rating.toFixed(1)
                                    : 0.0}
                                </div>
                                <Image
                                  className="iconRatingStar"
                                  src={iconRatingStar}
                                  alt="icon"
                                />
                              </div>
                              <div className="ratingRank">
                                {ratingPointToText(
                                  data?.average_rating
                                    ? data?.average_rating.toFixed(1)
                                    : 0.0
                                )}
                              </div>
                              <div className="dash"></div>
                            </div>
                          )}
                          <div className="count">
                            <div className="ratingQuantity">
                              <span className="ratingQuantityBold">
                                {data?.number_rating}
                              </span>
                              Đánh giá
                            </div>
                            <div className="dash"></div>
                            <div className="numberOfConsultation">
                              <span className="numberOfConsultationBold">
                                {data?.total_contact}
                              </span>
                              Người đã nhận tư vấn
                            </div>
                          </div>
                        </div>
                        <div className="dentistryContainer">
                          <div className="dentistryAT">
                            <Image
                              src={iconlocation}
                              className="icon"
                              alt="icon"
                            ></Image>
                            <p>{data.district[0]}</p>
                          </div>
                          <div className="dentistryAT">
                            <Image
                              src={icontime}
                              className="icon"
                              alt="icon"
                            ></Image>
                            <p>
                              {data.time_start} - {data.time_end}
                            </p>
                          </div>
                        </div>
                        <div className="thirdLineTag">
                          <div
                            className="buttonAdvise button-white"
                            onClick={(e) => {
                              setOpenModal(true);
                              e.stopPropagation();
                            }}
                          >
                            Nhận tư vấn
                          </div>
                          <Link
                            href={"/phong-kham/" + data?.slug}
                            className="buttonDetail button-blue"
                          >
                            Xem chi tiết
                          </Link>
                        </div>
                      </div>
                    </div> */}
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
