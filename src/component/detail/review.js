import {
  Form,
  Input,
  Select,
  Modal,
  Col,
  Row,
  Rate,
  Upload,
  Checkbox,
  message,
  notification,
  Pagination,
  Image as AntImage,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";
import iconRating from "@/public/icon/icon-rating.svg";
import iconImage from "@/public/icon/icon-image.svg";
import iconEdit from "@/public/icon/icon-edit.svg";
import "@/src/style/write-review.css";
import axios from "axios";
import { BASE_URL } from "@/src/const/const";
import { getReview } from "@/src/component/detail/get-review.js";
import ItemReview from "@/src/component/detail/item-review";
import Link from "next/link";
import { scroller } from "react-scroll";

const FormItem = Form.Item;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function Review({ detailClinic }) {
  const [dataReview, setDataReview] = useState(detailClinic?.ratings);
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return false;
    }
    return isJpgOrPng && isLt2M;
  };
  const [formWriteReview] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [submitEnable, setSubmitEnable] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const { TextArea } = Input;
  const { data } = useQuery({
    queryKey: ["api-common"],
  });
  const optionSelectedService = detailClinic?.category_service_clinic
    ?.map((item) => {
      if (item?.category_service) {
        return {
          value: item?.id,
          label: item?.category_service?.name,
        };
      }
    })
    .filter((item) => item != null && item !== undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isModalOpen]);
  const showModal = () => setIsModalOpen(true);
  const onSubmit = async () => {
    grecaptcha.ready(function () {
      grecaptcha
        .execute(`${process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_KEY}`, {
          action: "submit",
        })
        .then(async function (token) {
          if (submitEnable) {
            const formValue = await formWriteReview.validateFields();
            setLoading(true);
            const cleanNotImage = formValue?.image?.filter(
              (item) => item.type === "image/jpeg" || item.type === "image/png"
            );
            let image = [];
            if (formValue?.image) {
              image = await Promise.all(
                cleanNotImage.map(async (item) => {
                  if (item?.originFileObj) {
                    item.dataBase64 = await getBase64(item?.originFileObj);
                  }
                  return {
                    link: item,
                    image_type: "RATING",
                  };
                })
              );
            }
            const rating_general = {
              infrastructure: formValue.infrastructure,
              service_quality: formValue.service_quality,
              technology: formValue.technology,
              procedure: formValue.procedure,
              attitude: formValue.attitude,
              doctor: formValue.doctor,
              price: formValue.price,
              guarantee: formValue.guarantee,
              care: formValue.care,
              introduce: formValue.introduce,
            };
            const rating_category_service =
              formValue.rating_category_service.map((item) => {
                return { category_service_clinic_id: item };
              });
            const body = {
              number_rate: 1,
              content: formValue.content,
              confirm: true,
              clinic_id: detailClinic.id,
              user_id: null,
              user_name: formValue.user_name,
              rating_general: rating_general,
              rating_category_service: rating_category_service,
              image: image,
            };
            axios
              .post(`${BASE_URL}/admin/rating`, body)
              .then(async (response) => {
                console.log("POST request successful!", response.data);
                formWriteReview.resetFields();
                setIsModalOpen(false);
                onChangePage(1);
                setSubmitEnable(false);
                notification.success({
                  message: `Đánh giá thành công!`,
                  description: "",
                  placement: "top",
                });
              })
              .catch((error) => {
                console.error("Error making POST request:", error);
              })
              .finally(() => {
                setLoading(false);
              });
          }
        });
    });
  };
  const scrollTo = () => {
    scroller.scrollTo("danh-gia", {
      duration: 1000,
      delay: 100,
      smooth: true,
      // containerId: "ContainerElementID",
      offset: 0, // Scrolls to element + 50 pixels down the page
      // ... other options
    });
    // let sectionLeftHeight = document.getElementById("sectionLeft").offsetHeight;
    // let reviewHeight = document.getElementById("review").offsetHeight;
    // window.scrollTo({
    //   top: `${sectionLeftHeight - reviewHeight + 500}`,
    //   left: 0,
    //   behavior: "smooth",
    // });
  };
  async function onChangePage(page) {
    const dataPage = await getReview(detailClinic.id, page);
    setCurrentPage(page);
    setDataReview(dataPage.data.ratings);
    scrollTo();
  }
  async function reTrieveData() {
    const dataRetrieve = await getReview(detailClinic.id, currentPage);
    setDataReview(dataRetrieve.data.ratings);
  }
  return (
    <div>
      <div className="wp-review">
        <div className="wpReviewHeader">
          <p>Các đánh giá về phòng khám</p>
          <div className="writeButton button-white" onClick={showModal}>
            <Image src={iconEdit}></Image>
            <p>VIẾT ĐÁNH GIÁ</p>
          </div>
        </div>
        <div className="wpListReview">
          {dataReview?.map((item, index) => {
            return (
              <ItemReview
                item={item}
                reTrieveData={reTrieveData}
                index={index}
                dataReview={dataReview}
                setDataReview={setDataReview}
              />
            );
          })}
        </div>
        {detailClinic?.total == 0 && (
          <div className="noContent">Chưa có đánh giá</div>
        )}
        {detailClinic?.total > 10 && (
          <div className="pagination">
            <Pagination
              current={currentPage}
              total={detailClinic?.total}
              onChange={(e) => onChangePage(e)}
            />
          </div>
        )}
      </div>

      <Modal
        open={isModalOpen}
        width={1000}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        onOk={() => setIsModalOpen(false)}
        footer={null}
        className="wpWriteReview"
        style={{ top: 0 }}
        destroyOnClose
      >
        <div className="modalTitle">VIẾT ĐÁNH GIÁ</div>
        <div className="line"></div>
        <div className="wpFormReview" onClick={displayCaptcha}>
          <Form form={formWriteReview}>
            <div className="nameInput">
              <FormItem
                name="user_name"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Input placeholder="Họ và tên"></Input>
              </FormItem>
            </div>
            {optionSelectedService.length > 0 && (
              <div className="selectedServiceInput">
                <FormItem
                  name="rating_category_service"
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                    () => ({
                      validator(_, value) {
                        if (value.length > 2) {
                          return Promise.reject(new Error(""));
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Select
                    mode="multiple"
                    showSearch={false}
                    placeholder="Chọn dịch vụ bạn đã sử dụng"
                    options={optionSelectedService}
                    // filterOption={filterOption}
                    className="selectedService"
                    bordered={false}
                    getPopupContainer={(triggerNode) =>
                      triggerNode.parentElement
                    }
                    dropdownAlign={{
                      points: ["tl", "bl"], // align dropdown bottom-left to top-left of input element
                      offset: [0, 2], // align offset
                      overflow: {
                        adjustX: 0,
                        adjustY: 0, // do not auto flip in y-axis
                      },
                    }}
                  />
                </FormItem>
              </div>
            )}
            <div className="wpCommonRate">
              <div className="title">ĐÁNH GIÁ CHUNG</div>
              <Row gutter={[24, { xs: 21, sm: 21, md: 24, xl: 24 }]}>
                <Col xs={24} sm={24} md={12} xl={12}>
                  {" "}
                  <div className="wpCriteriaRate">
                    <p className="criteriaTitle">Cơ sở vật chất</p>
                    <div className="wpRatingBar">
                      <Image src={iconRating}></Image>
                      <FormItem name="infrastructure">
                        <Rate
                          count={10}
                          character={
                            <div
                              style={{ width: "20px", height: "20px" }}
                            ></div>
                          }
                        />
                      </FormItem>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                  {" "}
                  <div className="wpCriteriaRate">
                    <p className="criteriaTitle">Chất lượng dịch vụ</p>
                    <div className="wpRatingBar">
                      <Image src={iconRating}></Image>
                      <FormItem name="service_quality">
                        <Rate
                          count={10}
                          character={
                            <div
                              style={{ width: "20px", height: "20px" }}
                            ></div>
                          }
                        />
                      </FormItem>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                  {" "}
                  <div className="wpCriteriaRate">
                    <p className="criteriaTitle">Công nghệ điều trị</p>
                    <div className="wpRatingBar">
                      <Image src={iconRating}></Image>
                      <FormItem name="technology">
                        <Rate
                          count={10}
                          character={
                            <div
                              style={{ width: "20px", height: "20px" }}
                            ></div>
                          }
                        />
                      </FormItem>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                  <div className="wpCriteriaRate">
                    <p className="criteriaTitle">Quy trình làm việc</p>
                    <div className="wpRatingBar">
                      <Image src={iconRating}></Image>
                      <FormItem name="procedure">
                        <Rate
                          count={10}
                          character={
                            <div
                              style={{ width: "20px", height: "20px" }}
                            ></div>
                          }
                        />
                      </FormItem>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                  {" "}
                  <div className="wpCriteriaRate">
                    <p className="criteriaTitle">Thái độ phục vụ</p>
                    <div className="wpRatingBar">
                      <Image src={iconRating}></Image>
                      <FormItem name="attitude">
                        <Rate
                          count={10}
                          character={
                            <div
                              style={{ width: "20px", height: "20px" }}
                            ></div>
                          }
                        />
                      </FormItem>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                  {" "}
                  <div className="wpCriteriaRate">
                    <p className="criteriaTitle">Chăm sóc sau điều trị</p>
                    <div className="wpRatingBar">
                      <Image src={iconRating}></Image>
                      <FormItem name="care">
                        <Rate
                          count={10}
                          character={
                            <div
                              style={{ width: "20px", height: "20px" }}
                            ></div>
                          }
                        />
                      </FormItem>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                  {" "}
                  <div className="wpCriteriaRate">
                    <p className="criteriaTitle">Đội ngũ bác sỹ</p>
                    <div className="wpRatingBar">
                      <Image src={iconRating}></Image>
                      <FormItem name="doctor">
                        <Rate
                          count={10}
                          character={
                            <div
                              style={{ width: "20px", height: "20px" }}
                            ></div>
                          }
                        />
                      </FormItem>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                  {" "}
                  <div className="wpCriteriaRate">
                    <p className="criteriaTitle">Giá cả hợp lý</p>
                    <div className="wpRatingBar">
                      <Image src={iconRating}></Image>
                      <FormItem name="price">
                        <Rate
                          count={10}
                          character={
                            <div
                              style={{ width: "20px", height: "20px" }}
                            ></div>
                          }
                        />
                      </FormItem>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                  {" "}
                  <div className="wpCriteriaRate">
                    <p className="criteriaTitle">Chế độ bảo hành</p>
                    <div className="wpRatingBar">
                      <Image src={iconRating}></Image>
                      <FormItem name="guarantee">
                        <Rate
                          count={10}
                          character={
                            <div
                              style={{ width: "20px", height: "20px" }}
                            ></div>
                          }
                        />
                      </FormItem>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                  {" "}
                  <div className="wpCriteriaRate">
                    <p className="criteriaTitle">Sẵn sàng giới thiệu</p>
                    <div className="wpRatingBar">
                      <Image src={iconRating}></Image>
                      <FormItem name="introduce">
                        <Rate
                          count={10}
                          character={
                            <div
                              style={{ width: "20px", height: "20px" }}
                            ></div>
                          }
                        />
                      </FormItem>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="wpInputReview">
              <p className="title">NHẬN XÉT</p>
              <FormItem
                name="content"
                className="input-review"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
                whitespace
              >
                <TextArea
                  placeholder="Nhận xét của bạn..."
                  autoSize={{ minRows: 5, maxRows: 6 }}
                  minLength={100}
                  maxLength={1000}
                  showCount={{ formatter: (info) => info.count }}
                />
              </FormItem>
              <p className="note">*Nhận xét phải chứa tối thiểu 100 kí tự</p>
            </div>
            <div className="wpImageUpload">
              <FormItem
                name="image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  listType="picture-card"
                  // fileList={fileList}
                  onPreview={handlePreview}
                  // beforeUpload={beforeUpload}
                  maxCount={5}
                  customRequest={({ onSuccess, file, onError }) => {
                    const isJpgOrPng =
                      file.type === "image/jpeg" || file.type === "image/png";
                    if (!isJpgOrPng) {
                      message.error("You can only upload JPG/PNG file!");
                      onError();
                    }
                    const isLt2M = file.size / 1024 / 1024 < 2;
                    if (!isLt2M) {
                      message.error("Image must smaller than 2MB!");
                      onError();
                    }
                    if (isLt2M && isJpgOrPng) {
                      onSuccess();
                    }
                  }}
                >
                  <div className="upLoadButton">
                    <Image src={iconImage}></Image>
                    <p>Chọn ảnh đăng kèm</p>
                  </div>
                </Upload>
              </FormItem>

              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: "100%",
                  }}
                  src={previewImage}
                />
              </Modal>
            </div>
            <div className="wpCommit">
              <Checkbox onChange={(val) => setSubmitEnable(val.target.checked)}>
                <p>
                  Tôi xác nhận đánh giá trung thực và đồng ý với
                  <Link href=""> quy định về đánh giá </Link>
                  của Nhakhoahub
                </p>
              </Checkbox>
            </div>
            <div
              className="submitButton button-blue"
              onClick={onSubmit}
              style={{
                backgroundColor: submitEnable ? "#00C5D7" : "#e7e8e8",
                color: submitEnable ? "#FFF" : "#a6a8aa",
                cursor: submitEnable ? "pointer" : "default",
              }}
            >
              {loading ? <LoadingOutlined /> : "Đăng bài đánh giá"}
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
