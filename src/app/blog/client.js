"use client";
import CategoryBlog from "@/src/component/blog/category-blog";
import styles from "./page.module.scss";
import { Row, Col, Breadcrumb } from "antd";
import ShowBlogSuggest from "@/src/component/blog/blog-suggest.js";
import Link from "next/link";

export default function BodyBlog({ dataCategoryBlog, dataASide }) {
  return (
    <>
      {/* <div className={styles.nav}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">Trang Chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href="">Blog</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.wpBodyBlog}>
        <Row
          gutter={[{ xl: 30, md: 30, xs: 0, sm: 0 }, 28]}
          className={styles.bodyBlog}
        >
          <Col xs={24} sm={24} md={16} xl={16} className={styles.categoryBox}>
            {dataCategoryBlog?.map((item, index) => {
              return (
                <>
                  {index > 0 && <div className={styles.line}></div>}
                  <CategoryBlog data={item} />
                </>
              );
            })}
          </Col>
          <Col xs={24} sm={24} md={8} xl={8} className={styles.suggestBox}>
            <ShowBlogSuggest data={dataASide} hasForm={false} />
          </Col>
        </Row>
      </div> */}
    </>
  );
}
