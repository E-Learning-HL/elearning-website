import styles from "./page.module.scss";
import SearchResultClient from "./client";
import { searchClinic } from "./service";
import Header from "@/src/component/header/header";
import SearchBanner from "@/src/component/search/searchbanner";

export async function generateMetadata({ params, searchParams }) {
  return {
    title: "Tìm kiếm nha khoa uy tín phù hợp nhất với bạn | NhaKhoaHub",
    description:
      "Sử dụng NhaKhoaHub để tìm kiếm các phòng khám nha khoa phù hợp theo dịch vụ và khu vực. Giúp bạn lựa chọn được cơ sở nha khoa uy tín, được đánh giá tốt nhất",
  };
}

export default async function SearchResult({ params, searchParams }) {
  let res = null;
  try {
    // console.log("searchParams", searchParams);
    res = await searchClinic(
      searchParams?.name,
      searchParams?.province_id,
      searchParams?.time,
      searchParams?.page,
      searchParams?.category_service,
      searchParams?.weekday,
      searchParams?.district_id,
      searchParams?.min,
      searchParams?.max
    );
    // console.log("res", res.data.data[0]);
  } catch (error) {
    console.log("error", error);
  }

  return (
    <>
      <SearchBanner searchParams={searchParams} />
      <div className={styles.wpSearchResult}>
        <div className={styles.contentSearch}>
          <SearchResultClient
            searchParams={searchParams}
            searchResult={res?.data}
          />
        </div>
      </div>
    </>
  );
}
