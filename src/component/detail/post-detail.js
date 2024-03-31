"use client";
import styles from "../../app/phong-kham/[slug]/tin-tuc/page.module.scss";
("./page.module.scss");
import "@/src/style/post.css";
import { Row, Col, Breadcrumb } from "antd";
import Image from "next/image";
import moment from "moment";
import FbImageLibrary from "react-fb-image-grid";
import defaultImage from "@/public/image/default-image-square.png";
import React, { useState, useRef, useEffect } from "react";
import { PREFIX_IMAGE_URL } from "@/src/const/const";

export default function PostDetail({ item }) {
  const contentRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);

  const toggleFullTextVisibility = () => {
    setIsFullTextVisible(!isFullTextVisible);
  };

  const imageAddress = item.image.map((img) => {
    const url = PREFIX_IMAGE_URL + img.key;
    return url;
  });

  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      const originalHeight = contentElement.clientHeight; // Height before applying line clamp
      contentElement.style.webkitLineClamp = "6"; // Apply line clamp
      const clampedHeight = contentElement.clientHeight; // Height after applying line clamp
      console.log(originalHeight, clampedHeight);
      setIsTruncated(clampedHeight < originalHeight); // Check if height is reduced
    }
  }, []);

  return (
    <Row gutter={[{ xl: 0, md: 0, xs: 0, sm: 0 }, 28]}>
      <Col md={6} xl={7}></Col>
      <Col xs={24} sm={24} md={12} xl={10}>
        <div className={styles.wrapperDetailPost}>
          <div className={styles.wpBlockUser}>
            <Image
              unoptimized
              fill={true}
              src={defaultImage}
              className={styles.infoLogo}
            />
            <div className={styles.wpBlockInfo}>
              <div className={styles.blockBame}>{item.user?.name}</div>
              <div className={styles.blockDate}>
                {moment(item.created_at).format("DD/MM/YYYY hh:mm")}
              </div>
            </div>
          </div>
          <div className={styles.blockContent}>
            <div
              className={styles.content}
              ref={contentRef}
              style={{
                display: isFullTextVisible ? "contents" : "-webkit-box",
              }}
              dangerouslySetInnerHTML={{ __html: item.content }}
            ></div>

            {isTruncated && (
              <p
                className={styles.toggetText}
                onClick={toggleFullTextVisibility}
              >
                {!isFullTextVisible ? "Xem Thêm" : "Ẩn Bớt"}
              </p>
            )}
          </div>
          <FbImageLibrary
            images={imageAddress}
            hideOverlay={true}
            countFrom={5}
          />
        </div>
      </Col>
    </Row>
  );
}
