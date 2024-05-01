"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import { IMAGE_TYPE } from "@/src/const/const";
import imgabove from "@/public/image/footerimg1.svg";
import imgbelow from "@/public/image/footerimg2.svg";
import imgaboveMobile from "@/public/image/footerimgMobile1.svg";
import imgbelowMobile from "@/public/image/footerimgMobile2.svg";
import iconLocation from "@/public/icon/icon-location.svg";
import iconScale from "@/public/icon/icon-scale.svg";
import iconWorkTime from "@/public/icon/icon-work-time.svg";
import { formatWorkingDays, ratingPointToText, toSlug } from "@/src/util/util";
import { Col, Row, Progress, Breadcrumb, Modal, Button, Collapse } from "antd";
import iconAdvise from "@/public/icon/icon-advise.svg";
import defaultImage from "@/public/image/default-thumbnail.jpg";
import "@/src/style/common.css";
import iconClose from "@/public/icon/icon-close.png";
import _ from "lodash";
import iconArrow from "@/public/icon/arrow-float-button.svg";
import chatAlert from "@/public/icon/chat-alert.svg";
import Comment from "../../../component/facebook-plugin/comment";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Link as LinkScroll,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import "@/src/style/chi-tiet.css";
import { STROKE_COLOR, TRAIL_COLOR, PREFIX_IMAGE_URL } from "@/src/const/const";
import InfoCommon from "@/src/component/detail/info-common";
import Price from "@/src/component/detail/price";
import Location from "@/src/component/detail/location";
import Infrastructure from "@/src/component/detail/infrastructure";
import Doctor from "@/src/component/detail/doctor";
import ImageCommon from "@/src/component/image/image";
import iconRatingStar from "@/public/icon/icon-rating-star.svg";
import ItemOverviewRating from "@/src/component/detail/item-overview-rating";
import Review from "@/src/component/detail/review";
import IntroduceDetail from "@/src/component/detail/introduce-detail";
import ChatBox from "@/src/component/detail/chatbox";
import Link from "next/link";
import NotFound from "../../not-found/page";
import Post from "@/src/component/detail/post";
import iconBuy from "@/public/icon/icon-buy.png";
import iconAmount from "@/public/icon/icon-amount.png";
import iconCountdown from "@/public/icon/icon-countdown.png";
import iconBooks from "@/public/icon/icon-books.png";
import iconAmountTest from "@/public/icon/icon-test.png";
import iconListening from "@/public/icon/icon-headphone.png";
import iconWriting from "@/public/icon/icon-writing.png";
import iconWritingAi from "@/public/icon/icon-writing-ai.png";
import iconSpeaking from "@/public/icon/icon-speaking.png";
import iconSpeakingAi from "@/public/icon/icon-speaking-ai.png";
import iconReading from "@/public/icon/icon-reading.png";

