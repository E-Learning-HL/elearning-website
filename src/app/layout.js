// import { Roboto_Flex } from "next/font/google";
import "antd/dist/antd.css";
import "./globals.css";
// import useStore from "@/src/util/zustandstore";
import "@/src/style/common.css";
import NextTopLoader from "nextjs-toploader";
import Header from "../component/header/header";
import Footer from "../component/footer/footer";
import Wrapper from "../app/client";
import Script from "next/script";
import AuthProviders from "./auth-providers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

// const roboto = Roboto_Flex({ subsets: ["latin"] });
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
  const session = await getServerSession(authOptions);

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
  return (
    <html lang="en">
      <body>
        <NextTopLoader />
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <AuthProviders>
              <Header sessionServer = {session}/>
              {children}
              <Footer />
            </AuthProviders>
          </HydrationBoundary>
        </Providers>
        <Wrapper />
      </body>
    </html>
  );
}
