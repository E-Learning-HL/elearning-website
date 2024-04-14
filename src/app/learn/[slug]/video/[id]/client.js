"use client";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  CaretLeftOutlined,
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
import "@/src/style/video-learn.css";
const { Header, Content, Footer, Sider } = Layout;
import Image from "next/image";
import logo from "@/public/image/elearning-logo.png";
import iconLearn from "@/public/icon/icon-learn.png";
import iconExam from "@/public/icon/icon-exam.png";
import iconExamLesson from "@/public/icon/icon-lesson-exam.png";
import iconVideoLesson from "@/public/icon/icon-lesson-video.png";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const { Panel } = Collapse;

export default function VideoLearningPage({ dataLesson, dataCourse }) {
  const router = useRouter();
  console.log("propss", dataLesson);
  console.log("propssdataCourse", dataCourse);
  const items = [
    {
      key: 1,
      label: (
        <div className="wp-label">
          <Image src={iconLearn} alt="icon" className="iconSlider"></Image>
          <div className="lable">Learn</div>
        </div>
      ),
    },
    {
      key: 2,
      label: (
        <div className="wp-label">
          <Image src={iconExam} alt="icon" className="iconSlider"></Image>
          <div className="lable">Exam</div>
        </div>
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
          }}
        >
          Đăng xuất
        </div>
      ),
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];
  const itemCourse = [
    {
      label: (
        <div className="lable-item-courses">
          <div className="first-item-course">
            <Image src={iconExamLesson} className="img-course"></Image>
            <div className="title-orther-course">Bứt phá IELTS 3.0-4.5+</div>
          </div>
          <div className="button-orther-course">Bắt đầu học</div>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div className="lable-item-courses">
          <div className="first-item-course">
            <Image src={iconExamLesson} className="img-course"></Image>
            <div className="title-orther-course">Bứt phá IELTS 3.0-4.5+</div>
          </div>
          <div className="button-orther-course">Bắt đầu học</div>
        </div>
      ),
      key: "1",
    },
  ];

  return (
    <div className="wp-video-page">
      <Layout className="wp-layout">
        <Layout className="left-layout">
          {/* <Header className="wp-header">
            <Row gutter={[20, 0]}>
              <Col xl={16} xs={24} sm={24} md={16} className="course-select">
                <Dropdown menu={{ items: itemCourse }} trigger={["click"]}>
                  <div className="button-drop-down">
                    <div children="current-course">Bứt phá IELTS 3.0-4.5+</div>
                    <DownOutlined />
                  </div>
                </Dropdown>
              </Col>
              <Col xl={8} xs={24} sm={24} md={8}>
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
          </Header> */}
          <Content>
            <div className="wp-content">
              <div className="wp-header-content">
                <div className="back-button">
                  <CaretLeftOutlined /> Quay lại
                </div>
              </div>
              <div className="video-learn">
                <video
                  controls
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    maxHeight: "60vh",
                  }}
                  controlsList="nodownload"
                >
                  <source
                    src={dataLesson?.file[0]?.url}
                    // type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="title-lesson">{dataLesson.nameLesson}</div>
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
        <Sider
          theme="light"
          width={450}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="wp-content-right">
            <div className="title-course">{dataCourse.course.nameCourse}</div>
            <Collapse defaultActiveKey={""} bordered={false} ghost>
              {dataCourse?.course?.section.map((item, index) => {
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
                          <div className="title">{`Section ${index+1}: ${item.nameSection}`}</div>
                          <div className="section-progess">
                            <Progress
                              strokeColor={{
                                "0%": "#108ee9",
                                "100%": "#87d068",
                              }}
                              percent={79}
                            />
                          </div>
                        </div>
                      </div>
                    }
                    key={item.id}
                  >
                    <div className="list-lesson">
                      {item.lesson?.map((itemLesson) => {
                        return (
                          <Link
                            href={`/learn/${dataCourse.course.id}/video/${itemLesson.id}`}
                          >
                            <div
                              className="item-lesson"
                              // onClick={() => {
                              //   router.push(
                              //     `/learn/${dataCourse.course.id}/video/${itemLesson.id}`
                              //   );
                              // }}
                            >
                              <Image
                                src={iconLearn}
                                className="image-lesson"
                              ></Image>
                              <div className="item-lesson-right">
                                <div className="title-lesson">
                                  {itemLesson.nameLesson}
                                </div>
                                <div className="type">
                                  {/* <Image
                                    src={iconVideoLesson}
                                    className="icon-type"
                                  ></Image> */}
                                  <div className="text-type">
                                    <VideoCameraOutlined />&nbsp;&nbsp;Video
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </Panel>
                );
              })}
            </Collapse>
          </div>
        </Sider>
      </Layout>
    </div>
  );
}
