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
import "@/src/style/start-exam.css";
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

const { Panel } = Collapse;

export default function StartExamPage({ dataTests, session, params }) {
  const { Countdown } = Statistic;
  const [listeningForm] = Form.useForm();
  const [readingForm] = Form.useForm();
  const router = useRouter();
  //   console.log("propss", dataLesson);
  //   console.log("propssdataCourse", dataCourse);
  const audioRef = useRef(null);
  // const { data: session } = useSession();
  const [showModal, setShowModal] = useState(true);
  const [currentSection, setCurrentSection] = useState("LISTENING");
  const [remainingTime, setRemainingTime] = useState(null);
  const taskListening = dataTests?.task?.find(
    (item) => item.taskType === "LISTENING"
  );
  const taskReading = dataTests?.task?.find(
    (item) => item.taskType === "READING"
  );
  console.log("taskListening", taskListening);
  console.log("taskReading", taskReading);

  function replaceSpecialChars(html, index) {
    let subIndex = 0;
    const replacedHTML = html.replace(/\{\@\@\}/g, function (match) {
      subIndex++;
      return `<input name="question${index}-${subIndex}" />`;
    });
    return replacedHTML;
  }

  useEffect(() => {
    const article = document.getElementById("reading-content");
    let selectedRange; // Biến để lưu trữ vùng được chọn
    // Sự kiện mouseup
    article?.addEventListener(
      "mouseup",
      function (event) {
        selectedRange = window.getSelection().getRangeAt(0); // Lưu trữ vùng được chọn
        handlerFunction(event);
      },
      false
    );

    // Sự kiện click cho phần "share-snippet"
    document.addEventListener("click", function (event) {
      const shareSnippet = document.getElementById("share-snippet");
      if (shareSnippet && event.target.closest("#share-snippet")) {
        // Tạo thẻ <mark> và bao quanh nội dung được chọn
        var markElement = document.createElement("mark");
        selectedRange.surroundContents(markElement);
        // Loại bỏ phần "share-snippet"
        shareSnippet.remove();
      }
    });

    // Hàm xử lý sự kiện mouseup
    function handlerFunction(event) {
      console.log(window.getSelection().getRangeAt(0).toString());

      // Loại bỏ phần "share-snippet" nếu đã tồn tại
      const shareSnippet = document.getElementById("share-snippet");
      if (shareSnippet) {
        shareSnippet.remove();
      }

      // Kiểm tra xem có văn bản nào được chọn không
      if (window.getSelection().toString().length > 0) {
        // Tính toán vị trí cho phần "share-snippet"
        var scrollTop =
          window?.pageYOffset !== undefined
            ? window?.pageYOffset
            : (
                document.documentElement ||
                document.body.parentNode ||
                document.body
              ).scrollTop;
        const posX = event.clientX - 110;
        const posY = event.clientY + 20 + scrollTop;
        // Thêm phần "share-snippet" vào DOM
        document.body.insertAdjacentHTML(
          "beforeend",
          '<div id="share-snippet" style="position: absolute; top: ' +
            posY +
            "px; left: " +
            posX +
            'px;"><div class="speech-bubble"><div class="share-inside"><img class="image-highlight" src="/icon/icon-highlight.png" alt="Your Image"> Mark</div></div></div>'
        );
      }
    }
  }, [currentSection]);

  const onSubmit = async () => {
    if (currentSection === "LISTENING") {
      const fieldsValue = await listeningForm.validateFields();
      const questionInput = taskListening?.question?.find(
        (item) => item.questionType === "INPUT"
      );
      const countInput = (questionInput?.title.match(/{@@}/g) || [])?.length;

      const questionInputListening = {
        questionId: questionInput?.id,
        questionType: questionInput?.questionType,
        answer: [],
      };
      for (let i = 1; i <= countInput; i++) {
        const inputForm = document?.getElementById("input-form");
        const inputValue =
          inputForm?.elements[`question${questionInput?.id}-${i}`]?.value;
        const elementAws = {
          answerText: inputValue,
        };
        questionInputListening.answer.push(elementAws);
      }

      // console.log("input", inputValue);
      const bodyListening = {
        ...fieldsValue.TaskListening,
        question: [
          ...Object?.values(fieldsValue.TaskListening.question).map((item) => {
            if (item.questionType === "SIMPLE_CHOICE") {
              return {
                questionId: item.questionId,
                questionType: item.questionType,
                answer: [{ answerId: item.answer }],
              };
            }
            return {
              questionId: item.questionId,
              questionType: item.questionType,
              answer: item.answer?.map((itemAws) => {
                return {
                  answerId: itemAws,
                };
              }),
            };
          }),
        ],
      };
      bodyListening.question.push(questionInputListening);
      axios.post(
        `${BASE_URL}/api/user-answers`,
        { ...bodyListening },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.access_token}`,
          },
        }
      ).then((res) => {
        setCurrentSection("READING");
        setRemainingTime(Date.now() + 1000 * 60 * taskReading?.time)
      })
      .catch(error => {

      })
    } else if (currentSection === "READING") {
      const fieldsValue = await readingForm.validateFields();
      const questionInput = taskReading?.question?.find(
        (item) => item.questionType === "INPUT"
      );
      const countInput = (questionInput?.title.match(/{@@}/g) || [])?.length;

      const questionInputReading = {
        questionId: questionInput?.id,
        questionType: questionInput?.questionType,
        answer: [],
      };
      for (let i = 1; i <= countInput; i++) {
        const inputForm = document?.getElementById("input-form");
        const inputValue =
          inputForm?.elements[`question${questionInput?.id}-${i}`]?.value;
        const elementAws = {
          answerText: inputValue,
        };
        questionInputReading.answer.push(elementAws);
      }

      // console.log("input", inputValue);
      console.log("fieldsValue", fieldsValue?.TaskReading);
      const bodyReading = {
        ...fieldsValue?.TaskReading,
        question: [
          ...Object?.values(fieldsValue?.TaskReading?.question)?.map((item) => {
            if (item.questionType === "SIMPLE_CHOICE") {
              return {
                questionId: item.questionId,
                questionType: item.questionType,
                answer: [{ answerId: item.answer }],
              };
            }
            return {
              questionId: item.questionId,
              questionType: item.questionType,
              answer: item.answer?.map((itemAws) => {
                return {
                  answerId: itemAws,
                };
              }),
            };
          }),
        ],
      };
      bodyReading.question.push(questionInputReading);
      axios.post(
        `${BASE_URL}/api/user-answers`,
        { ...bodyReading },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.access_token}`,
          },
        }
      )
      .then((res) => {
        router.push(`/exam/${params.slug}/result/${params.id}`)
      })
      .catch(error => {

      })
      // if (result.data.score){
      //   router.push(`/exam/${params.slug}/result/${params.id}`)
      // };
      // console.log("====result", result);
      // console.log("inputValue2", bodyReading);
    }
  };

  return (
    <div className="wp-video-page">
      {showModal && (
        <div className="modal">
          <div className="wp-test-sound">
            Put on your headphones and click the Play sound button to test
            <div
              className="button-test-sound button-blue"
              onClick={() => {
                const audioElement = document.getElementById("audio-test");
                if (audioElement) {
                  audioElement.play();
                }
                // setShowModal(false);
              }}
            >
              Play sound
            </div>
          </div>
          <div className="wp-continue">
            If the headphones are working correctly, press "Next" to continue.
            <div
              className="button-test-sound button-blue"
              onClick={() => {
                const audioElement = document.getElementById("audio-listening");
                if (audioElement) {
                  audioElement.play();
                }
                setShowModal(false);
                setRemainingTime(Date.now() + 1000 * 60 * taskListening?.time)
              }}
            >
              Next
            </div>
          </div>
          <div className="control-audio" style={{ display: "none" }}>
            <audio controls id="audio-test">
              <source src={audioTest} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      )}

      <Layout className={showModal ? "hidden" : "left-layout"}>
        <Header className="wp-header">
          <div className="user-info">
            <div className="user-name">{session?.user?.name}</div>
            <Avatar
              size={50}
              icon={<UserOutlined />}
              style={{ backgroundColor: "#5a96b0" }}
            />
          </div>
          {currentSection === "LISTENING" && (
            <div className="control-audio" style={{ display: "none" }}>
              <audio controls id="audio-listening">
                <source
                  src={taskListening?.file[0]?.url}
                  // type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          <div className="control-countdown">
            <ClockCircleOutlined />
            &nbsp;&nbsp;
            <Countdown
              value={remainingTime}
              format="mm"
              className="count-down-number"
              onFinish={onSubmit}
            />
            &nbsp;&nbsp;
            {"minute(s) left"}
          </div>
          <div className="button-finish button-blue" onClick={onSubmit}>
            Finish Section
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
        <Content className="wp-content">
          {currentSection === "LISTENING" ? (
            <div className="content-listening">
              <Form form={listeningForm}>
                <Form.Item
                  name={["TaskListening", "taskId"]}
                  initialValue={taskListening.id}
                  style={{ display: "none" }}
                ></Form.Item>
                <Row gutter={[20, 30]}>
                  {/* listening task first */}
                  {taskListening.question?.map((item, index) => {
                    console.log("-----", item);
                    let html = "";
                    if (item.questionType === "INPUT") {
                      html = replaceSpecialChars(item.title, item.id);
                      return (
                        <Col xl={24}>
                          <div className="wp-input-choice">
                            <div className="index-question">
                              Question {index + 1}
                            </div>
                            <div>
                              <form id="input-form">
                                <div
                                  // className={styles.titleCourse}
                                  dangerouslySetInnerHTML={{
                                    __html: html,
                                  }}
                                ></div>
                              </form>
                            </div>
                          </div>
                        </Col>
                      );
                    } else if (item.questionType === "SIMPLE_CHOICE") {
                      return (
                        <Col xl={12}>
                          <div className="wp-simple-choice">
                            <div className="index-question">
                              Question {index + 1}
                            </div>
                            <div className="title">{item.title}</div>
                            <Form.Item
                              name={[
                                "TaskListening",
                                "question",
                                `Question${item.id}`,
                                "questionId",
                              ]}
                              initialValue={item.id}
                              style={{ display: "none" }}
                            ></Form.Item>
                            <Form.Item
                              name={[
                                "TaskListening",
                                "question",
                                `Question${item.id}`,
                                "questionType",
                              ]}
                              initialValue={item.questionType}
                              style={{ display: "none" }}
                            ></Form.Item>
                            <Form.Item
                              name={[
                                "TaskListening",
                                "question",
                                `Question${item.id}`,
                                "answer",
                              ]}
                            >
                              <Radio.Group
                              // size="large"
                              // className="simple-choice-radio"
                              // onChange={(e) => setPaymentMethod(e.target.value)}
                              >
                                <Space direction="vertical">
                                  {item.answer?.map((itemAws) => {
                                    return (
                                      <Radio value={itemAws.id}>
                                        {itemAws.content}
                                      </Radio>
                                    );
                                  })}
                                </Space>
                              </Radio.Group>
                            </Form.Item>
                          </div>
                        </Col>
                      );
                    } else if (item.questionType === "MULTIPLE_CHOICE") {
                      return (
                        <Col xl={12}>
                          <div className="wp-multiple-choice">
                            <div className="index-question">
                              Question {index + 1}
                            </div>
                            <div className="title">{item.title}</div>
                            <Form.Item
                              name={[
                                "TaskListening",
                                "question",
                                `Question${item.id}`,
                                "questionId",
                              ]}
                              initialValue={item.id}
                              style={{ display: "none" }}
                            ></Form.Item>
                            <Form.Item
                              name={[
                                "TaskListening",
                                "question",
                                `Question${item.id}`,
                                "questionType",
                              ]}
                              initialValue={item.questionType}
                              style={{ display: "none" }}
                            ></Form.Item>
                            <Form.Item
                              name={[
                                "TaskListening",
                                "question",
                                `Question${item.id}`,
                                "answer",
                              ]}
                            >
                              <Checkbox.Group
                                style={{
                                  width: "100%",
                                }}
                                // onChange={onChange}
                              >
                                <Space direction="vertical">
                                  {item.answer?.map((itemAws) => {
                                    return (
                                      <Checkbox value={itemAws.id}>
                                        {itemAws.content}
                                      </Checkbox>
                                    );
                                  })}
                                </Space>
                              </Checkbox.Group>
                            </Form.Item>
                          </div>
                        </Col>
                      );
                    }
                  })}
                </Row>
              </Form>
            </div>
          ) : (
            <div className="content-reading">
              <Row gutter={[30, 30]}>
                <Col xl={12} md={12} xs={24} sm={24}>
                  <div className="content" id="reading-content">
                    <div
                      // className={styles.titleCourse}
                      dangerouslySetInnerHTML={{
                        __html: taskReading?.content,
                      }}
                    ></div>
                  </div>
                </Col>
                <Col xl={12} md={12} xs={24} sm={24}>
                  <div className="question-reading">
                    <Form form={readingForm}>
                      <Form.Item
                        name={["TaskReading", "taskId"]}
                        initialValue={taskReading.id}
                        style={{ display: "none" }}
                      ></Form.Item>
                      <Row gutter={[20, 20]}>
                        {/* listening task first */}
                        {taskReading.question?.map((item, index) => {
                          let html = "";
                          if (item.questionType === "INPUT") {
                            html = replaceSpecialChars(item.title, item.id);
                            return (
                              <Col xl={24}>
                                <div className="wp-input-choice">
                                  <div className="index-question">
                                    Question {index + 1}
                                  </div>
                                  <div>
                                    <form id="input-form">
                                      <div
                                        // className={styles.titleCourse}
                                        dangerouslySetInnerHTML={{
                                          __html: html,
                                        }}
                                      ></div>
                                    </form>
                                  </div>
                                </div>
                              </Col>
                            );
                          } else if (item.questionType === "SIMPLE_CHOICE") {
                            return (
                              <Col xl={24}>
                                <div className="wp-simple-choice">
                                  <div className="index-question">
                                    Question {index + 1}
                                  </div>
                                  <div className="title">{item.title}</div>
                                  <Form.Item
                                    name={[
                                      "TaskReading",
                                      "question",
                                      `Question${item.id}`,
                                      "questionId",
                                    ]}
                                    initialValue={item.id}
                                    style={{ display: "none" }}
                                  ></Form.Item>
                                  <Form.Item
                                    name={[
                                      "TaskReading",
                                      "question",
                                      `Question${item.id}`,
                                      "questionType",
                                    ]}
                                    initialValue={item.questionType}
                                    style={{ display: "none" }}
                                  ></Form.Item>
                                  <Form.Item
                                    name={[
                                      "TaskReading",
                                      "question",
                                      `Question${item.id}`,
                                      "answer",
                                    ]}
                                  >
                                    <Radio.Group
                                    // size="large"
                                    // className="simple-choice-radio"
                                    // onChange={(e) => setPaymentMethod(e.target.value)}
                                    >
                                      <Space direction="vertical">
                                        {item.answer?.map((itemAws) => {
                                          return (
                                            <Radio value={itemAws.id}>
                                              {itemAws.content}
                                            </Radio>
                                          );
                                        })}
                                      </Space>
                                    </Radio.Group>
                                  </Form.Item>
                                </div>
                              </Col>
                            );
                          } else if (item.questionType === "MULTIPLE_CHOICE") {
                            return (
                              <Col xl={24}>
                                <div className="wp-multiple-choice">
                                  <div className="index-question">
                                    Question {index + 1}
                                  </div>
                                  <div className="title">{item.title}</div>
                                  <Form.Item
                                    name={[
                                      "TaskReading",
                                      "question",
                                      `Question${item.id}`,
                                      "questionId",
                                    ]}
                                    initialValue={item.id}
                                    style={{ display: "none" }}
                                  ></Form.Item>
                                  <Form.Item
                                    name={[
                                      "TaskReading",
                                      "question",
                                      `Question${item.id}`,
                                      "questionType",
                                    ]}
                                    initialValue={item.questionType}
                                    style={{ display: "none" }}
                                  ></Form.Item>
                                  <Form.Item
                                    name={[
                                      "TaskReading",
                                      "question",
                                      `Question${item.id}`,
                                      "answer",
                                    ]}
                                  >
                                    <Checkbox.Group
                                      style={{
                                        width: "100%",
                                      }}
                                      // onChange={onChange}
                                    >
                                      <Space direction="vertical">
                                        {item.answer?.map((itemAws) => {
                                          return (
                                            <Checkbox value={itemAws.id}>
                                              {itemAws.content}
                                            </Checkbox>
                                          );
                                        })}
                                      </Space>
                                    </Checkbox.Group>
                                  </Form.Item>
                                </div>
                              </Col>
                            );
                          }
                        })}
                      </Row>
                    </Form>
                  </div>
                </Col>
              </Row>
            </div>
          )}

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
