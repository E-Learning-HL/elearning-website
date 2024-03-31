"use client";
import Image from "next/image";
import { Col, Row, Form, Input, Button } from "antd";
import coverLogin from "@/public/image/login_image.png";
import logoElearning from "@/public/image/elearning-logo.png";
import Link from "next/link";
import "@/src/style/login.css";

const FormItem = Form.Item;

export default function SignUpPage() {
  
  const [form] = Form.useForm();
  return (
    <div className="wp-login-page">
      <Row gutter={[20, 0]} className="wp-row-login">
        <Col xs={24} sm={24} md={13} xl={13} className="wp-cover-login">
          <Image src={coverLogin} className="cover-login"></Image>
        </Col>
        <Col xs={24} sm={24} md={11} xl={11} className="wp-login-form">
          <div className="wp-form">
            <Link href={"/"}>
              <Image src={logoElearning} className="cover-login"></Image>
            </Link>
            <div className="title">ĐĂNG NHẬP</div>
            <div className="line"></div>
            <Form
              form={form}
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

              {/* <FormItem
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </FormItem> */}

              <FormItem className="submit-button">
                <Button htmlType="submit">ĐĂNG NHẬP</Button>
              </FormItem>
            </Form>
            <div className="sign-up">
              {" "}
              Bạn chưa có tài khoản?
              <Link href="/sign-up"> Đăng ký ngay!</Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
