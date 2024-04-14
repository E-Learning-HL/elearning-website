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

const Header = ({ sessionServer }) => {
  const router = useRouter();
  const pathname = usePathname();
  const showHeader = !HIDE_HEADER.includes(pathname);
  const [anchorTarget, setAnchorTarget] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openServiceMenu, setOpenServiceMenu] = useState(true);
  const [openBlogMenu, setOpenBlogMenu] = useState(true);
  const [active, setActive] = useState(null);
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
  const blogItems = data.listCategoryBlog.data?.result?.map((item) => {
    if (item.name != "Uncategorized") {
      return {
        key: item.term_id.toString(),
        label: (
          <Link href={`/blog/${item.slug}`} onClick={() => setOpenMenu(false)}>
            {item.name}
          </Link>
        ),
      };
    }
  });

  const items = [
    {
      key: "forgot",
      label: <Link href={`/user/password`}>Quên Mật Khẩu</Link>,
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
                        router.push("/");
                      }}
                    >
                      <span>Khóa học</span>
                      <Image
                        src={openServiceMenu ? arrowUpLine : arrowDownLine}
                      />
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
                      <span>Blog</span>
                      <Image src={openBlogMenu ? arrowUpLine : arrowDownLine} />
                    </div>
                    {<Menu mode={"inline"} items={blogItems}></Menu>}
                  </div>
                </Drawer>
              </div>
              <Link href="/" className={styles.wpLogo}>
                <Image className={styles.logo} src={logo} />
                <Image className={styles.logoMobile} src={logoMobile} />
              </Link>
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
                <Dropdown menu={{ items: blogItems }}>
                  <span className={styles.dropdownLink}>
                    <Link href="/blog">
                      <Space>Blog</Space>
                    </Link>
                    {/* <Image src={arrowDownLine} /> */}
                  </span>
                </Dropdown>
              </div>
              {!session?.user ? (
                <>
                  <Button
                    href="/login"
                    className={`${styles.buttonClinic} button-white`}
                    // onClick={() => router.push(`/login`)}
                  >
                    Login
                  </Button>
                  <Button
                    href="/register"
                    className={`${styles.buttonRegister} button-blue`}
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
                        size={50}
                        icon={<UserOutlined />}
                        style={{ backgroundColor: "#5ab069" }}
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
