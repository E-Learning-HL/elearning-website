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

export default function ExamPage(props) {
 console.log("props", props)

  return (
    <div className="learn-page">
      <LayoutStudy dataAllTest={props.dataAllTest} ownedCourse={props.ownedCourse} params={props.params}/>
    </div>
  );
}
