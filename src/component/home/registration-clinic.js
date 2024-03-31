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

  const displayCaptcha = () => {
    if (!document.getElementById("reCaptcha_script")) {
      const script = document.createElement("script");
      script.id = "reCaptcha_script";
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_KEY}`;
      script.async = true;
      document.body.appendChild(script);
    }
  };

  useEffect(() => {
    return () => {
      const scriptToRemove = document.getElementById("reCaptcha_script");
      if (scriptToRemove) {
        document.body.removeChild(scriptToRemove);
      }
    };
  }, []);

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
  const filterOption = (input, option) => {
    if (option.props.value) {
      return strVNForSearch(option.props.children).includes(
        strVNForSearch(input)
      );
    } else {
      return false;
    }
  };
  useEffect(() => {
    async function fetchData() {
      const results = await Promise.all([getListProvince()]);
      setProvince(results[0]);
    }
    fetchData();
  }, []);
  return (
    <div
      className="wpRgClinic"
      style={{
        background: isStaticPage
          ? "none"
          : "linear-gradient(to top, #dbeffa 50%, #fff 50%)",
      }}
    >
      <div className="wpRegistrationClinic" onClick={displayCaptcha}>
        <div className="title">
          <h2>Đăng Ký Nhận Tư Vấn Miễn Phí</h2>
          <div className="line"></div>
        </div>
        <div className="registration-clinic-container">
          <div className="wpClinicImage">
            <Image
              src={clinicImage}
              className="clinicImage"
              alt="image"
            ></Image>
          </div>
          <div className="wpForm">
            <Form
              form={form}
              onFinish={onFinish}
              className="wrapper-form-registration-clinic"
            >
              <Row>
                <Col xs={24}>
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
                </Col>
                <Col xs={24}>
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
                </Col>
                <Col xs={24}>
                  <FormItem name="email">
                    <Input
                      className="input-registration-clinic"
                      placeholder="Email"
                    ></Input>
                  </FormItem>
                </Col>
                <Col xs={12}>
                  <FormItem
                    name="province_id"
                    style={{ marginRight: 8 }}
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa chọn Tỉnh/Thành",
                      },
                    ]}
                  >
                    <Select
                      className="select-registration-clinic"
                      style={{ width: "100%" }}
                      showSearch
                      filterOption={filterOption}
                      placeholder="Chọn tỉnh thành"
                      onChange={async (value) => {
                        const districts = await getListDistrict(value);
                        setDistricts(districts);
                      }}
                    >
                      {province &&
                        province.map((province) => {
                          return (
                            <Option key={province.id} value={province.id}>
                              {province.name}
                            </Option>
                          );
                        })}
                    </Select>
                  </FormItem>
                </Col>
                <Col xs={12}>
                  <FormItem
                    name="district_id"
                    style={{ marginLeft: 8 }}
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa chọn Quận/Huyện",
                      },
                    ]}
                  >
                    <Select
                      className="select-registration-clinic"
                      style={{
                        width: "100%",
                      }}
                      showSearch
                      filterOption={filterOption}
                      placeholder="Chọn quận huyện"
                    >
                      {districts &&
                        districts.map((district) => {
                          return (
                            <Option key={district.id} value={district.id}>
                              {district.name}
                            </Option>
                          );
                        })}
                    </Select>
                  </FormItem>
                </Col>
                <Col xs={24}>
                  <FormItem
                    name="clinic_name"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập Tên phòng khám",
                      },
                    ]}
                  >
                    <Input
                      className="input-registration-clinic"
                      placeholder="Tên phòng khám"
                    ></Input>
                  </FormItem>
                </Col>
                <Col xs={24}>
                  <FormItem name="note">
                    <TextArea
                      className="textarea-registration-clinic"
                      placeholder="Lời nhắn của bạn..."
                    ></TextArea>
                  </FormItem>
                </Col>
              </Row>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="submit-registration-clinic button-blue"
              >
                ĐĂNG KÝ NGAY
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationClinic;
