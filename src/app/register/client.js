"use client";
import Image from "next/image";
import { Col, Row, Form, Input, Button, Statistic, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import coverLogin from "@/public/image/login-image.png";
import logoElearning from "@/public/image/elearning-logo.png";
import Link from "next/link";
import "@/src/style/login.css";
import { useState, useEffect } from "react";
import { InputOTP } from "antd-input-otp";
import iconGoogle from "@/public/icon/icon-google.png";
import iconFacebook from "@/public/icon/icon-facebook.png";
import axios from "axios";
import { BASE_URL } from "@/src/const/const";
import imageSuccess from "@/public/image/image-success.svg";

const FormItem = Form.Item;
const { Countdown } = Statistic;

export default function RegisterPage() {
  const [action, setAction] = useState("REGISTER");
  const [loginForm] = Form.useForm();
  const [forgotForm] = Form.useForm();
  const [validateForm] = Form.useForm();
  const [resetForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialTime, setInitialTime] = useState();
  const [currentEmail, setCurrentEmail] = useState(null);

  useEffect(() => {
    if (action === "VALIDATE") setInitialTime(Date.now() + 1000 * 60 * 5);
  }, [action]);

  const onFinish = (values) => {
    setLoading(true);
    if (action === "REGISTER") {
      const body = {
        email: values.email,
        password: values.password,
        name: values.username,
        isActive: false,
        verificationCode: 0,
      };
      axios
        .post(`${BASE_URL}/api/auth/register`, body)
        .then((res) => {
          setAction("VALIDATE");
          setCurrentEmail(values.email);
          setLoading(false);
        })
        .catch((error) => {
          notification.error({
            message: "Email đã đăng ký tài khoản!",
            description: "",
            placement: "top",
          });
          setLoading(false);
        });
    } else if (action === "VALIDATE") {
      const otp = values?.otp.join("");
      axios
        .post(`${BASE_URL}/api/auth/verify-email`, {
          email: currentEmail,
          verificationCode: parseInt(otp),
        })
        .then((res) => {
          console.log("resss", res);
          if (res.data.success) setAction("SUCCESS");
          else
            notification.error({
              message: "OTP không hợp lệ!",
              description: "",
              placement: "top",
            });
          setLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          notification.error({
            message: "OTP không hợp lệ!",
            description: "",
            placement: "top",
          });
          setLoading(false);
        });
    }
  };

  const handleResend = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/api/auth/forget-password`, {
        email: currentEmail,
      })
      .then((res) => {
        console.log("resss", res);
        if (res.data.success) {
          notification.success({
            message: "OTP đã được gửi lại!",
            description: "",
            placement: "top",
          });
          setInitialTime(Date.now() + 1000 * 60 * 5);
        } else
          notification.error({
            message: "Có lỗi xảy ra!",
            description: "",
            placement: "top",
          });
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        notification.error({
          message: "Có lỗi xảy ra!",
          description: "",
          placement: "top",
        });
        setLoading(false);
      });
  };

  return (
    <div className="wp-login-page">
      <Row gutter={[20, 0]} className="wp-row-login">
        <Col xs={24} sm={24} md={16} xl={16} className="wp-cover-login">
          <div className="cover-left">
            <div className="backgr-blur-or"></div>
            <div className="backgr-blur-gr"></div>
            <div className="title">
              Register&nbsp;for
              <br /> HL&nbsp;elearning
            </div>
            <div className="register">
              Already have an account?
              <br />
              <Link href={"/login"}> Login now!</Link>
            </div>
          </div>
          <Image src={coverLogin} className="cover-login"></Image>
        </Col>
        <Col xs={24} sm={24} md={8} xl={8} className="wp-login-form">
          <div className="wp-form">
            {action === "VALIDATE" && (
              <div className="descript">
                Vui lòng nhập OTP được gửi đến
                <strong> {currentEmail}</strong> để xác thực tài khoản của bạn.
              </div>
            )}

            {/* register form */}
            {action === "REGISTER" && (
              <Form
                form={loginForm}
                onFinish={onFinish}
                //   onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="login-form"
              >
                <FormItem
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ và tên!",
                    },
                  ]}
                  className="email-input"
                >
                  <Input placeholder="Họ và Tên" />
                </FormItem>
                <FormItem
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Vui lòng nhập email!",
                    },
                  ]}
                  className="email-input"
                >
                  <Input placeholder="Email" />
                </FormItem>

                <FormItem
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                  ]}
                  className="pass-input"
                >
                  <Input.Password placeholder="Mật khẩu" />
                </FormItem>
                <FormItem
                  name="comfirmpassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Mật khẩu nhập lại không khớp!")
                        );
                      },
                    }),
                  ]}
                  className="pass-input-cf"
                >
                  <Input.Password placeholder="Nhập lại mật khẩu" />
                </FormItem>

                <FormItem className="submit-button">
                  <Button htmlType="submit">
                    {loading ? <LoadingOutlined /> : "ĐĂNG KÝ"}
                  </Button>
                </FormItem>
              </Form>
            )}
            {action === "VALIDATE" && (
              <Form
                form={validateForm}
                onFinish={onFinish}
                //   onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="login-form"
              >
                <FormItem
                  name="otp"
                  rules={[
                    // {
                    //   required: true,
                    //   message: "Please input your OTP!",
                    // },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          !value ||
                          value.every((item) => item === "") ||
                          value === undefined
                        ) {
                          return Promise.reject(new Error("Please enter OTP!"));
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                  className="email-input otp-input"
                >
                  <InputOTP inputType="numeric" placeholder="_" />
                </FormItem>

                <Countdown
                  value={initialTime}
                  format="mm:ss"
                  className="count-down"
                />
                <div className="re-send" onClick={handleResend}>
                  Resend
                </div>
                <FormItem className="submit-button">
                  <Button
                    htmlType="submit"
                    onClick={() => {
                      console.log(validateForm.getFieldValue("otp"));
                    }}
                  >
                    {loading ? <LoadingOutlined /> : "XÁC NHẬN"}
                  </Button>
                </FormItem>
              </Form>
            )}

            {/* SUCCESS form */}
            {action === "SUCCESS" && (
              <Form
                //   onFinish={onFinish}
                //   onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="login-form"
              >
                <div className="noti-success">
                  <Image
                    src={imageSuccess}
                    alt="success"
                    className="image-success"
                  ></Image>
                  <div className="title-succes">
                    Chúc mừng bạn đã đăng ký tài khoản thành công!
                  </div>
                </div>
                <FormItem className="submit-button">
                  <Link href={"/login"}>
                    <Button>ĐĂNG NHẬP NGAY</Button>
                  </Link>
                </FormItem>
              </Form>
            )}

            {/* <div className="sign-up">
              Bạn chưa có tài khoản?
              <Link href="/sign-up"> Đăng ký ngay!</Link>
            </div> */}
            {/* <div className="return-login">Quay lại trang đăng nhập</div> */}
          </div>
        </Col>
      </Row>
    </div>
  );
}
