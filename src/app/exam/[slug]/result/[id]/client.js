"use client";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  CaretLeftOutlined,
  ClockCircleOutlined,
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
  Statistic,
  Radio,
  Checkbox,
  Input,
} from "antd";
import "@/src/style/result-exam.css";
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
import audioTest from "@/public/audio/example_voice.mp3";
import axios from "axios";
import { BASE_URL } from "@/src/const/const";

export default function ResultExamPage(props) {
  const result = props.dataResultTest;
  console.log("propss", props.dataResultTest);
  return (
    <div className="wp-result-page">
      <Link href={`/exam/${props.slug}`}>
        <div className="back-button">
          <CaretLeftOutlined /> Quay lại
        </div>
      </Link>
      <div className="title-assignments">{result.nameAssignment}</div>
      <Row gutter={[30, 45]} className="result-row">
        {result.task?.map((item) => {
          const percent = (item.score.score / 10 / item.score.total) * 100;
          return (
            <Col xl={12} md={12} xs={24} sm={24} className="result-col">
              <div className="wp-left">
                <div className="task-title">{item.taskType.toLowerCase()}</div>
                <div className="amount-correct">
                  <div className="square"></div>
                  <div className="amount">{`Correct: ${item.score.score / 10}/${
                    item.score.total
                  }`}</div>
                </div>
              </div>
              <Progress
                type="circle"
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                percent={percent}
                strokeWidth={20}
                format={() => item.score.score}
                width={180}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
