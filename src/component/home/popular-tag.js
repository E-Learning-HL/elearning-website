"use client";
import styles from "./home.module.scss";
import "@/src/style/home.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Col, Row, Tabs } from "antd";
import iconTime from "@/public/icon/icon-time.svg";
import { useQuery } from "@tanstack/react-query";
import { toSlug, wrapperRouterPush } from "@/src/util/util";
import Link from "next/link";

export default function PopularTag() {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["api-common"],
  });
  // const dataTagProvince1 = [...data[2], {id: -1, name: 'Các Huyện còn lại'}];
  // const dataTagProvince2 = [...data[3], { id: -1, name: "Các Huyện còn lại" }];
  // const dataTagProvince3 = [...data[4]];

  const items = [
    {
      label: <h4>Hà Nội</h4>,
      key: "item-1",
      children: (
        <div className={styles.wpTag}>
          {data?.popularAdress1?.map((item) => (
            < Link href={"/" + toSlug("Hà Nội") + "/" + toSlug(item.name)}
              className={styles.tag}
            >
              {item.name}
            </Link>
          ))
          }
        </div >
      ),
    },
    {
      label: <h4>Tp. Hồ Chí Minh</h4>,
      key: "item-2",
      children: (
        <div className={styles.wpTag}>
          {data?.popularAdress2?.map((item) => (
            < Link href={"/" + toSlug("Tp. Hồ Chí Minh") + "/" + toSlug(item.name)}
              className={styles.tag}
            >
              {item.name}
            </Link>
          ))}
        </div>
      ),
    },
    {
      label: <h4>Đà Nẵng</h4>,
      key: "item-3",
      children: (
        <div className={styles.wpTag}>
          {data?.popularAdress3?.map((item) => (
            < Link href={"/" + toSlug("Đà Nẵng") + "/" + toSlug(item.name)}
              className={styles.tag}
            >
              {item.name}
            </Link>
          ))}
        </div>
      ),
    },
  ];
  const onSearchByTime = (time) => {
    wrapperRouterPush(router, `/tim-nha-khoa?time=${time}`);
  };
  const onSearchByDay = (day) => {
    wrapperRouterPush(router, `/tim-nha-khoa?weekday=${day}`);
  };
  const onSearchByAddress = (name, province) => {
    wrapperRouterPush(router, `/${toSlug(province)}/${toSlug(name)}`);
  };
  return (
    <div className={`${styles.wpPopularTag} wp-popular-tag`}>
      <div>{data?.description}</div>
      <h3 className={styles.titlePopularTag}>Mọi người đang tìm kiếm:</h3>
      <Tabs items={items} />
      <div className={styles.wpTimeTag}>
        <div className={styles.firstLine}>
          <Image src={iconTime} className={styles.iconTime} alt="icon time" />
          <div className={styles.timeExam}>Thời gian khám</div>
        </div>
        <div className={styles.titleTime}>
          <div
            onClick={() => onSearchByTime("18:00")}
            className={styles.tagTime}
          >
            Sau 18h
          </div>
          <div
            onClick={() => onSearchByTime("20:00")}
            className={styles.tagTime}
          >
            Sau 20h
          </div>
          <div onClick={() => onSearchByDay("7")} className={styles.tagTime}>
            Thứ 7
          </div>
          <div onClick={() => onSearchByDay("8")} className={styles.tagTime}>
            Chủ nhật
          </div>
        </div>
      </div>
    </div>
  );
}
