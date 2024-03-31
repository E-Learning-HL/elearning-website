"use client";
import ShowBlogDetail from "@/src/component/blog/blog-detail";
import ShowBlogSuggest from "@/src/component/blog/blog-suggest";
import styles from "./page.module.scss";
import { Row, Col, Breadcrumb } from "antd";
import Link from "next/link";

export default function BodyBlogDetail({ dataResult }) {
  const category_name =
    dataResult.dataContentMain.dataDetail?.category[0]?.slug;
  console.log("dataResult", dataResult);
  return (
    <div className={styles.wpBodyBlog}>
      <div className={styles.nav}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">Trang Chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href="/blog">Blog</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href={"/blog/" + category_name}>
              {dataResult.dataContentMain.dataDetail?.category[0]?.name}
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Row className={styles.bodyBlog}>
        <Col xs={24} sm={24} md={16} xl={16} className={styles.categoryBox}>
          <ShowBlogDetail data={dataResult.dataContentMain} />
        </Col>
        <Col xs={24} sm={24} md={8} xl={8} className={styles.suggestBox}>
          <ShowBlogSuggest data={dataResult.listBlogSuggest} />
        </Col>
      </Row>
    </div>
  );
}
