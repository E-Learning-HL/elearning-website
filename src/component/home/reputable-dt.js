"use client";
import Image from "next/image";
import { Col, Row, Skeleton, Tabs, Space } from "antd";
import { useQuery } from "@tanstack/react-query";
import ItemDT from "@/src/component/home/item-dt.js";
import styles from "@/src/component/home/reputable-dt.module.scss";
import righticon from "@/public/icon/icon-right-blue.svg";
import "@/src/style/item-skeleton.css";
import "@/src/style/home.css";

import { TOP_PROVINCE } from "@/src/const/const";
import axios from "axios";
import { searchTopDentistry } from "@/src/component/home/search-province-dt.js";
import { useState } from "react";
import Link from "next/link";
import { toSlug } from "@/src/util/util";

export default function ReputableDT({ reputableData }) {
  const [stateReputableData, setStateReputableData] = useState(reputableData);
  // const [provinceID, setProvinceID] = useState("1");
  const [province, setProvince] = useState("Hà Nội");
  const [isLoading, setIsLoading] = useState(false);
  const onChange = async (key) => {
    setIsLoading(true);
    try {
      const res = await searchTopDentistry(key);
      setStateReputableData(res?.data);
      setIsLoading(false);
      setProvince(TOP_PROVINCE.find((item) => item.key == key).name);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={`${styles.reputableDentistry} reputable-dentistry`}>
        <div>
          <h2>TOP NHA KHOA UY TÍN</h2>
        </div>
        <div className={styles.line}></div>
        <Tabs
          items={TOP_PROVINCE}
          onChange={(key) => {
            onChange(key);
          }}
          tabBarExtraContent={""}
        />
        <div className={styles.listDentistry}>
          <Row gutter={[{ xl: 30, md: 30, xs: 0, sm: 30 }, 30]}>
            {stateReputableData?.map((item, index) => (
              <Col xs={24} sm={24} md={12} xl={12} key={item.id}>
                {!isLoading && <ItemDT data={item} />}
                {isLoading && (
                  <div className="wpSkeletonItem">
                    <Skeleton.Image className="skeletonImage" active />
                    <div className="wpSkeletonInfo">
                      <Skeleton.Avatar className="skeletonLogo" active />
                      <div className="wpSkeletonDetails">
                        <Skeleton.Input className="skeletonInput1" active />
                        <Skeleton.Input className="skeletonInput2" active />
                        <div className="wpSkeletonButton">
                          <Skeleton.Button className="skeletonButton1" active />
                          <Skeleton.Button className="skeletonButton2" active />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Col>
            ))}
          </Row>
        </div>
        <div className={styles.wpButtonMore}>
          <Link
            href={"/" + toSlug(province)}
            className={`${styles.moreButton} button-white`}
          >
            <p>XEM THÊM</p>
            <Image src={righticon} alt="icon"></Image>
          </Link>
        </div>
      </div>
    </div>
  );
}
