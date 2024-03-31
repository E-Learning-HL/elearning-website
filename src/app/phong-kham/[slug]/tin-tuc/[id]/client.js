"use client";
import styles from "../page.module.scss";
import "@/src/style/post.css";
import PostDetail from "@/src/component/detail/post-detail"
import { Breadcrumb } from "antd";
import Link from "next/link";

export default function BodyGetPost({ dataDetailPost, clinic }) {
  const dataPost = dataDetailPost
  console.log('dataDetailPost', dataDetailPost);
  return (
    <>
      <div className={styles.wpDetailListPost}>
        <div className={styles.nav}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/">Trang Chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link href={`/phong-kham/${clinic.slug}`}>{clinic.name}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link href={`/phong-kham/${clinic.slug}/tin-tuc`}>Tin Tức</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.wpBodyPost}>
          <PostDetail item={dataPost} />
        </div >
      </div>
    </>
  );
}
