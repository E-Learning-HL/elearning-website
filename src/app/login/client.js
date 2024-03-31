"use client";
import Image from "next/image";
import { Col, Row, Form, Input, Button, Statistic } from "antd";
import coverLogin from "@/public/image/login-image.png";
import logoElearning from "@/public/image/elearning-logo.png";
import Link from "next/link";
import "@/src/style/login.css";
import { useState } from "react";
import { InputOTP } from "antd-input-otp";

const FormItem = Form.Item;
const { Countdown } = Statistic;

export default function LoginPage() {
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
            <div className="title">
              Login to HL elearning
            </div>
            <div className="register">
              Don't have an account?
              <br />
              <Link href={'/register'}> Register now!</Link>
            </div>
          </div>
          <Image src={coverLogin} className="cover-login"></Image>
        </Col>
        <Col xs={24} sm={24} md={8} xl={8} className="wp-login-form">
          <div className="wp-form">
            <Link href={"/"}>
              <Image src={logoElearning} className="cover-login"></Image>
            </Link>
            {action === "LOGIN" && <div className="title">ĐĂNG NHẬP</div>}
            {!action === "LOGIN" && (
              <div className="title">ĐẶT LẠI MẬT KHẨU</div>
            )}
            {/* {action === "VALIDATE" && (
              <div className="title">XÁC THỰC tÀI KHOẢN</div>
            )}
            {action === "RESET" && (
              <div className="title">ĐẶT LẠI MẬT KHẨU</div>
            )} */}
            <div className="line"></div>
            {action === "FORGOT" && (
              <div className="descript">
                Vui lòng nhập số điện thoại của bạn, chúng tôi sẽ gửi cho bạn mã
                OTP để đặt lại mật khẩu.
              </div>
            )}
            {action === "LOGIN" && (
              <div className="descript">
                Vui lòng nhập mã OTP được gửi đến số điện thoại{" "}
                <strong>123123123</strong> để đặt lại mật khẩu
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
                    type: "email",
                    message: "Please input your email!",
                  },
                ]}
                className="email-input"
              >
                <Input placeholder="Email" />
              </FormItem>

              <FormItem
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                className="pass-input"
              >
                <Input.Password placeholder="Mật khẩu" />
              </FormItem>
              <div className="forgot-pass">Quên mật khẩu</div>

              <FormItem className="submit-button">
                <Button htmlType="submit">ĐĂNG NHẬP</Button>
              </FormItem>
            </Form> */}
            {/* forgot form */}
            {/* <Form
              form={forgotForm}
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
                    type: "email",
                    message: "Please input your email!",
                  },
                ]}
                className="email-input"
              >
                <Input placeholder="Email" />
              </FormItem>

              <FormItem className="submit-button">
                <Button htmlType="submit">TIẾP TỤC</Button>
              </FormItem>
            </Form> */}
            {/* validate form */}
            {/* <Form
              form={validateForm}
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
                    message: "Please input your OTP!",
                  },
                ]}
                className="email-input"
              >
                <InputOTP inputType="numeric" />
              </FormItem>

              <Countdown
                value={Date.now() + 1000 * 60 * 5}
                format="mm:ss"
                className="count-down"
              />
              <div className="re-send">Gửi lại mã xác thực</div>
              <FormItem className="submit-button">
                <Button htmlType="submit">TIẾP TỤC</Button>
              </FormItem>
            </Form> */}
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
            <div className="return-login">Quay lại trang đăng nhập</div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
