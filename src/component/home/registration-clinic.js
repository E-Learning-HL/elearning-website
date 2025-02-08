"use client";
import "@/src/style/registration-clinic.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Form, Select, Input, Row, Col, Button, message } from "antd";
import clinicImage from "@/public/image/nhakhoahub.jpg";
import TextArea from "antd/es/input/TextArea";
import {
  createRegistrationClinic,
  getListDistrict,
  getListProvince,
} from "./service";
import { strVNForSearch } from "@/src/util/util";

const FormItem = Form.Item;
const RegistrationClinic = ({ isStaticPage }) => {
  const [form] = Form.useForm();
  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);

  // const displayCaptcha = () => {
  //   if (!document.getElementById("reCaptcha_script")) {
  //     const script = document.createElement("script");
  //     script.id = "reCaptcha_script";
  //     script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_KEY}`;
  //     script.async = true;
  //     document.body.appendChild(script);
  //   }
  // };

  const onFinish = async () => {
    grecaptcha.ready(function () {
      grecaptcha
        .execute(`${process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_KEY}`, {
          action: "contact",
        })
        .then(async function (token) {
          const fieldsValue = await form.validateFields();
          const result = await createRegistrationClinic({ ...fieldsValue });
          console.log(result.status);
          if (result.status === 201) {
            form.resetFields();
            message.success("Đăng ký thành công");
          }
        });
    });
  };

  return (
    <div
      className="wpRgClinic"
      // style={{
      //   background: isStaticPage
      //     ? "none"
      //     : "linear-gradient(to top, #dbeffa 50%, #fff 50%)",
      // }}
    >
      {/* <div className="wpRegistrationClinic" onClick={displayCaptcha}> */}
      <div className="wpRegistrationClinic">
        <div className="title">
          <h2>Đăng Ký Nhận Tư Vấn Lộ Trình</h2>
          <p>Bạn hãy để lại thông tin, S eLearning sẽ liên hệ tư vấn cho mình sớm nha!</p>
          {/* <div className="line"></div> */}
        </div>
        <div className="registration-clinic-container">
          <div className="wpForm">
            <Form
              form={form}
              onFinish={onFinish}
              className="wrapper-form-registration-clinic"
            >
              <Row gutter={[30,0]}>
                <Col xs={24} xl={12} sm={24} md={12}>
                  <FormItem
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập Họ tên",
                      },
                    ]}
                  >
                    <Input
                      className="input-registration-clinic"
                      placeholder="Họ và tên"
                    ></Input>
                  </FormItem>
                  <FormItem
                    name="phone_number"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập Số điện thoại",
                      },
                    ]}
                  >
                    <Input
                      className="input-registration-clinic"
                      placeholder="Số điện thoại"
                    ></Input>
                  </FormItem>
                  <FormItem
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập Email",
                      },
                    ]}
                  >
                    <Input
                      className="input-registration-clinic"
                      placeholder="Email"
                    ></Input>
                  </FormItem>
                </Col>
                <Col xs={24} xl={12} sm={24} md={12}>
                  <FormItem
                    name="note"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập thông tin này",
                      },
                    ]}
                  >
                    <TextArea
                      rows={4}
                      className="textarea-registration-clinic"
                      placeholder="Hãy cho S eLearning biết Trình độ hiện tại của bạn và Mục tiêu của bạn để S elearning có thể tư vấn cho bạn chi tiết nha!"
                    ></TextArea>
                  </FormItem>
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    className="submit-registration-clinic button-blue"
                  >
                    ĐĂNG KÝ NGAY
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationClinic;
