"use client";
import CategoryBlog from "@/src/component/blog/category-blog";
import styles from "@/src/app/blog/[slug]/page.module.scss";
import { Row, Col, Breadcrumb } from "antd";
import ShowBlogSuggest from "@/src/component/blog/blog-suggest.js";
import Link from "next/link";
export default function BodyListBlog({ data, dataASide }) {
  console.log("searchParams", data);
  return (
    <>
      <div className={styles.nav}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">Trang Chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href="/blog">Blog</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href="">{data?.category_name}</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.wpBodyListBlog}>
        <Row
          gutter={[{ xl: 30, xs: 0, sm: 0, md: 30 }, 28]}
          className={styles.bodyListBlog}
        >
          <Col xs={24} sm={24} md={16} xl={16} className={styles.categoryBox}>
            <CategoryBlog data={data} />
          </Col>
          <Col xs={24} sm={24} md={8} xl={8} className={styles.suggestBox}>
            <ShowBlogSuggest data={dataASide} hasForm={false} />
          </Col>
        </Row>
      </div>
    </>
  );
}
