"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as NProgress from "nprogress";
import iconlocation from "@/public/icon/icon-location-blue.svg";
import iconright from "@/public/icon/icon-right.svg";
import icontime from "@/public/icon/icon-clock.svg";
// import dentistryimage from "@/public/image/test/dentistryimg.png";
// import dentistrylg from "@/public/image/test/dentistrylogo.png";
import styles from "@/src/component/home/item-dt.module.scss";
import defaulThumbnail from "@/public/image/default-thumbnail.jpg";
import { IMAGE_TYPE } from "@/src/const/const";
import ImageCommon from "@/src/component/image/image";
import iconRatingStar from "@/public/icon/icon-rating-star.svg";
import { wrapperRouterPush, ratingPointToText } from "@/src/util/util";
import ChatBox from "@/src/component/detail/chatbox";
import iconClose from "@/public/icon/icon-close.png";
import { Modal } from "antd";
import { useState, useEffect } from "react";
import "@/src/component/detail/detail.scss";
import Link from "next/link";

export default function ItemDT({ data }) {
  const images = data.image;

  // let dentistrylg = null;
  // let dentistryimage = null;

  // for (const image of images) {
  //   if (image.image_type == "AVATAR") {
  //     dentistrylg = image?.link;
  //   } else if (image.image_type == "BANNER") {
  //     dentistryimage = image?.link;
  //   }
  // }
  const cover = data?.image?.find(
    (item) => item.image_type == IMAGE_TYPE.banner
  );
  const logo = data?.image?.find(
    (item) => item.image_type == IMAGE_TYPE.avatar
  );
  const router = useRouter();
  const onShowDetail = (slug) => {
    wrapperRouterPush(router, `/phong-kham/${slug}`);
  };
  const [openModal, setOpenModal] = useState(false);

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

  return (
    <div style={{ height: "100%" }}>
      <div
        className={`${styles.dentistryItem} block-animation-darker`}
        onClick={() => onShowDetail(data?.slug)}
      >
        {/* <Image
          className={styles.dentistryImg}
          src={dentistryimage ? dentistryimage : defaulThumbnail}
          alt="Landscape picture"
          fill={true}
          placeholder="empty"
          unoptimized
        ></Image> */}
        <ImageCommon data={cover} style={styles.dentistryImg} />
        <div className={styles.dentistryInfo}>
          <div style={{ display: "flex" }}>
            <div className={styles.dentistryLogo}>
              {/* <Image
              src={dentistrylg ? dentistrylg : defaulThumbnail}
              className={styles.img}
              alt="Landscape picture"
              fill={true}
            ></Image> */}
              <ImageCommon data={logo} style={styles.img} />
            </div>
            <div className={styles.dentistryDetails}>
              <div className={styles.coverContainer}>
                {/* <Image
                src={dentistrylg ? dentistrylg : defaulThumbnail}
                className={styles.imgmobile}
                fill={true}
              ></Image> */}
                <h4 className={styles.dentistryName}>{data.name}</h4>
              </div>
              <div className={styles.wpRatingLine}>
                {data?.average_rating != 0 && (
                  <div className={styles.wpPoint}>
                    <div className={styles.ratingPoint}>
                      <div className={styles.point}>
                        {data?.average_rating
                          ? data?.average_rating.toFixed(1)
                          : 0.0}
                      </div>
                      <Image
                        className={styles.iconRatingStar}
                        src={iconRatingStar}
                        alt="icon"
                      />
                    </div>
                    <div className={styles.ratingRank}>
                      {ratingPointToText(
                        data?.average_rating
                          ? data?.average_rating.toFixed(1)
                          : 0.0
                      )}
                    </div>
                    <div className={styles.dash}></div>
                  </div>
                )}
                <div className={styles.count}>
                  <div className={styles.ratingQuantity}>
                    <span className={styles.ratingQuantityBold}>
                      {data?.number_rating}
                    </span>
                    Đánh giá
                  </div>
                  <div className={styles.dash}></div>
                  <div className={styles.numberOfConsultation}>
                    <span className={styles.numberOfConsultationBold}>
                      {data?.total_contact}
                    </span>
                    Người đã nhận tư vấn
                  </div>
                </div>
              </div>
              <div className={styles.dentistryContainer}>
                <div className={styles.dentistryAT}>
                  <Image
                    src={iconlocation}
                    className={styles.icon}
                    alt="icon"
                  ></Image>
                  <p>{data.district[0]}</p>
                </div>
                <div className={styles.dentistryAT}>
                  <Image
                    src={icontime}
                    className={styles.icon}
                    alt="icon"
                  ></Image>
                  <p>
                    {data.time_start} - {data.time_end}
                  </p>
                </div>
              </div>
              <div className={styles.thirdLineTag}>
                <div
                  className={`${styles.buttonAdvise} button-white`}
                  onClick={(e) => {
                    setOpenModal(true);
                    e.stopPropagation();
                  }}
                >
                  Nhận tư vấn
                </div>
                <Link
                  href={"/phong-kham/" + data?.slug}
                  className={`${styles.buttonDetail} button-blue`}
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.buttonMobile}>
            <div
              className={`${styles.buttonAdvise} button-white`}
              onClick={(e) => {
                setOpenModal(true);
                e.stopPropagation();
              }}
            >
              Nhận tư vấn
            </div>
            <Link
              href={"/phong-kham/" + data?.slug}
              className={`${styles.buttonDetail} button-blue`}
            >
              Xem chi tiết
            </Link>
          </div>
        </div>
      </div>
      <Modal
        className="wpModalChatBox"
        open={openModal}
        footer={null}
        closable={false}
        width={380}
        style={{ top: 10 }}
        destroyOnClose={true}
        onCancel={() => {
          setOpenModal(false);
        }}
      >
        <div style={{ position: "relative" }}>
          <ChatBox detailClinic={data} isModal={true} />
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
  );
}
