"use client";
import { Swiper } from "swiper/react";
import { Row, Col } from "antd";
import "swiper/css";
import styles from "./detail.scss";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { IMAGE_TYPE } from "@/src/const/const";
import Link from "next/link";
import { Image as ImageAntd } from "antd";
import { PREFIX_IMAGE_URL } from "@/src/const/const";
import moment from "moment";

export default function Post({ detailClinic }) {
  return (
    <div className="wp-post-section">
      {detailClinic?.user?.post?.length > 0 ? (
        <>
          <Swiper
            breakpoints={{
              0: {
                slidesPerView: 1.2,
              },
              768: {
                slidesPerView: 2.2,
              },
              1024: {
                slidesPerView: 2.5,
              },
            }}
            spaceBetween={10}
            modules={[Pagination]}
            className="mySwiperPost"
          >
            <Row>
              {detailClinic?.user?.post.map((item) => {
                const imageDefault = item.image.find(
                  (subItem) => subItem.image_type === IMAGE_TYPE.introduce
                );
                console.log("imageDefault", imageDefault);
                return (
                  <>
                    <Col
                      xs={24}
                      sm={24}
                      md={8}
                      xl={8}
                      style={{ paddingRight: 6, paddingLeft: 6 }}
                    >
                      <Link
                        href={
                          "/phong-kham/" +
                          detailClinic.slug +
                          "/tin-tuc/" +
                          item.id
                        }
                        className="wp-postItem"
                      >
                        <div className="wp-postImage">
                          <ImageAntd
                            className="postImage"
                            src={
                              imageDefault
                                ? PREFIX_IMAGE_URL + imageDefault.key
                                : "https://nhakhoahub-dev.sgp1.digitaloceanspaces.com/prod/wp-content/uploads/2024/03/15181658/cach-chua-viem-nha-chu-rang-tai-nha.jpg"
                            }
                            height={200}
                            preview={false}
                          ></ImageAntd>
                        </div>
                        <div
                          className="post-title"
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        ></div>
                        <div className="post-date">
                          {moment(item.created_at).format("DD/MM/YYYY hh:mm")}
                        </div>
                        <div
                          className="post-content"
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        ></div>
                      </Link>
                    </Col>
                  </>
                );
              })}
            </Row>
          </Swiper>
          <Link
            href={`/phong-kham/${detailClinic.slug}/tin-tuc`}
            className="link-tin-tuc"
          >
            Xem thêm ...
          </Link>
        </>
      ) : (
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
    </div>
  );
}
