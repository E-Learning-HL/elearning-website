"use client";
import Image from "next/image";
import { Col, Row } from "antd";
import { CATEGORY_SERVICE } from "@/src/const/const";
import styles from "@/src/component/home/remarkable-service.module.scss";
import * as NProgress from "nprogress";
import { toSlug } from "@/src/util/util";
import Link from "next/link";

export default function RemarkableService() {
  const itemArray = CATEGORY_SERVICE.map((item) => (
    <Col xs={12} sm={12} md={6} xl={6}>
      <Link
        href={"/" + toSlug(item.name)}
        className={`${styles.itemService} block-animation`}
      >
        <div className={styles.itemImage}>
          <Image
            src={item.link}
            className={styles.serviceImage}
            alt="image"
          ></Image>
        </div>
        <div className={styles.itemTitle}>
          <h3>{item.name}</h3>
        </div>
      </Link>
    </Col>
  ));

  return (
    <div className={styles.wpRemarkableService}>
      <div className={styles.wpRemarkableServiceContent}>
        <div className={styles.wpTitle}>
          <h2>DỊCH VỤ NHA KHOA NỔI BẬT</h2>
          <div className={styles.line}></div>
        </div>
        <Row
          gutter={[
            { xs: 14, sm: 14, md: 20, xl: 30 },
            { xs: 14, sm: 14, md: 20, xl: 30 },
          ]}
          className={styles.listRemarkableService}
        >
          {itemArray}
        </Row>
      </div>
    </div>
  );
}
