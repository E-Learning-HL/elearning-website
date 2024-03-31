import { Roboto_Flex } from "next/font/google";
import "antd/dist/antd.css";
import "./globals.css";
// import useStore from "@/src/util/zustandstore";
import "@/src/style/common.css";
import NextTopLoader from "nextjs-toploader";
import Header from "../component/header/header";
import Footer from "../component/footer/footer";
import Wrapper from "../app/client";
import Script from "next/script";

const roboto = Roboto_Flex({ subsets: ["latin"] });
import {
  POPULAR_ADRESS_ID_1,
  POPULAR_ADRESS_ID_2,
  POPULAR_ADRESS_ID_3,
  LIST_WEEKDAY,
  POPULAR_ADRESS_1,
  POPULAR_ADRESS_2,
  POPULAR_ADRESS_3,
} from "../const/const";
import {
  getAllService,
  getDistrictByProvinceId,
  getAllProvince,
  getAllWeekDay,
  getAllCategoryBlog,
} from "./service";
import Providers from "./providers";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { GoogleAnalytics } from "@next/third-parties/google";

// export const metadata = {
//   metadataBase: new URL(process.env.NEXT_PUBLIC_DEPLOY_URL),
//   title: "NhaKhoaHub - Nền tảng review và tìm kiếm nha khoa uy tín",
//   openGraph: {
//     images: "/image/logo-nha-nha-khoa-hub.png",
//   },
//   twitter: {
//     image: "/image/logo-nha-nha-khoa-hub.png",
//   },
//   verification: {
//     google: "1eRUElYe4FuDsy_TjMuCoiCaYK1KUZz08iJlwkiflZI",
//   },
// };
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
async function getData() {
  const res = await Promise.all([
    getAllService(),
    getAllProvince(),
    getAllCategoryBlog(),
  ]);
  // useStore.setState({ data: res[6] })
  return res;
}

export default async function RootLayout({ children }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["api-common"],
    queryFn: async () => {
      try {
        const dataSearch = await getData();
        const mapData = {
          listService: dataSearch[0],
          listProvince: dataSearch[1],
          popularAdress1: POPULAR_ADRESS_1,
          popularAdress2: POPULAR_ADRESS_2,
          popularAdress3: POPULAR_ADRESS_3,
          listWeekday: LIST_WEEKDAY,
          listCategoryBlog: dataSearch[2],
        };
        return mapData;
      } catch (error) {
        return {
          listService: [],
          listProvince: [],
          popularAdress1: [],
          popularAdress2: [],
          popularAdress3: [],
          listWeekday: [],
          listCategoryBlog: [],
        };
      }
    },
  });

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NhaKhoaHub",
    description:
      "Giúp tìm kiếm và lựa chọn cơ sở nha khoa uy tín, chất lượng tốt nhất. Review hơn 10.000 nha khoa trên toàn quốc từ trải nghiệm thực tế của khách hàng.",
  };

  const schema = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "Blog",
    url: "https://nhakhoahub.vn/blog",
    potentialAction: {
      "@type": "SearchAction",
      target: "{search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const FAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "NhaKhoaHub Là Gì?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NhaKhoaHub là nền tảng review và tìm kiếm cơ sở nha khoa phù hợp theo loại dịch vụ và khu vực.",
        },
      },
      {
        "@type": "Question",
        name: "NhaKhoaHub Có Phải Phòng Khám Nha Khoa Không?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NhaKhoaHub không phải là phòng khám nha khoa, chúng tôi kết nối khách hàng với cơ sở nha khoa trên toàn quốc.",
        },
      },
      {
        "@type": "Question",
        name: "NhaKhoaHub Cung Cấp Dịch Vụ Gì? Tại Sao Nên Sử Dụng?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NhaKhoaHub được xây dựng để giúp người dùng tìm kiếm, so sánh và lựa chọn các cơ sở nha khoa uy tín, chất lượng. Với hệ thống hàng hơn 10.000 cơ sở nha khoa uy tín, khách hàng có thể đưa ra lựa chọn phù hợp nhất về dịch vụ, chi phí, thời gian và địa điểm thăm khám.",
        },
      },
      {
        "@type": "Question",
        name: "Sử Dụng NhaKhoaHub Có Mất Phí Không?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Không, NhaKhoaHub miễn phí hoàn toàn cho tất cả đối tượng người dùng.",
        },
      },
      {
        "@type": "Question",
        name: "Liên Hệ Với Phòng Khám Để Nhận Tư Vấn Và Đặt Lịch Trên NhaKhoaHub Như Thế Nào?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bạn thực hiện các bước sau đây: Bước 1: Tại trang chủ, tìm kiếm phòng khám nha khoa theo dịch vụ hoặc khu vực. Bước 2: Lựa chọn cơ sở mà bạn mong muốn thăm khám. Bước 3: Kết nối trực tiếp với phòng khám để nhận tư vấn hoặc đặt lịch tại khung chat của trang chi tiết phòng khám.",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <Script
          type="application/ld+json"
          id="faq"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(FAQ),
          }}
        />
        <Script
          type="application/ld+json"
          id="schema"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
        <Script
          type="application/ld+json"
          id="organization"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization),
          }}
        />
      </head>
      <body className={roboto.className}>
        <NextTopLoader />
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Header />
            {children}
            <Footer />
          </HydrationBoundary>
        </Providers>
        <Wrapper />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_GA_MEASUREMENT_ID} />
    </html>
  );
}
