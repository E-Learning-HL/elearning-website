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
import React, { useState, useEffect, useRef } from "react";
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
import { Form } from "antd";
import silenceAudio from "@/public/audio/250-milliseconds-of-silence.mp3";

const { Panel } = Collapse;

export default function VideoLearningPage({ dataLesson, dataCourse }) {
  const [examForm] = Form.useForm();
  const router = useRouter();
  //   console.log("propss", dataLesson);
  //   console.log("propssdataCourse", dataCourse);
  const audioRef = useRef(null);
  const { data: session } = useSession();
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

//   useEffect(() => {
//     const audioElement = audioRef.current;
//     if (audioElement) {
//       audioElement.play();
//     }
//   }, [audioRef.current]);

  return (
    <div className="wp-video-page">
      <Layout className="left-layout">
        <Header className="wp-header">
          <div className="user-info">
            <div className="user-name">{session?.user?.name}</div>
            <Avatar
              size={50}
              icon={<UserOutlined />}
              style={{ backgroundColor: "#5ab069" }}
            />
          </div>
          <div className="control-time-audio">
            <iframe src={silenceAudio} allow="autoplay" id="audio" style="display: none"></iframe>
            <audio controls id="audio-listening" autoPlay >
              <source
                src="http://localhost:9000/elearning/870c3464-0563-4eb0-a948-71392329d8be_Cambridge%20Grammar%20for%20IELTS.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=elearning%2F20240410%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240410T040059Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=43083899f428609c0ab90707594ae4a9525e1866aa2ef126b8c8e682a883c0b6"
                // type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
          {/* <Row gutter={[20, 0]}>
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
                  <a onClick={(e) => e.preventDefault()}></a>
                </Dropdown>
              </div>
            </Col>
          </Row> */}
        </Header>
        <Content>
          {/* <div className="wp-content">
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
          </div> */}
        </Content>
      </Layout>
    </div>
  );
}
