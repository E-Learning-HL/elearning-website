"use client";
import { Image as ImageAntd } from "antd";
import styles from "@/src/component/home/review-dt.scss";
import Image from "next/image";
import righticon from "@/public/icon/icon-right-blue.svg";
import { Row, Col } from "antd";
import ImageAntdCommon from "@/src/component/image/image-antd";
import Link from "next/link";

export default function ReviewDentistry({ reviewDentistryData }) {
  // console.log("reviewDentistryData",reviewDentistryData )

  return (
    <div>
      <div className="wp-reviewDentistry">
        <div className="title">
          <h2>REVIEW NHA KHOA</h2>
        </div>
        <div className="line"></div>
        <div className="wp-content">
          <Row gutter={[30, 28]}>
            <Col xs={24} sm={24} md={12} xl={12}>
              <Link
                href={"/blog/" + reviewDentistryData[0].slug}
                className="wp-mainPost"
              >
                <div className="wp-mainPostImage">
                  <ImageAntdCommon
                    data={reviewDentistryData && reviewDentistryData[0].thumb}
                    className={"mainPostImage"}
                    width="100%"
                    height="100%"
                  />
                </div>
                <div className="wp-mainContent">
                  <p className="blog">Review Nha Khoa</p>
                  <h3
                    className="title"
                    dangerouslySetInnerHTML={{ __html: reviewDentistryData && reviewDentistryData[0].title }}>
                  </h3>
                  <p
                    className="content"
                    dangerouslySetInnerHTML={{ __html: reviewDentistryData && reviewDentistryData[0].desc }}>
                  </p>
                </div>
              </Link>
            </Col>
            <Col xs={24} sm={24} md={12} xl={12}>
              <div className="wp-otherPost">
                {reviewDentistryData.map((item, index) => {
                  if (index >= 1) {
                    return (
                      <>
                        <Link
                          href={"/blog/" + item.slug}
                          className="wp-postItem"
                        >
                          <div className="wp-postImage">
                            <ImageAntdCommon
                              data={item.thumb}
                              className={"postImage"}
                              width="100%"
                              height="100%"
                            />
                          </div>
                          <div className="wp-postItemContent">
                            <p className="postItemBlog">Review Nha Khoa</p>
                            <p className="postItemTitle" dangerouslySetInnerHTML={{ __html: item.title }}></p>
                          </div>
                        </Link>
                      </>
                    );
                  }
                  return null;
                })}
              </div>
            </Col>
          </Row>
        </div>
        <div>
          <Link
            href="/blog/review-nha-khoa"
            className="moreButton button-white"
          >
            <p>XEM THÊM</p>
            <Image src={righticon} alt="icon"></Image>
          </Link>
        </div>
      </div>
    </div>
  );
}
