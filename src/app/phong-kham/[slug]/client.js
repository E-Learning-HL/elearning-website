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
import { Col, Row, Progress, Breadcrumb, Modal, Button } from "antd";
import iconAdvise from "@/public/icon/icon-advise.svg";
import defaultImage from "@/public/image/default-thumbnail.jpg";
import "@/src/style/common.css";
import iconClose from "@/public/icon/icon-close.png";
import _ from "lodash";
import iconArrow from "@/public/icon/arrow-float-button.svg";
import chatAlert from "@/public/icon/chat-alert.svg";
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
  detailClinic,
  searchParams,
  dataParseSlug,
}) {
  if (detailClinic.error === "Not Found") {
    return <NotFound />;
  }
  // console.log("detailClinic", detailClinic);
  const cover = detailClinic?.image?.find(
    (item) => item.image_type === IMAGE_TYPE.banner
  );
  const logo = detailClinic?.image?.find(
    (item) => item.image_type === IMAGE_TYPE.avatar
  );
  const avatar = logo ? `${PREFIX_IMAGE_URL}${logo.key}` : defaultImage;
  const workday = detailClinic?.workday?.map((item) => {
    return {
      id: item.weekday.id,
      name: item.weekday.name,
    };
  });
  const [openModal, setOpenModal] = useState(false);
  const [appendChatAlert, setAppendChatAlert] = useState(true);
  useEffect(() => {
    if (openModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [openModal]);

  //get url Breadcrumb address
  let navUrl = "";
  if (searchParams?.dichvu && dataParseSlug?.category_service_name) {
    navUrl += `/${searchParams?.dichvu}`;
  }
  if (detailClinic?.address[0]?.province) {
    navUrl += `/${toSlug(detailClinic?.address[0]?.province?.name)}`;
  }
  if (detailClinic?.address[0]?.district) {
    navUrl += `/${toSlug(detailClinic?.address[0]?.district?.name)}`;
  }
  const debounceScroll = _.debounce((id) => {
    console.log("onSetActive");
    const element_to_scroll_to = document.getElementById(id);
    if (element_to_scroll_to) {
      // element_to_scroll_to.scrollIntoView({
      //   behavior: "smooth",
      // });
      // window.scrollTo(element_to_scroll_to.offsetTop, 0);
      document.getElementById("wp-menu-section").scrollTo({
        left: document.getElementById(id).offsetLeft - 50,
        behavior: "smooth",
      });
    }
  }, 300);
  return (
    <div className={styles.wpDetailClinicDetail}>
      <div className={styles.nav}>
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
      </div>
      <div className={styles.wpSectionCover}>
        <div className={styles.wpCover}>
          <ImageCommon data={cover} style={styles.cover} />
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
          <div className={styles.wpCardAbove}>
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
                  {/* <div className={styles.wpScale}>
                    <Image src={iconScale} className={styles.iconScale} />
                    <div className={styles.titleScale}>Quy mô:</div>
                    <div className={styles.valueScale}>_ cơ sở</div>
                  </div> */}
                  <div className={styles.wpTime}>
                    <Image src={iconWorkTime} className={styles.iconWorkTime} />
                    {/* <div className={styles.titleScale}>Thời gian làm việc:</div> */}
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
          </div>
          <div className={styles.wpCardBelow}>
            <div
              className={`${styles.wpbuttonGetAdvise} button-blue`}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <Image src={iconAdvise} className={styles.iconAdvise} />
              NHẬN TƯ VẤN MIỄN PHÍ
            </div>
          </div>
        </div>
      </div>
      {/* Menu */}
      <div className={`${styles.wpMenu} wp-menu-section`} id="wp-menu-section">
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
      </div>
      {/* section */}
      <div className={styles.wpSection}>
        <div className={styles.wpSectionLeft} id="sectionLeft">
          {/* tong-quan */}
          <div className={styles.wpSectionOverview}>
            <Element name="tong-quan" className="element">
              <div className={styles.titleSection}>Tổng quan</div>
              <div className={styles.dash}></div>
              <div className={styles.wpOverview}>
                <Row gutter={15}>
                  <Col
                    xl={6}
                    xs={24}
                    sm={24}
                    md={6}
                    className={styles.colCircleProgress}
                  >
                    <Progress
                      type="circle"
                      percent={detailClinic?.total_rating * 10}
                      format={(percent) => (
                        <div>
                          <div className={styles.overviewPoint}>
                            {(percent / 10).toFixed(1) == 0
                              ? "-"
                              : (percent / 10).toFixed(1)}
                          </div>
                          <div className={styles.overviewPointText}>
                            {ratingPointToText(
                              detailClinic?.total_rating
                                ? detailClinic?.total_rating
                                : 0.0
                            )}
                          </div>
                        </div>
                      )}
                      strokeColor={STROKE_COLOR}
                      trailColor={TRAIL_COLOR}
                    />
                  </Col>
                  <Col xl={9} xs={24} sm={24} md={9}>
                    <ItemOverviewRating
                      percent={detailClinic?.overview_rating?.infrastructure}
                      name="Cơ sở vật chất"
                    />
                    <ItemOverviewRating
                      percent={detailClinic?.overview_rating?.service_quality}
                      name="Chất lượng dịch vụ"
                    />
                    <ItemOverviewRating
                      percent={detailClinic?.overview_rating?.technology}
                      name="Công nghệ điều trị"
                    />
                    <ItemOverviewRating
                      percent={detailClinic?.overview_rating?.procedure}
                      name="Quy trình làm việc"
                    />
                    <ItemOverviewRating
                      percent={detailClinic?.overview_rating?.infrastructure}
                      name="Thái độ phục vụ"
                    />
                  </Col>
                  <Col xl={9} xs={24} sm={24} md={9}>
                    <ItemOverviewRating
                      percent={detailClinic?.overview_rating?.doctor}
                      name="Đội ngũ bác sỹ"
                    />
                    <ItemOverviewRating
                      percent={detailClinic?.overview_rating?.price}
                      name="Giá cả hợp lý"
                    />
                    <ItemOverviewRating
                      percent={detailClinic?.overview_rating?.guarantee}
                      name="Chế độ bảo hành"
                    />
                    <ItemOverviewRating
                      percent={detailClinic?.overview_rating?.care}
                      name="Chăm sóc sau điều trị"
                    />
                    <ItemOverviewRating
                      percent={detailClinic?.overview_rating?.introduce}
                      name="Sẵn sàng giới thiệu"
                    />
                  </Col>
                </Row>
                <div
                  className={styles.buttonViewReview}
                  onClick={() => {
                    const getElementReview = document.getElementById("review");
                    if (getElementReview) {
                      getElementReview.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Xem đánh giá của {detailClinic?.ratings?.length} khách hàng
                  khác
                </div>
              </div>
            </Element>
          </div>
          {/* thong-tin-chung */}
          <div>
            <Element name="thong-tin-chung" className="element">
              <div className={styles.titleSection}>Thông tin chung</div>
              <div className={styles.dash}></div>
              <InfoCommon detailClinic={detailClinic} />
            </Element>
          </div>
          {/* bang-gia-dich-vu */}
          <div>
            <Element name="bang-gia-dich-vu" className="element">
              <div className={styles.titleSection}>Bảng giá dịch vụ</div>
              <div className={styles.dash}></div>
              {detailClinic.category_service_clinic[0]?.category_service && (
                <Price detailClinic={detailClinic} />
              )}
              {!detailClinic.category_service_clinic[0]?.category_service && (
                <div
                  style={{
                    color: "#2a3467",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "16px",
                    margin: "12px 0px",
                  }}
                >
                  Chưa có thông tin
                </div>
              )}
            </Element>
          </div>
          {/* co-so-vat-chat */}
          <div>
            <Element name="co-so-vat-chat" className="element">
              <div className={styles.titleSection}>Cơ sở vật chất</div>
              <div className={styles.dash}></div>
              <Infrastructure detailClinic={detailClinic} />
            </Element>
          </div>
          {/* tin-tuc */}
          <div>
            <Element name="tin-tuc" className="element">
              <div className={styles.titleSection}>Tin Tức</div>
              <div className={styles.dash}></div>
              <Post detailClinic={detailClinic} />
            </Element>
          </div>
          {/* doi-ngu-bac-si */}
          <div>
            <Element name="doi-ngu-bac-si" className="element">
              <div className={styles.titleSection}>Đội ngũ bác sỹ</div>
              <div className={styles.dash}></div>
              {detailClinic?.doctor?.length ? (
                <Doctor detailClinic={detailClinic} />
              ) : null}
              {!detailClinic?.doctor?.length && (
                <div
                  style={{
                    color: "#2a3467",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "16px",
                    margin: "12px 0px",
                  }}
                >
                  Chưa có thông tin
                </div>
              )}
            </Element>
          </div>
          <div>
            <Element name="vi-tri" className="element">
              <div className={styles.titleSection}>Vị trí</div>
              <div className={styles.dash}></div>
              <Location address={detailClinic?.address} />
            </Element>
          </div>
          <div>
            <Element name="danh-gia" className="element" id="review">
              <div className={styles.titleSection}>Đánh giá</div>
              <div className={styles.dash}></div>
              <Review detailClinic={detailClinic} />
            </Element>
          </div>

          <div>
            <Element name="gioi-thieu" className="element">
              <div className={styles.titleSection}>Giới Thiệu Chi Tiết</div>
              <div className={styles.dash}></div>
              <IntroduceDetail content={detailClinic?.introduce} />
            </Element>
          </div>
        </div>
        <div className={styles.wpChat}>
          <Element name="form-lien-he" className="element formChatBox">
            <ChatBox detailClinic={detailClinic} />
          </Element>
        </div>
        <Modal
          className="wpModalChatBox"
          open={openModal}
          onCancel={() => {
            setOpenModal(false);
          }}
          footer={null}
          closable={false}
          width={380}
          style={{ top: 20 }}
          destroyOnClose={true}
        >
          <div style={{ position: "relative" }}>
            <ChatBox detailClinic={detailClinic} isModal={true} />
            <div
              className="closeModal"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <Image src={iconClose} />
            </div>
          </div>
        </Modal>
      </div>
      <div
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
      </div>
    </div>
  );
}
