"use client";
import styles from "./header.module.scss";
import "@/src/style/header.css";
import Image from "next/image";
import logo from "@/public/image/elearning-logo.png";
import logoMobile from "@/public/image/logo-nha-khoa-hub-mobile.png";
import * as NProgress from "nprogress";
import { useRouter, usePathname } from "next/navigation";
import {
  Button,
  Col,
  Drawer,
  Dropdown,
  Menu,
  Space,
  Row,
  Avatar,
  notification,
} from "antd";
import {
  MenuOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import arrowDownLine from "@/public/icon/arrow-down-line.svg";
import arrowUpLine from "@/public/icon/arrow-up-line.svg";
import { useQuery } from "@tanstack/react-query";
import { toSlug } from "@/src/util/util";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HIDE_HEADER, HIDE_HEADER_DYNAMIC } from "@/src/const/const";
import "@/src/style/common.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { getAllMyCourse } from "@/src/app/service";
import ImageCommon from "../image/image";

const Header = ({ sessionServer }) => {
  const router = useRouter();
  const pathname = usePathname();
  const showHeader = !HIDE_HEADER.includes(pathname);
  const [anchorTarget, setAnchorTarget] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openServiceMenu, setOpenServiceMenu] = useState(true);
  const [openBlogMenu, setOpenBlogMenu] = useState(true);
  const [active, setActive] = useState(null);
  const [dataMyCourse, setDataMyCourse] = useState(null);
  const { data: session } = useSession();
  const backToHome = () => {
    NProgress.start();
    router.push(`/`);
  };
  const showFooterDynamic = !HIDE_HEADER_DYNAMIC.some((route) =>
    pathname.startsWith(route)
  );
  const handleOpenMenu = (menuType) => {
    if (menuType === "service") {
      openServiceMenu === true
        ? setOpenServiceMenu(false)
        : setOpenServiceMenu(true);
    } else {
      openBlogMenu === true ? setOpenBlogMenu(false) : setOpenBlogMenu(true);
    }
  };
  const handleClick = (element) => {};
  const { data } = useQuery({
    queryKey: ["api-common"],
  });
  // console.log("data =========", data);
  const serviceItems =
    data &&
    data?.listService &&
    data?.listService?.map((item) => {
      return {
        key: item.id.toString(),
        label: (
          <Link
            href={`/${toSlug(item.name)}`}
            onClick={() => setOpenMenu(false)}
          >
            {item.name}
          </Link>
        ),
      };
    });
  useEffect(() => {
    // console.log("result", session)
    const fetch = async () => {
      if (session?.user) {
        const result = await getAllMyCourse(session?.user?.access_token);
        setDataMyCourse(result);
      }
    };
    fetch();
  }, [session]);

  const myCourseItems =
    // dataMyCourse?.length > 0
    //   ?
    dataMyCourse?.map((item) => {
      return {
        key: item.id,
        label: (
          <Link
            href={`/learn/${item.course.id}`}
            onClick={() => setOpenMenu(false)}
          >
            <div className="wp-my-course">
              <ImageCommon
                data={item?.course?.file[0]?.url}
                style={"img-course"}
              ></ImageCommon>
              <div className="title-orther-course">
                {item?.course?.nameCourse}
              </div>
            </div>
          </Link>
        ),
      };
    });
  // :
  // {
  //     key: 0,
  //     label: (
  //       <div
  //         className="wp-my-course-nothing"
  //         style={{ display: "flex", justifyContent: "center", color:'#013533', fontSize:'16px', fontWeight:'600' }}
  //       >
  //         Bạn chưa sở hữu khóa học nào
  //       </div>
  //     ),
  //   };

  const items = [
    {
      key: "forgot",
      label: <Link href={`/user/password`}>Đổi Mật Khẩu</Link>,
      icon: <QuestionCircleOutlined />,
    },
    {
      label: (
        <div
          className="labelSignOut"
          onClick={() => {
            signOut({ redirect: false }),
              notification.success({
                message: `Bạn đã đăng xuất!`,
                description: "",
                placement: "top",
              });
          }}
        >
          Đăng xuất
        </div>
      ),
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];
  // const scrollTo = (e) => {
  //   e.preventDefault();
  //   setOpenMenu(false);
  //   anchorTarget.scrollIntoView({ behavior: "smooth", block: "start" });
  // };

  // useEffect(() => {
  //   setAnchorTarget(document.getElementById("registrationClinic"));
  // }, [props]);

  return (
    <>
      {showHeader && showFooterDynamic && (
        <div className={styles.dataHeader}>
          <div className={styles.wrapperHeader}>
            <div className={styles.contentHeader}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className={styles.menuHeader}>
                  <div>
                    {openMenu ? (
                      <CloseOutlined
                        onClick={() => {
                          setOpenMenu(false);
                        }}
                      />
                    ) : (
                      <MenuOutlined
                        onClick={() => {
                          setOpenMenu(true);
                        }}
                      />
                    )}
                  </div>
                  <Drawer
                    placement={"left"}
                    open={openMenu}
                    onClose={() => {
                      setOpenMenu(false);
                    }}
                  >
                    <div className={"dropdownHeaderMobile"}>
                      <div
                        className={`dropdownHeaderMobileItem ${
                          !(openBlogMenu || openServiceMenu) ? "opened" : ""
                        }`}
                      >
                        <Link href="/" onClick={() => setOpenMenu(false)}>
                          Trang Chủ
                        </Link>
                      </div>
                      <div
                        className={`dropdownHeaderMobileItem ${
                          openServiceMenu ? "opened" : ""
                        }`}
                        onClick={() => {
                          // handleOpenMenu("service");
                          setOpenMenu(false);
                          router.push("/course");
                        }}
                      >
                        <span>Khóa học</span>
                      </div>
                      <div
                        className={`dropdownHeaderMobileItem ${
                          openServiceMenu ? "opened" : ""
                        }`}
                        onClick={() => {
                          // handleOpenMenu("service");
                          setOpenMenu(false);
                          router.push("/build-roadmap");
                        }}
                      >
                        <span>Xây dựng lộ trình</span>
                      </div>
                      {<Menu mode={"inline"} items={serviceItems}></Menu>}
                      <div
                        className={`dropdownHeaderMobileItem ${
                          openBlogMenu ? "opened" : ""
                        }`}
                        onClick={() => {
                          handleOpenMenu("blog");
                        }}
                      >
                        <span>Khóa học của tôi</span>
                        <Image
                          src={openBlogMenu ? arrowUpLine : arrowDownLine}
                        />
                      </div>
                      {<Menu mode={"inline"} items={myCourseItems}></Menu>}
                    </div>
                  </Drawer>
                </div>
                <Link href="/" className={styles.wpLogo}>
                  <Image className={styles.logo} src={logo} />
                  <Image className={styles.logoMobile} src={logo} />
                </Link>
              </div>

              <div className={styles.dropdownHeader}>
                <Link href={"/course"}>
                  <span className={styles.dropdownLink}>
                    <Space
                      className={styles.itemHover}
                      style={{ cursor: "pointer" }}
                    >
                      Khóa học
                    </Space>
                  </span>
                </Link>

                {/* <Dropdown
                  // menu={{ items: serviceItems }}
                  // open={true}
                  dropdownRender={() => {
                    if (serviceItems.length > 8) {
                      return (
                        <div className="drop-content">
                          <Row gutter={[0, 6]}>
                            {serviceItems.map((item) => {
                              return <Col span={12}>{item.label}</Col>;
                            })}
                          </Row>
                        </div>
                      );
                    } else {
                      return (
                        <div className="drop-content">
                          <Row gutter={[0, 6]}>
                            {serviceItems.map((item) => {
                              return <Col span={24}>{item.label}</Col>;
                            })}
                          </Row>
                        </div>
                      );
                    }
                  }}
                >
                  <span className={styles.dropdownLink}>
                    <Space className={styles.itemHover}>Khóa học</Space>
                  </span>
                </Dropdown> */}
                {/* thuc tap */}
                <Link href={"/build-roadmap"}>
                  <span className={styles.buildRoadmap}>
                    <Space
                      className={styles.itemHover}
                      style={{ cursor: "pointer" }}
                    >
                      Xây dựng lộ trình
                    </Space>
                  </span>
                </Link>
                {session?.user && (
                  <Dropdown
                    menu={{ items: myCourseItems ? myCourseItems : [] }}
                    getPopupContainer={() =>
                      document.getElementById("my-courses")
                    }
                  >
                    {/* <Link href={"/my-learning"}> */}
                    <span className={styles.myCourse} id="my-courses">
                      <Space
                        className={styles.itemHover}
                        style={{ cursor: "pointer" }}
                      >
                        Khóa học của tôi
                      </Space>
                    </span>
                    {/* </Link> */}
                  </Dropdown>
                )}
              </div>
              {/* thuc tap */}
              {!session?.user ? (
                <>
                  <Button
                    href="/login"
                    className={`${styles.buttonClinic}`}
                    // onClick={() => router.push(`/login`)}
                  >
                    Login
                  </Button>
                  <Button
                    href="/register"
                    className={`${styles.buttonRegister}`}
                    // onClick={scrollTo}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <div id="user-dropdown">
                  <Dropdown
                    menu={{ items: items }}
                    trigger={["click"]}
                    className={styles.avatar}
                    // placement="bottomRight"
                    placement="bottom"
                    getPopupContainer={() =>
                      document.getElementById("user-dropdown")
                    }
                    overlayStyle={{ marginTop: "68px" }}
                    // styles={{ marginTop:"20px" }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Avatar
                        size={{ xl: 50, md: 50, sm: 35, xs: 35 }}
                        icon={<UserOutlined />}
                        style={{ backgroundColor: "#5a96b0" }}
                      />
                    </a>
                  </Dropdown>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
