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
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/src/const/const";

const FormItem = Form.Item;
const { Countdown } = Statistic;

export default function LoginPage() {
  const [action, setAction] = useState("LOGIN");
  const [loginForm] = Form.useForm();
  const [forgotForm] = Form.useForm();
  const [validateForm] = Form.useForm();
  const [resetForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [currentEmail, setCurrentEmail] = useState(null);
  const [initialTime, setInitialTime] = useState();

  useEffect(() => {
    if (action === "VALIDATE") setInitialTime(Date.now() + 1000 * 60 * 5);
  }, [action]);

  const onFinish = async (values) => {
    if (action === "LOGIN") {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false, // Đảm bảo không chuyển hướng trang tự động
        password: values.password,
        username: values.username,
      });
      if (result.error) {
        // Xử lý lỗi nếu xảy ra
        setLoading(false);
        notification.error({
          message: result.error,
          description: "",
          placement: "top",
        });
        console.error("Authentication failed:", result.error);
      } else {
        // Đăng nhập thành công, chuyển hướng đến trang chính
        notification.success({
          message: `Đăng nhập thành công!`,
          description: "",
          placement: "top",
        });
        router.push("/");
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    }
  };

  const handleContinue = async (values) => {
    setLoading(true);
    setCurrentEmail(values.username);
    try {
    } catch (error) {}
    axios
      .post(`${BASE_URL}/api/auth/forget-password`, {
        email: values.username,
      })
      .then((res) => {
        console.log("resss", res);
        if (res.data.success) setAction("VALIDATE");
        else
          notification.error({
            message: "Địa chỉ email không hợp lệ!",
            description: "",
            placement: "top",
          });
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        notification.error({
          message: "Địa chỉ email không hợp lệ!",
          description: "",
          placement: "top",
        });
        setLoading(false);
      });
  };

  const handleContinueValidate = async () => {
    setLoading(true);
    const fieldValue = await validateForm.validateFields();
    console.log("fieldValue", fieldValue);
    const otp = fieldValue?.otp.join("");
    axios
      .post(`${BASE_URL}/api/auth/verify-email`, {
        email: currentEmail,
        verificationCode: parseInt(otp),
      })
      .then((res) => {
        console.log("resss", res);
        if (res.data.success) setAction("RESET");
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
  };

  const handleReset = (values) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/api/auth/reset-password`, {
        email: currentEmail,
        newPassword: values.password,
      })
      .then((res) => {
        console.log("resss", res);
        if (res.data.status == 200){
          notification.success({
            message: "Cập nhật mật khẩu thành công.",
            description: "",
            placement: "top",
          });
          setAction("LOGIN")
        setLoading(false);
        }
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
  }

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
              Login&nbsp;to
              <br /> HL&nbsp;elearning
            </div>
            <div className="register">
              Don't have an account?
              <br />
              <Link href={"/register"}> Register now!</Link>
            </div>
          </div>
          <Image src={coverLogin} className="cover-login"></Image>
        </Col>
        <Col xs={24} sm={24} md={8} xl={8} className="wp-login-form">
          <div className="wp-form">
            {action === "FORGOT" && (
              <div className="descript">
                Xin vui lòng cung cấp địa chỉ email của bạn, chúng tôi sẽ gửi mã
                OTP để bạn có thể đặt lại mật khẩu.
              </div>
            )}
            {action === "VALIDATE" && (
              <div className="descript">
                Vui lòng nhập OTP được gửi đến
                <strong> {currentEmail}</strong> để đặt lại mật khẩu.
              </div>
            )}

            {/* login form */}
            {action === "LOGIN" && (
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
                <div
                  className="forgot-pass"
                  onClick={() => {
                    setAction("FORGOT");
                  }}
                >
                  Forgot password?
                </div>

                <FormItem className="submit-button">
                  <Button htmlType="submit">
                    {loading ? <LoadingOutlined /> : "ĐĂNG NHẬP"}
                  </Button>
                </FormItem>
                <div className="other-way">
                  <div className="wp-text">
                    <div className="line"></div>
                    <div className="text">Or continue with</div>
                    <div className="line"></div>
                  </div>
                  <div className="wp-ways">
                    <div className="wp-icon">
                      <Image src={iconGoogle} className="icon"></Image>
                    </div>
                    <div className="wp-icon">
                      <Image src={iconFacebook} className="icon"></Image>
                    </div>
                  </div>
                </div>
              </Form>
            )}

            {/* forgot form */}
            {action === "FORGOT" && (
              <Form
                form={forgotForm}
                onFinish={handleContinue}
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
                  <Button htmlType="submit">
                    {loading ? <LoadingOutlined /> : "TIẾP TỤC"}
                  </Button>
                </FormItem>
              </Form>
            )}
            {/* validate form */}
            {action === "VALIDATE" && (
              <Form
                form={validateForm}
                // onFinish={handleContinueValidate}
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
                <div className="re-send" onClick={handleResend}>Resend</div>
                <FormItem className="submit-button">
                  <Button onClick={handleContinueValidate}>
                    {loading ? <LoadingOutlined /> : "TIẾP TỤC"}
                  </Button>
                </FormItem>
              </Form>
            )}

            {/* reset form */}
            {action === "RESET" && (
              <Form
                form={resetForm}
                  onFinish={handleReset}
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
                          new Error("Password confirmation does not match!")
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
                    {loading ? <LoadingOutlined /> : "XÁC NHẬN"}
                  </Button>
                </FormItem>
              </Form>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
