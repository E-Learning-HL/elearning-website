"use client";
import styles from "./page.module.scss";
import Image from "next/image";
import { Modal, Pagination } from "antd";
import * as NProgress from "nprogress";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import defaulThumbnail from "@/public/image/default-thumbnail.jpg";
import iconClock from "@/public/icon/icon-clock.svg";
import iconClose from "@/public/icon/icon-close.svg";
import iconLocation from "@/public/icon/icon-location.svg";
import iconLocationBlue from "@/public/icon/icon-location-blue.svg";
import iconMark from "@/public/icon/icon-mark.svg";
import iconRight from "@/public/icon/icon-right.svg";
import { wrapperRouterPush, ratingPointToText, toSlug } from "@/src/util/util";
import ImageCommon from "@/src/component/image/image";
import { IMAGE_TYPE } from "@/src/const/const";
import iconRatingStar from "@/public/icon/icon-rating-star.svg";
import Link from "next/link";
import "@/src/style/common.css";
import iconCloseModal from "@/public/icon/icon-close.png";
import ChatBox from "@/src/component/detail/chatbox";
import "@/src/component/detail/detail.scss";

function SearchResultClient({ searchParams, searchResult }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const pathname = usePathname();
  const searchParamUrl = useSearchParams();
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);

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
  useEffect(() => {
    if (searchParams.page) {
      setCurrentPage(parseInt(searchParams.page));
    }
  }, [pathname, searchParamUrl]);
  const onChangePage = (page) => {
    console.log("pathname", pathname);

    const newSearchParams = {};
    if (searchParams.hasOwnProperty("weekday")) {
      newSearchParams.weekday = searchParams.weekday;
    }
    if (searchParams.hasOwnProperty("time")) {
      newSearchParams.time = searchParams.time;
    }
    if (searchParams.hasOwnProperty("min")) {
      newSearchParams.min = searchParams.min;
    }
    if (searchParams.hasOwnProperty("max")) {
      newSearchParams.max = searchParams.max;
    }

    newSearchParams.page = page;
    console.log("newSearchParams", newSearchParams);

    const param = new URLSearchParams(newSearchParams).toString();
    NProgress.start();
    router.push(`${pathname}?${param}`);
  };

  const onShowDetail = (slug) => {
    wrapperRouterPush(
      router,
      searchParams?.category_service_name
        ? `/phong-kham/${slug}?dichvu=${toSlug(
          searchParams?.category_service_name
        )}`
        : `/phong-kham/${slug}`
    );
  };

  return (
    <div>
      <div className={styles.wpResult}>
        {searchResult &&
          searchResult?.data &&
          searchResult?.data.map((item) => {
            const cover = item?.image?.find(
              (sitem) => sitem.image_type == IMAGE_TYPE.banner
            );
            const logo = item?.image?.find(
              (sitem) => sitem.image_type == IMAGE_TYPE.avatar
            );
            const params = searchParams?.category_service_name;
            const url = params
              ? `/phong-kham/${item?.slug}?dichvu=${toSlug(params)}`
              : `/phong-kham/${item?.slug}`;
            return (
              <div
                key={item?.id}
                className={`${styles.itemResult} block-animation-darker`}
                onClick={() => onShowDetail(item?.slug)}
              >
                <ImageCommon data={cover} style={styles.cover} />
                <div className={styles.wpInfo}>
                  <div className={styles.wpFirstLine}>
                    <div className={styles.wpLeft}>
                      <ImageCommon data={logo} style={styles.logo} />
                    </div>
                    <div className={styles.wpRight}>
                      <div className={styles.titleClinic}>{item?.name}</div>
                      <div className={styles.wpAddress}>
                        <Image
                          src={iconLocation}
                          className={styles.iconLocation}
                        />
                        <div>{item?.address[0]}</div>
                      </div>
                      <div className={styles.wpRatingLine}>
                        {item?.average_rating ? (
                          <div className={styles.wpRatingInLine}>
                            <div className={styles.ratingPoint}>
                              <div className={styles.point}>
                                {item?.average_rating.toFixed(1)}
                              </div>
                              <Image
                                className={styles.iconRatingStar}
                                src={iconRatingStar}
                                alt="icon"
                              />
                            </div>
                            <div className={styles.ratingRank}>
                              {ratingPointToText(
                                item?.average_rating.toFixed(1)
                              )}
                            </div>
                            <div className={styles.dash}></div>
                          </div>
                        ) : null}
                        <div style={{ display: "flex" }}>
                          <div className={styles.ratingQuantity}>
                            <span className={styles.ratingQuantityBold}>
                              {item?.number_rating}
                            </span>
                            Đánh giá
                          </div>
                          <div className={styles.dash}></div>
                          <div className={styles.numberOfConsultation}>
                            <span className={styles.numberOfConsultationBold}>
                              {item?.total_contact}
                            </span>
                            Người đã nhận tư vấn
                          </div>
                        </div>
                      </div>
                      <div className={styles.firstLineTag}>
                        {item?.district?.length > 0 ? (
                          <div className={styles.wpTagInfo}>
                            <Image
                              src={iconLocationBlue}
                              className={styles.iconLocation}
                            />
                            {item.district[0]}
                          </div>
                        ) : null}
                        <div className={styles.wpTagInfo}>
                          <Image
                            src={iconClock}
                            className={styles.iconLocation}
                          />
                          {item?.time_start} - {item?.time_end}
                        </div>
                      </div>

                      <div className={styles.thirdLineTag}>
                        <div
                          className={styles.buttonAdvise}
                          onClick={(e) => {
                            setDataModal(item);
                            setOpenModal(true);
                            e.stopPropagation();
                            setOpenModal(true);
                          }}
                        >
                          Nhận tư vấn
                        </div>
                        <Link
                          href={url}
                          className={`${styles.buttonDetail} button-blue`}
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className={styles.wpSecondLine}>
                    <div
                      className={styles.buttonAdvise}
                      onClick={(e) => {
                        setDataModal(item);
                        setOpenModal(true);
                        e.stopPropagation();
                        setOpenModal(true);
                      }}
                    >
                      Nhận tư vấn
                    </div>
                    <Link href={url} className={styles.buttonDetail}>
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Pagination
        onChange={onChangePage}
        // defaultCurrent={1}
        current={currentPage}
        total={searchResult?.count}
        showSizeChanger={false}
        className="pagination"
        style={{ marginBottom: "64px" }}
      />
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
          <ChatBox detailClinic={dataModal} isModal={true} />
          <div
            className="closeModal"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <Image src={iconCloseModal} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
function SearchResult({ searchParams, searchResult }) {
  return (
    <Suspense>
      <SearchResultClient
        searchParams={searchParams}
        searchResult={searchResult}
      />
    </Suspense>
  );
}
const MemoizedSearchResult = React.memo(
  SearchResult,
  (prevProps, nextProps) => prevProps.searchResult === nextProps.searchResult
);
export default MemoizedSearchResult;
