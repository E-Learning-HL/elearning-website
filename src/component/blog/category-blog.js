"use client";
import styles from "@/src/component/blog/category-blog.module.scss";
import "@/src/style/common.css";
import iconRight from "@/public/icon/icon-right-blueblack.svg";
import { Row, Col, Image as ImageAntd, Pagination } from "antd";
import Image from "next/image";
import defaulThumbnail from "@/public/image/default-thumbnail.jpg";
import { wrapperRouterPush } from "@/src/util/util";
import { useRouter } from "next/navigation";
import { FALLBACK } from "@/src/const/const";
import moment from "moment";
import Link from "next/link";
export default function CategoryBlog({ data }) {
  const router = useRouter();
  const onChangePage = (page) => {
    wrapperRouterPush(router, `/blog/${data.category_slug}?page=${page}`);
  };
  function seeMore() {
    wrapperRouterPush(router, `/blog/${data.category_slug}`);
    console.log(data.category_id);
  }
  // function seeDetail(item) {
  //   wrapperRouterPush(router, `/blog/${item.slug}`);
  // }

  return (
    <div className={styles.wpCategoryBlog}>
      <div className={styles.wpHeader}>
        <div className={styles.headerTitle}>{data?.category_name}</div>
        {!data?.total_post && (
          <div className={styles.headerButton}>
            <div className={styles.text} onClick={() => seeMore()}>
              XEM THÊM
            </div>
            <Image src={iconRight}></Image>
          </div>
        )}
      </div>
      <div className={styles.wpMainContent}>
        <Row gutter={[{ xs: 0, sm: 0, md: 30, xl: 30 }, { xs: 28, sm: 28, md: 32, xl: 32 }]}>
          {data?.data?.result?.map((item) => (
            <Col xs={24} sm={24} md={8} xl={8} className={styles.wpItemContent} >
              <Link href={"/blog/" + item.slug}>
                <div className={styles.wpContentImage} >
                  <ImageAntd
                    className={styles.contentImage}
                    src={item.thumb ? item.thumb.toString() : "false"}
                    width="100%"
                    height="100%"
                    preview={false}
                    fallback={FALLBACK}
                  ></ImageAntd>
                </div>
                <div className={styles.itemBlog}>{moment(item.date).format("DD/MM/YYYY")}</div>
                <div className={styles.itemTitle} dangerouslySetInnerHTML={{ __html: item.title }} ></div>
                <div className={styles.itemContent} dangerouslySetInnerHTML={{ __html: item.desc }}></div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
      {data?.total_post && data.total_post > 12 && (
        <div className={styles.pagination}>
          <Pagination
            current={parseInt(data?.data?.meta?.current)}
            total={data.total_post}
            pageSize={12}
            onChange={(e) => onChangePage(e)}
          />
        </div>
      )}
    </div>
  );
}