const dataMenuSection = [
  { id: "tong-quan", name: "Tổng quan" },
  { id: "thong-tin-chung", name: "Thông tin chung" },
  { id: "bang-gia-dich-vu", name: "Bảng giá dịch vụ" },
  { id: "co-so-vat-chat", name: "Cơ sở vật chất" },
  { id: "tin-tuc", name: "Tin tức" },
  { id: "doi-ngu-bac-si", name: "Đội ngũ bác sỹ" },
  { id: "vi-tri", name: "Vị trí" },
  { id: "danh-gia", name: "Đánh giá" },
  { id: "gioi-thieu", name: "Giới thiệu chi tiết" },
];
export default function DetailClinicClient({
  detailCourse,
  searchParams,
  listCourse,
  // dataParseSlug,
}) {
  if (detailCourse.error === "Not Found") {
    return <NotFound />;
  }
  const router = useRouter();
  const { Panel } = Collapse;

  const { data } = useQuery({
    queryKey: ["api-common"],
  });
  const listMyCourse = data.allMyCourse.map(item => {
    return item?.course?.id
  })
  const hasThisCourse = listMyCourse.includes(detailCourse.id)
  // console.log("detailClinic", detailClinic);
  // const cover = detailClinic?.image?.find(
  //   (item) => item.image_type === IMAGE_TYPE.banner
  // );
  // const logo = detailClinic?.image?.find(
  //   (item) => item.image_type === IMAGE_TYPE.avatar
  // );
  // const avatar = logo ? `${PREFIX_IMAGE_URL}${logo.key}` : defaultImage;
  // const workday = detailClinic?.workday?.map((item) => {
  //   return {
  //     id: item.weekday.id,
  //     name: item.weekday.name,
  //   };
  // });
  // const [openModal, setOpenModal] = useState(false);
  // const [appendChatAlert, setAppendChatAlert] = useState(true);
  // useEffect(() => {
  //   if (openModal) {
  //     document.body.classList.add("modal-open");
  //   } else {
  //     document.body.classList.remove("modal-open");
  //   }
  //   return () => {
  //     document.body.classList.remove("modal-open");
  //   };
  // }, [openModal]);

  // //get url Breadcrumb address
  // let navUrl = "";
  // if (searchParams?.dichvu && dataParseSlug?.category_service_name) {
  //   navUrl += `/${searchParams?.dichvu}`;
  // }
  // if (detailClinic?.address[0]?.province) {
  //   navUrl += `/${toSlug(detailClinic?.address[0]?.province?.name)}`;
  // }
  // if (detailClinic?.address[0]?.district) {
  //   navUrl += `/${toSlug(detailClinic?.address[0]?.district?.name)}`;
  // }
  // const debounceScroll = _.debounce((id) => {
  //   console.log("onSetActive");
  //   const element_to_scroll_to = document.getElementById(id);
  //   if (element_to_scroll_to) {
  //     // element_to_scroll_to.scrollIntoView({
  //     //   behavior: "smooth",
  //     // });
  //     // window.scrollTo(element_to_scroll_to.offsetTop, 0);
  //     document.getElementById("wp-menu-section").scrollTo({
  //       left: document.getElementById(id).offsetLeft - 50,
  //       behavior: "smooth",
  //     });
  //   }
  // }, 300);
  return (
    <div className={styles.wpDetailClinicDetail}>
      {/* <div className={styles.nav}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">Trang Chủ</Link>
          </Breadcrumb.Item>
          {searchParams?.dichvu && dataParseSlug?.category_service_name && (
            <Breadcrumb.Item>
              <Link href={`/${searchParams?.dichvu}`}>
                {dataParseSlug?.category_service_name}
              </Link>
            </Breadcrumb.Item>
          )}
          {(detailClinic?.address[0]?.district ||
            detailClinic?.address[0]?.province) && (
              <Breadcrumb.Item>
                <Link href={navUrl}>
                  {detailClinic?.address[0]?.district?.name}
                  {detailClinic?.address[0]?.district &&
                    detailClinic?.address[0]?.province &&
                    ", "}
                  {detailClinic?.address[0]?.province?.name}
                </Link>
              </Breadcrumb.Item>
            )}
          <Breadcrumb.Item>
            <Link href="">{detailClinic?.name}</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div> */}
      <div className={styles.wpSectionCover}>
        <div className={styles.wpCover}>
          <ImageCommon data={detailCourse?.file[0]?.url} style={styles.cover} />
        </div>
        <Image className={styles.imgAbove} src={imgabove} alt="image" />
        <Image className={styles.imgBelow} src={imgbelow} alt="image" />
        <Image
          className={styles.imgAboveMobile}
          src={imgaboveMobile}
          alt="image"
        />
        <Image
          className={styles.imgBelowMobile}
          src={imgbelowMobile}
          alt="image"
        />
      </div>
      <div className={styles.wpLineCard}>
        <div className={styles.wpCardInfo}>
          {/* <div className={styles.wpCardAbove}>
            <div className={styles.wpCardLeft}>
              <ImageCommon data={logo} style={styles.logo} />
            </div>
            <div className={styles.wpCardRight}>
              <div className={styles.clinicName}>{detailClinic?.name}</div>
              <div className={styles.wpAddress}>
                <Image src={iconLocation} className={styles.iconLocation} />
                <div>{detailClinic?.address[0]?.detail_address}</div>
              </div>
              <div className={styles.wpRatingLine}>
                <div className={styles.wpPoint}>
                  <div className={styles.ratingPoint}>
                    <div className={styles.point}>
                      {detailClinic?.total_rating
                        ? detailClinic?.total_rating
                        : 0.0}
                    </div>
                    <Image
                      className={styles.iconRatingStar}
                      src={iconRatingStar}
                      alt="icon rating start"
                    />
                  </div>
                  {detailClinic?.total_rating ? (
                    <div className={styles.dash}></div>
                  ) : null}
                  <div className={styles.ratingRank}>
                    {ratingPointToText(
                      detailClinic?.total_rating
                        ? detailClinic?.total_rating
                        : 0.0
                    )}
                  </div>
                  <div className={styles.dash}></div>
                </div>
                <div className={styles.wpCount}>
                  <div className={styles.ratingQuantity}>
                    <span className={styles.ratingQuantityBold}>
                      {detailClinic?.number_rating
                        ? detailClinic?.number_rating
                        : 0}
                    </span>
                    Đánh giá
                  </div>
                  <div className={styles.dash}></div>
                  <div className={styles.numberOfConsultation}>
                    <span className={styles.numberOfConsultationBold}>
                      {detailClinic?.total_contact}
                    </span>
                    Người đã nhận tư vấn
                  </div>
                </div>
              </div>
              <Row className={styles.wpLastLine}>
                <Col xl={14}>
                  <div className={styles.wpTime}>
                    <Image src={iconWorkTime} className={styles.iconWorkTime} />
                    {detailClinic?.time_note ? (
                      <div className={styles.valueScale}>
                        <b>Thời gian làm việc:&nbsp;&nbsp;</b>
                        {detailClinic?.time_note}
                      </div>
                    ) : (
                      <div className={styles.valueScale}>
                        <b>Thời gian làm việc:&nbsp;&nbsp;</b>
                        {detailClinic?.time_start} - {detailClinic?.time_end},{" "}
                        {workday?.length > 0 ? formatWorkingDays(workday) : ""}
                      </div>
                    )}
                  </div>
                </Col>
                <Col xl={10} className={styles.wpButton}>
                  <div
                    className={`${styles.wpbuttonGetAdvise} button-blue`}
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    <Image src={iconAdvise} className={styles.iconAdvise} />
                    NHẬN TƯ VẤN MIỄN PHÍ
                  </div>
                </Col>
              </Row>
            </div>
          </div> */}
          <div className={styles.courseTitle}>{detailCourse?.nameCourse}</div>
          <div className={styles.wpCardBelow}>
            <div className={styles.wpbuttonPrice}>
              Giá: {detailCourse?.price.toLocaleString("en-US")}
            </div>
            <div
              className={`${styles.wpbuttonGetAdvise} button-blue`}
              onClick={() => {
                router.push( hasThisCourse ? `/learn/${detailCourse.id}` : `/build-roadmap?start_point=${detailCourse?.start}&target_point=${detailCourse?.target}`
                  
                );
              }}
              style={{ cursor:'pointer' }}
            >
              <Image src={iconBuy} className={styles.iconAdvise} />
              {hasThisCourse? 'HỌC NGAY' : 'ĐĂNG KÝ NGAY'}
            </div>
          </div>
        </div>
      </div>
      {/* Menu */}
      {/* <div className={`${styles.wpMenu} wp-menu-section`} id="wp-menu-section">
        {dataMenuSection.map((item, index) => {
          return (
            <LinkScroll
              activeClass="active"
              className="wp-item-menu"
              to={item.id}
              spy={true}
              smooth={true}
              duration={500}
              // offset={0}
              offset={-56}
              ignoreCancelEvents={true}
              onSetActive={() => {
                debounceScroll(item.id);
              }}
            >
              <div className="item-menu" id={item.id}>
                {item.name}
              </div>
            </LinkScroll>
          );
        })}
      </div> */}
      {/* section */}
      <div className={styles.wpDetail}>
        <div className={styles.wpSection}>
          <Row gutter={[{ md: 25, xl: 30 }, 10]}>
            <Col xl={16} xs={24} sm={24} md={14} className={styles.wpColRight}>
              {/* <SearchResult
              searchParams={searchParams}
              searchResult={searchResult}
            /> */}
              <div className={styles.wpContentCourses}>
                <div className={styles.wpItemCourse}>
                  <div
                    className={styles.titleCourse}
                    dangerouslySetInnerHTML={{
                      __html: detailCourse?.introduce,
                    }}
                  ></div>
                  <div className={styles.overView}>
                    <Row gutter={[15, 15]}>
                      <Col xl={12}>
                        <div className={styles.items}>
                          <Image
                            className={styles.imageItems}
                            src={iconBooks}
                          ></Image>
                          <div className={styles.contentItems}>
                            <div className={styles.titleItems}>
                              Number of lessons
                            </div>
                            <div className={styles.valueItems}>
                              {detailCourse?.lessonCount}
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col xl={12}>
                        <div className={styles.items}>
                          <Image
                            className={styles.imageItems}
                            src={iconAmountTest}
                          ></Image>
                          <div className={styles.contentItems}>
                            <div className={styles.titleItems}>
                              Number of assignments
                            </div>
                            <div className={styles.valueItems}>100+</div>
                          </div>
                        </div>
                      </Col>
                      <Col xl={12}>
                        <div className={styles.items}>
                          <Image
                            className={styles.imageItems}
                            src={iconWritingAi}
                          ></Image>
                          <div className={styles.contentItems}>
                            <div className={styles.titleItems}>
                              AI grading listening
                            </div>
                            <div className={styles.valueItems}>Unlimited</div>
                          </div>
                        </div>
                      </Col>
                      <Col xl={12}>
                        <div className={styles.items}>
                          <Image
                            className={styles.imageItems}
                            src={iconSpeakingAi}
                          ></Image>
                          <div className={styles.contentItems}>
                            <div className={styles.titleItems}>
                              AI grading speaking
                            </div>
                            <div className={styles.valueItems}>Unlimited</div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className={`${styles.wpCurri} wp-curri-detail`}>
                    <Collapse defaultActiveKey={1}>
                      <Panel header="CURRICULUM" key={1}>
                        <Row gutter={[15, 15]}>
                          <Col xl={12}>
                            <div className={styles.itemCurri}>
                              <Image
                                src={iconListening}
                                className={styles.imageCurri}
                              ></Image>
                              <div className={styles.contentCurri}>
                                <div className={styles.titleCurri}>
                                  Listening
                                </div>
                                <div className={styles.valueCurri}>
                                  {detailCourse.listening}
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col xl={12}>
                            <div className={styles.itemCurri}>
                              <Image
                                src={iconSpeaking}
                                className={styles.imageCurri}
                              ></Image>
                              <div className={styles.contentCurri}>
                                <div className={styles.titleCurri}>
                                  Speaking
                                </div>
                                <div className={styles.valueCurri}>
                                  {detailCourse.speaking}
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col xl={12}>
                            <div className={styles.itemCurri}>
                              <Image
                                src={iconReading}
                                className={styles.imageCurri}
                              ></Image>
                              <div className={styles.contentCurri}>
                                <div className={styles.titleCurri}>Reading</div>
                                <div className={styles.valueCurri}>
                                  {detailCourse.reading}
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col xl={12}>
                            <div className={styles.itemCurri}>
                              <Image
                                src={iconWriting}
                                className={styles.imageCurri}
                              ></Image>
                              <div className={styles.contentCurri}>
                                <div className={styles.titleCurri}>Writing</div>
                                <div className={styles.valueCurri}>
                                  {detailCourse.writing}
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  </div>
                </div>
                {/* <div className={styles.facebook_plugin}>
                  <Comment dataHref={params?.slug} />
                </div> */}
              </div>
            </Col>
            <Col xl={8} xs={24} sm={24} md={10}>
              <div className={styles.wpColFilter} id="wpCol">
                <div className={styles.ortherCourses}>
                  <div className={styles.title}>Khóa học khác</div>
                  <div className={styles.listItem}>
                    {/* map here */}
                    {listCourse?.map((item) => {
                      return (
                        <Link href={`/course/${item.course_id}`}>
                        <div className={styles.item}>
                          <ImageCommon
                            data={item?.url}
                            style={styles.imageOtherCourse}
                          ></ImageCommon>
                          <div className={styles.courseTitle}>
                            {item?.course_name_course}
                          </div>
                        </div>
                        </Link>
                        
                      );
                    })}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* <div
        className={styles.floatButton}
        onClick={() => {
          setOpenModal(true);
          setAppendChatAlert(false);
        }}
      >
        <Image unoptimized src={avatar} width={72} height={72} />
        <Image src={iconArrow} className={styles.arrowFloatButton} />
        {appendChatAlert && (
          <Image src={chatAlert} className={styles.chatAlert} />
        )}
      </div> */}
    </div>
  );
}
