"use client";
import Image from "next/image";
import { Col, Row, Form, Input, Button, Statistic } from "antd";
import coverLogin from "@/public/image/login-image.png";
import logoElearning from "@/public/image/elearning-logo.png";
import Link from "next/link";
import "@/src/style/login.css";
import { useState } from "react";
import { InputOTP } from "antd-input-otp";
import iconGoogle from "@/public/icon/icon-google.png";
import iconFacebook from "@/public/icon/icon-facebook.png";

const FormItem = Form.Item;
const { Countdown } = Statistic;

export default function RegisterPage() {
  const [action, setAction] = useState("LOGIN");
  const [loginForm] = Form.useForm();
  const [forgotForm] = Form.useForm();
  const [validateForm] = Form.useForm();
  const [resetForm] = Form.useForm();

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
              <Link href={"/register"}> Login now!</Link>
            </div>
          </div>
          <Image src={coverLogin} className="cover-login"></Image>
        </Col>
        <Col xs={24} sm={24} md={8} xl={8} className="wp-login-form">
          <div className="wp-form">
            {action === "LOGIN" && (
              <div className="descript">
                Please enter the OTP code sent to{" "}
                <strong>hungit@gmail.com</strong> to validate your account.
              </div>
            )}

            {/* login form */}
            {/* <Form
              form={loginForm}
              //   onFinish={onFinish}
              //   onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="login-form"
            >
              <FormItem
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
                className="email-input"
              >
                <Input placeholder="Enter full name" />
              </FormItem>
              <FormItem
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input your email!",
                  },
                ]}
                className="email-input"
              >
                <Input placeholder="Enter email" />
              </FormItem>

              <FormItem
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                className="pass-input"
              >
                <Input.Password placeholder="Enter password" />
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
                        new Error("Password confirmation does not match!")
                      );
                    },
                  }),
                ]}
                className="pass-input-cf"
              >
                <Input.Password placeholder="Enter confirmation password" />
              </FormItem>

              <FormItem className="submit-button">
                <Button htmlType="submit">REGISTER</Button>
              </FormItem>
            </Form> */}
            <Form
              form={validateForm}
              //   onFinish={onFinish}
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
                      if (!value || value.every((item) => item === '') || value === undefined) {
                        return Promise.reject(
                          new Error("Please enter OTP!")
                        );
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
                value={Date.now() + 1000 * 60 * 5}
                format="mm:ss"
                className="count-down"
              />
              <div className="re-send">Resend</div>
              <FormItem className="submit-button">
                <Button htmlType="submit" onClick={() => {
                  console.log(validateForm.getFieldValue('otp'))
                }}>CONFIRM</Button>
              </FormItem>
            </Form>
            {/* reset form */}
            {/* <Form
              form={resetForm}
              //   onFinish={onFinish}
              //   onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="login-form"
            >
              <FormItem
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu mới!" },
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
                <Button htmlType="submit">XÁC NHẬN</Button>
              </FormItem>
            </Form> */}
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
