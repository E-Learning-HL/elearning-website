"use client";
import styles from "./page.module.scss";
import "@/src/style/post.css";
import PostDetail from '../../../../component/detail/post-detail'
import { Breadcrumb, Pagination } from "antd";
import Link from "next/link";
import React, { useState } from 'react';
import { getAllPostClinic } from "../service";

export default function BodyListPost({ dataListPost, clinic }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPost, setDataPost] = useState(dataListPost.data);

  const scrollTo = () => {
    let sectionLeftHeight = document.getElementById("BreadcrumbPost").offsetHeight;
    window.scrollTo({ top: `${sectionLeftHeight}`, left: 0, behavior: "smooth" });
  }
  async function onChangePage(page) {
    const dataPost = await getAllPostClinic(clinic.id, page);
    setDataPost(dataPost.data);
    setCurrentPage(page);
    scrollTo();
  }

  return (
    <>
      <div className={styles.wpDetailListPost}>
        <div className={styles.nav} id="BreadcrumbPost">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/">Trang Chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link href={`/phong-kham/${clinic.slug}`}>{clinic.name}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link href="">Tin Tức</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.wpBodyPost}>
          {dataPost && dataPost.map((item) => {
            return (
              <PostDetail item={item} />
            )
          })}
          {dataListPost?.total > 10 && (
            <div className={styles.pagination}>
              <Pagination
                current={currentPage}
                total={dataListPost?.total}
                onChange={(e) => onChangePage(e)}
              />
            </div>
          )}
        </div >
      </div >
    </>
  );
}
