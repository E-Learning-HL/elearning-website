"use client";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
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
} from "antd";
import "@/src/style/learn.css";
const { Header, Content, Footer, Sider } = Layout;
import Image from "next/image";
import logo from "@/public/image/elearning-logo.png";
import iconLearn from "@/public/icon/icon-learn.png";
import iconExam from "@/public/icon/icon-exam.png";
import iconExamLesson from "@/public/icon/icon-lesson-exam.png";
import iconVideoLesson from "@/public/icon/icon-lesson-video.png";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import LayoutStudy from "@/src/component/study/layout-study";

export default function LearnPage() {


  return (
    <div className="learn-page">
      {/* <Layout className="wp-layout">
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
              <Image src={logo} className="logo" alt="logo"></Image>
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
                      <div className="user-name">123123</div>
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
                    <Collapse defaultActiveKey={""} bordered={false} ghost>
                      <Panel
                        header={
                          <div className="section-panel">
                            <Image
                              alt=""
                              src={iconExam}
                              className="image-section"
                            ></Image>
                            <div className="right-panel">
                              <div className="title">Unit Starter</div>
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
                        key="1"
                      >
                        <div className="list-lesson">
                          <div className="item-lesson">
                            <Image
                              src={iconLearn}
                              className="image-lesson"
                            ></Image>
                            <div className="item-lesson-right">
                              <div className="title-lesson">
                                Tìm hiểu về khóa học
                              </div>
                              <div className="type">
                                <Image
                                  src={iconVideoLesson}
                                  className="icon-type"
                                ></Image>
                                <div className="text-type">Video</div>
                              </div>
                            </div>
                          </div>
                          <div className="item-lesson">
                            <Image
                              src={iconLearn}
                              className="image-lesson"
                            ></Image>
                            <div className="item-lesson-right">
                              <div className="title-lesson">
                                Tìm hiểu về khóa học
                              </div>
                              <div className="type">
                                <Image
                                  src={iconVideoLesson}
                                  className="icon-type"
                                ></Image>

                                <div className="text-type">Video</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                </Col>
                <Col xl={8} xs={24} sm={24} md={8}>
                  <div className="wp-content-right"></div>
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </Layout> */}
      <LayoutStudy />
    </div>
  );
}
