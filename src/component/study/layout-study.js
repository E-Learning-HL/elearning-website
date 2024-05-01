"use client";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import {
  Col,
  Layout,
  Menu,
  Row,
  theme,
  Collapse,
  Select,
  Dropdown,
  Space,
  Avatar,
  Progress,
  notification,
} from "antd";
import "@/src/style/layout-stydy.css";
const { Header, Content, Footer, Sider } = Layout;
import Image from "next/image";
import logo from "@/public/image/elearning-logo.png";
import iconLearn from "@/public/icon/icon-learn.png";
import iconExam from "@/public/icon/icon-exam.png";
import iconReturnHome from "@/public/icon/icon-return-home.png";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import ImageCommon from "@/src/component/image/image";
import { useRouter } from "next/navigation";
import * as NProgress from "nprogress";

const { Panel } = Collapse;

export default function LayoutStudy(props) {
  console.log("propsssss", props);
  const router = useRouter();
  const { data: session } = useSession();
  const items = [
    {
      key: 1,
      label: (
        <Link href={`/learn/${props.params}`}>
          <div className="wp-label">
            <Image src={iconLearn} alt="icon" className="iconSlider"></Image>
            <div className="lable">Learn</div>
          </div>
        </Link>
      ),
    },
    {
      key: 2,
      label: (
        <Link href={`/exam/${props.params}`}>
          <div className="wp-label">
            <Image src={iconExam} alt="icon" className="iconSlider"></Image>
            <div className="lable">Exam</div>
          </div>
        </Link>
      ),
    },
    {
      key: 3,
      label: (
        <Link href={"/"}>
          <div className="wp-label">
            <Image
              src={iconReturnHome}
              alt="icon"
              className="iconSlider"
            ></Image>
            <div className="lable">Home</div>
          </div>
        </Link>
      ),
    },
  ];
  const userItems = [
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
              router.push('/')
          }}
        >
          Đăng xuất
        </div>
      ),
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];

  const itemCourse = props.ownedCourse?.map((item) => {
    return {
      key: item?.course?.id,
      label: (
        <div className="lable-item-courses">
          <div className="first-item-course">
            <ImageCommon
              data={item?.course?.file[0]?.url}
              style={"img-course"}
            ></ImageCommon>
            <div className="title-orther-course">
              {item?.course?.nameCourse}
            </div>
          </div>
          <Link href={`/learn/${item?.course?.id}`}>
            <div className="button-orther-course button-blue">Bắt đầu học</div>
          </Link>
        </div>
      ),
    };
  });
  // const itemCourse = [
  //   {
  //     label: (
  //       <div className="lable-item-courses">
  //         <div className="first-item-course">
  //           <Image src={iconExamLesson} className="img-course"></Image>
  //           <div className="title-orther-course">Bứt phá IELTS 3.0-4.5+</div>
  //         </div>
  //         <div className="button-orther-course">Bắt đầu học</div>
  //       </div>
  //     ),
  //     key: "0",
  //   },
  //   {
  //     label: (
  //       <div className="lable-item-courses">
  //         <div className="first-item-course">
  //           <Image src={iconExamLesson} className="img-course"></Image>
  //           <div className="title-orther-course">Bứt phá IELTS 3.0-4.5+</div>
  //         </div>
  //         <div className="button-orther-course">Bắt đầu học</div>
  //       </div>
  //     ),
  //     key: "1",
  //   },
  // ];
  return (
    <Layout className="wp-layout">
      <Sider
        theme="light"
        width={300}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="wp-content-inside">
          <div className="wp-logo">
            <Link href={"/"}>
              <Image src={logo} className="logo" alt="logo"></Image>
            </Link>
          </div>
          <Menu defaultSelectedKeys={["4"]} items={items} />
        </div>
      </Sider>
      <Layout className="right-layout">
        <Header className="wp-header">
          <Row gutter={[20, 0]}>
            <Col xl={16} xs={24} sm={24} md={16} className="course-select">
              <Dropdown menu={{ items: itemCourse }} trigger={["click"]}>
                <div className="button-drop-down">
                  <div children="current-course">
                    {props?.dataCourse
                      ? props?.dataCourse?.course?.nameCourse
                      : props?.dataAllTest?.course?.nameCourse}
                  </div>
                  <DownOutlined />
                </div>
              </Dropdown>
            </Col>
            <Col xl={8} xs={24} sm={24} md={8} className="user_dropdown_none">
              <div id="user-dropdown-inside">
                <Dropdown
                  menu={{ items: userItems }}
                  trigger={["click"]}
                  // placement="bottomRight"
                  placement="bottom"
                  getPopupContainer={() =>
                    document.getElementById("user-dropdown-inside")
                  }
                  overlayStyle={{ marginTop: "68px" }}
                  // styles={{ marginTop:"20px" }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <div className="user-name">{session?.user?.name}</div>
                    <Avatar
                      size={50}
                      icon={<UserOutlined />}
                      style={{ backgroundColor: "#5ab069" }}
                    />
                  </a>
                </Dropdown>
              </div>
            </Col>
          </Row>
        </Header>
        <Content>
          <div className="wp-content">
            <Row gutter={[20, 0]}>
              <Col xl={16} xs={24} sm={24} md={16}>
                <div className="wp-content-left">
                  {props.dataCourse ? (
                    <Collapse defaultActiveKey={""} bordered={false} ghost>
                      {props?.dataCourse?.course?.section?.map((item) => {
                        const randomNumber = Math.floor(Math.random() * 101);
                        return (
                          <Panel
                            header={
                              <div className="section-panel">
                                <Image
                                  alt=""
                                  src={iconExam}
                                  className="image-section"
                                ></Image>
                                <div className="right-panel">
                                  <div className="title">
                                    {item.nameSection}
                                  </div>
                                  <div className="section-progess">
                                    <Progress
                                      strokeColor={{
                                        "0%": "#108ee9",
                                        "100%": "#87d068",
                                      }}
                                      percent={randomNumber}
                                    />
                                  </div>
                                </div>
                              </div>
                            }
                            key={item.id}
                          >
                            <div className="list-lesson">
                              {item.contentSection?.map((itemLesson) => {
                                return (
                                  <div
                                    className="item-lesson button-gray"
                                    onClick={() => {
                                      if (itemLesson.type == "lesson") {
                                        NProgress.start();
                                        router.push(
                                          `/learn/${props?.dataCourse?.course?.id}/video/${itemLesson.item.id}`
                                        );
                                      } else if (
                                        itemLesson.type == "assignment"
                                      ) {
                                      }
                                    }}
                                  >
                                    <Image
                                      src={iconLearn}
                                      className="image-lesson"
                                    ></Image>
                                    <div className="item-lesson-right">
                                      <div className="title-lesson">
                                        {itemLesson.type == "lesson"
                                          ? itemLesson?.item?.nameLesson
                                          : itemLesson?.item?.nameAssignment}
                                      </div>
                                      <div
                                        className="type"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {/* <Image
                                        src={
                                          itemLesson.type == "lesson"
                                            ? iconVideoLesson
                                            : iconExamLesson
                                        }
                                        className="icon-type"
                                      ></Image> */}
                                        <div className="text-type">
                                          {itemLesson.type == "lesson" ? (
                                            <>
                                              <VideoCameraOutlined />
                                              &nbsp;&nbsp;Video
                                            </>
                                          ) : (
                                            <>
                                              <EditOutlined />
                                              &nbsp;&nbsp;Exercise
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </Panel>
                        );
                      })}
                    </Collapse>
                  ) : (
                    <div className="list-tests">
                      {props?.dataAllTest?.listAssignment?.map((item) => {
                        console.log("====", item);
                        return (
                          <div className="item-tests button-gray">
                            <Image
                              alt=""
                              src={iconExam}
                              className="image-exam"
                            ></Image>
                            <div className="exam-info">
                              <div className="title">{item.nameAssignment}</div>
                              <div className="access">
                                <Link
                                  href={`/exam/${props?.dataAllTest?.course.id}/start/${item.id}`}
                                >
                                  <div className="button-start button-blue">
                                    Start
                                  </div>
                                </Link>
                                {item.isChecked && (
                                  <Link
                                    href={`/exam/${props?.dataAllTest?.course.id}/result/${item.id}`}
                                  >
                                    <div className="button-result button-white">
                                      Result
                                    </div>
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Col>
              <Col xl={8} xs={24} sm={24} md={8}>
                <div className="wp-content-right"></div>
              </Col>
            </Row>
          </div>
        </Content>
        {/* <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer> */}
      </Layout>
    </Layout>
  );
}
