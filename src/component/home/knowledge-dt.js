"use client";
import { Image as ImageAntd } from "antd";
import Image from "next/image";
import { FALLBACK } from "@/src/const/const";
import "@/src/style/knowledge-dt.css";
import righticon from "@/public/icon/icon-right-blue.svg";
import * as NProgress from "nprogress";
import { Row, Col } from "antd";
import Link from "next/link";

export default function KnowledgeDentistry({ knowledgeDentistryData }) {
  return (
    <div className="wp-knowledgeDentistry">
      <div className="title">
        <h2>KIẾN THỨC NHA KHOA</h2>
      </div>
      <div className="line"></div>
      <div className="wp-content">
        <Row gutter={[30, 48]}>
          {knowledgeDentistryData?.map((item) => (
            <Col xs={12} sm={12} md={8} xl={8}>
              <Link href={"/blog/" + item.slug} className="wp-contentItem">
                <div className="wp-contentImage">
                  <ImageAntd
                    className="contentImage"
                    src={item.thumb ? item.thumb.toString() : "false"}
                    width="100%"
                    height="100%"
                    preview={false}
                    fallback={FALLBACK}
                  ></ImageAntd>
                </div>
                <div className="itemBlog">Kiến Thức Nha Khoa</div>
                <h3 className="itemTitle" dangerouslySetInnerHTML={{ __html: item.title }}></h3>
                <div className="itemContent" dangerouslySetInnerHTML={{ __html: item.desc }}></div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
      <div>
        <Link
          href="/blog/kien-thuc-nha-khoa"
          className="moreButton button-white"
        >
          <p>XEM THÊM</p>
          <Image src={righticon} alt="icon"></Image>
        </Link>
      </div>
    </div>
  );
}
