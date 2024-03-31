"use client";
import styles from "@/src/component/blog/blog-detail.module.scss";
import moment from "moment";
import defaulThumbnail from "@/public/image/default-thumbnail.jpg";
import Comment from "../facebook-plugin/comment";
import "@/src/style/blog-detail.css";
import { Collapse, Col, Image as ImageAntd, Row } from "antd";
import Link from "next/link";
const { Panel } = Collapse;

export default function ShowBlogDetail({ data }) {
  const content = data.dataDetail?.content?.replace(/(?:\r\n|\r|\n)/g, "<div></div>")
  return (
    <div className={styles.wpBlogDetail}>
      <div className={styles.wpHeader}>
        <div className={styles.headerTitle}>
          <h1 dangerouslySetInnerHTML={{ __html: data.dataDetail?.title }}></h1>
        </div>
      </div>
      <div className={styles.postingDate}>
        Đăng vào {moment(data.dataDetail?.date).format("DD/MM/YYYY")}
      </div>
      <div className={styles.tableOfContents}>
        <Collapse accordion>
          <Panel header="MỤC LỤC" className={styles.tableOfContentsTitle}>
            <div
              className={styles.tableOfContentsList}
              dangerouslySetInnerHTML={{
                __html: data.dataDetail?.tableOfContents,
              }}
            ></div>
          </Panel>
        </Collapse>
      </div>
      <div
        className={styles.wpMainContent}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>

      {/* Facebook */}
      <div className={styles.facebook_plugin}>
        <Comment dataHref={data?.dataDetail?.slug} />
      </div>

      <div className={styles.wpBlogRelated}>
        <p className={styles.headTitle}> BÀI VIẾT LIÊN QUAN </p>
        <Row>
          {data?.listRelated?.map((item) => (
            <Col
              className={styles.wpContentCard}
              xs={24}
              sm={12}
              md={12}
              lg={8}
              xl={8}
            >
              <Link href={"/blog/" + item.slug}>
                <div className={styles.contentImage}>
                  <ImageAntd
                    src={item.thumb ? item.thumb : defaulThumbnail}
                    preview={false}
                    width={"100%"}
                  ></ImageAntd>
                </div>
                <div className={styles.postingDate}>
                  {moment(item.date).format("DD/MM/YYYY")}
                </div>
                <div className={styles.headerTitle} dangerouslySetInnerHTML={{ __html: item.title }} ></div>
                <p
                  className={styles.wpMainDesc}
                  dangerouslySetInnerHTML={{ __html: item.desc }}
                ></p>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div >
  );
}
