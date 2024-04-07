import styles from "./page.module.scss";
import SearchResultClient from "./client";
import { searchClinic } from "./service";
import Header from "@/src/component/header/header";
import SearchBanner from "@/src/component/search/searchbanner";
import { START_POINT, TARGET_POINT } from "@/src/const/const";
import { redirect } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/src/const/const";

export async function generateMetadata({ params, searchParams }) {
  return {
    title: "Xây dựng lộ trình phù hợp nhất với bạn | HL eLearning",
    // description:
    //   "Sử dụng NhaKhoaHub để tìm kiếm các phòng khám nha khoa phù hợp theo dịch vụ và khu vực. Giúp bạn lựa chọn được cơ sở nha khoa uy tín, được đánh giá tốt nhất",
  };
}

export default async function SearchResult({ params, searchParams }) {
  const includesValue = (array, x) => array.some((item) => item.value === x);
  let res = null;
  let listPaymentMethod = null;

  

  try {
    // console.log("searchParams", searchParams);
    if (
      includesValue(START_POINT, parseInt(searchParams?.start_point)) &&
      includesValue(TARGET_POINT, parseInt(searchParams?.target_point))
    ) {
      res = await searchClinic(
        searchParams?.start_point,
        searchParams?.target_point
        // searchParams?.time,
        // searchParams?.page,
        // searchParams?.category_service,
        // searchParams?.weekday,
        // searchParams?.district_id,
        // searchParams?.min,
        // searchParams?.max
      );
    }
    const response = await axios.get(`${BASE_URL}/api/payment-methods`);
    listPaymentMethod = response.data;

    // console.log("res", res.data.data[0]);
  } catch (error) {
  }

  return (
    <>
      <SearchBanner searchParams={searchParams} />
      <div className={styles.wpSearchResult}>
        <div className={styles.contentSearch}>
          <SearchResultClient
            searchParams={searchParams}
            searchResult={res?.data}
            listPaymentMethod={listPaymentMethod}
          />
        </div>
      </div>
    </>
  );
}
