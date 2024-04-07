"use client";
import styles from "./search.module.scss";
import { useRouter } from "next/navigation";
import * as NProgress from "nprogress";
import moment from "moment";
import { Breadcrumb } from "antd";
import { useQuery } from "@tanstack/react-query";
import { capitalizeFirstLetters, toSlug } from "../../util/util";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SearchBanner = ({ searchParams }) => {
  const router = useRouter();
  // const backToHome = () => {
  //   NProgress.start();
  //   router.push(`/`);
  //   // NProgress.done();
  // };
  const pathname = usePathname();
  const { data } = useQuery({
    queryKey: ["api-common"],
  });
  console.log("searchParams", searchParams);
  const dataCategoryService = data?.listService?.find(
    (item) => item.id == searchParams.category_service
  );

  // const [showDistrict, setShowDistrict] = useState(false);
  // const [openSelectAddress, setOpenSelectAddress] = useState(false);
  return (
    <>
      <div className={styles.searchBanner}>
        {/* <div className={styles.nav}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/">Trang Chủ</Link>
            </Breadcrumb.Item>
            {searchParams?.category_service_name && (
              <Breadcrumb.Item>
                <Link href={`/${toSlug(searchParams?.category_service_name)}`}>
                  {searchParams?.category_service_name}
                </Link>
              </Breadcrumb.Item>
            )}
            {(searchParams?.district_name || searchParams?.province_name) && (
              <Breadcrumb.Item>
                <Link href={pathname}>
                  {searchParams?.district_name}
                  {searchParams?.district_name &&
                    searchParams?.province_name &&
                    ", "}
                  {searchParams?.province_name}
                </Link>
              </Breadcrumb.Item>
            )}
            {!searchParams?.district_name &&
              !searchParams?.province_name &&
              !searchParams?.category_service_name && (
                <Breadcrumb.Item>
                  <Link href={pathname}>Tìm kiếm</Link>
                </Breadcrumb.Item>
              )}
          </Breadcrumb>
        </div> */}
        <div className={styles.mainBanner}>
          <h2>Lộ trình chuyên biệt</h2>
          <p>
            Không còn những giờ học nặng nề, khó hiểu. Với HL eLearing, bạn được
            học đúng trình độ và mục tiêu. Đảm bảo học tới đâu, hiểu tới đó –
            Hiểu sâu nhớ lâu, vận dụng nhuần nhuyễn, ứng dụng dễ dàng!
          </p>
        </div>
      </div>
    </>
  );
};

export default SearchBanner;
