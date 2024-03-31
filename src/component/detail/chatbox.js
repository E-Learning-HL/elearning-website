"use client";
import "./chatbox.scss";
import iconStatus from "@/public/icon/icon-status.png";
import iconClinicGift from "@/public/icon/icon-clinic-gift.png";
import iconChatBox from "@/public/icon/icon-chatbox.png";
import Image from "next/image";
import {
  createContact,
  amountContact,
  getListService,
} from "../../app/service";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import FormItem from "antd/es/form/FormItem";
import { strVNForSearch } from "@/src/util/util";
import { IMAGE_TYPE, PREFIX_IMAGE_URL } from "@/src/const/const";
import defaultImage from "@/public/image/default-image-square.png";

export default function ChatBox({ detailClinic, isModal = false }) {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [appendChatBox, setAppendChatBox] = useState(false);
  const [appendChatBoxReply, setAppendChatBoxReply] = useState([]);
  const [appendChatBoxSuccess, setAppendChatBoxSuccess] = useState(false);
  const [appendChatBoxThreeDot, setAppendChatBoxThreeDot] = useState(false);
  const bottomRef = useRef(null);

  const avatarUrl = detailClinic?.image?.find(
    (item) => item.image_type === IMAGE_TYPE.avatar
  );
  const avatar = avatarUrl
    ? `${PREFIX_IMAGE_URL}${avatarUrl.key}`
    : defaultImage;
  const onFinish = async () => {
    setAppendChatBoxThreeDot(true);
    const fieldsValue = await form.validateFields();
    const result = await createContact({
      ...fieldsValue,
      clinic_id: detailClinic.id,
      province_id: data.provinceId,
      district_id: data.districtId,
    });
    if (result.status === 201) {
      setTimeOutChatBox("chatBoxSuccess");
    }
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

  const autoScroll = () => {
    let element;
    element = isModal
      ? document.querySelector(".ant-modal .wp-chatBoxBody")
      : document.querySelector(".wp-chatBoxBody");
    element.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
  };

  const setTimeOutChatBox = (chatBox) => {
    bottomRef?.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
    const timeOutThreeDotHide = setTimeout(
      () => setAppendChatBoxThreeDot(false),
      3000
    );
    const timeOut = setTimeout(
      () =>
        chatBox === "chatBoxSuccess"
          ? setAppendChatBoxSuccess(true)
          : setAppendChatBox(true),
      3000
    );
    const scroll = setTimeout(() => autoScroll(), 3100);
    return () => {
      clearTimeout(timeOutThreeDotHide);
      clearTimeout(timeOut);
      clearTimeout(scroll);
    };
  };
  const addChatBoxReply = () => {
    setAppendChatBoxReply(() => {
      return (
        <div className={"chatContainer"}>
          <div className={"rowChatReply"}>
            <div className={"chatContentReply"}>
              Kết nối trực tiếp với Nha Khoa Hub
            </div>
          </div>
        </div>
      );
    });
    setAppendChatBoxThreeDot(true);
    setTimeOutChatBox("chatBox");
    const scroll = setTimeout(() => autoScroll(), 400);
    return () => {
      clearTimeout(scroll);
    };
  };
  useEffect(() => {
    async function fetchData() {
      const result = await Promise.all([getListService(), amountContact()]);
      setData({
        listService: result[0].data,
        amountContact: result[1],
        provinceId: parseInt(
          detailClinic?.province_id
            ? detailClinic.province_id[0]
            : detailClinic?.address[0]?.province?.id
        ),
        districtId: parseInt(
          detailClinic?.district_id
            ? detailClinic.district_id[0]
            : detailClinic.address[0]?.district?.id
        ),
      });
    }
    fetchData();
  }, []);

  return (
    <div className="wp-chatBox">
      <div className={"wp-chatBoxHeader"}>
        <div className={"d-flex"}>
          <Image
            unoptimized
            src={avatar}
            width={48}
            height={48}
            className="chatBoxAvatar"
          />
          <div style={{ marginLeft: 12 }}>
            <div className={"clinicName"}>{detailClinic?.name}</div>
            <div className={"d-flex"}>
              <Image src={iconStatus} className={"clinicStatusIcon"} />
              <div className={"clinicStatusText"}>Online</div>
            </div>
          </div>
        </div>
      </div>
      <div className={"wp-chatBoxBody"}>
        <div className={"chatContainer"}>
          <Image
            unoptimized
            src={avatar}
            width={40}
            height={40}
            className="chatBoxAvatar"
          />
          <div className={"rowChat"}>
            <div className={"chatContent"} style={{ width: "fit-content" }}>
              Chào anh/chị
            </div>
            <div className={"chatContent"}>
              Rất vui lòng khi được hỗ trợ tư vấn về cơ sở nha khoa phù hợp cho
              anh/chị, anh/chị cần:
            </div>
            <div className={"chatContent"}>
              <Button
                className={"btnChatBox"}
                style={{ marginBottom: 8 }}
                onClick={addChatBoxReply}
              >
                Kết nối trực tiếp
              </Button>
              {/*<Button className={"btnChatBox"}>Nhận chương trình ưu đãi</Button>*/}
            </div>
          </div>
        </div>
        {appendChatBoxReply}
        {appendChatBox && (
          <div className={"chatContainer"}>
            <Image
              unoptimized
              src={avatar}
              width={40}
              height={40}
              className="chatBoxAvatar"
            />
            <div className={"rowChat"}>
              <div className={"chatContent"}>
                Chúng tôi có thể liên hệ tư vấn anh chị thế nào ạ
              </div>
              <div className={"chatContent"}>
                <Form form={form} onFinish={onFinish}>
                  <FormItem
                    name="customer_name"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập Họ tên",
                      },
                    ]}
                  >
                    <Input
                      value=""
                      className="chatBoxInput"
                      placeholder="Họ và tên"
                    />
                  </FormItem>
                  <FormItem
                    name="customer_phone_number"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập Số điện thoại",
                      },
                      {
                        pattern: /(03|05|07|08|09)+([0-9]{8})\b/,
                        message: "Số điện thoại không đúng định dạng",
                      },
                    ]}
                  >
                    <Input
                      className="chatBoxInput"
                      placeholder="Số điện thoại/Zalo"
                    />
                  </FormItem>
                  <FormItem
                    style={{ marginBottom: 8 }}
                    name="category_service_id"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa chọn Dịch vụ",
                      },
                    ]}
                  >
                    <Select
                      className="chatBoxSelect"
                      style={{ width: "100%" }}
                      showSearch
                      filterOption={filterOption}
                      placeholder="Dịch vụ cần tư vấn"
                    >
                      {data &&
                        data.listService &&
                        data.listService.map((service) => {
                          return (
                            <Option key={service.id} value={service.id}>
                              {service.name}
                            </Option>
                          );
                        })}
                    </Select>
                  </FormItem>
                  {appendChatBoxSuccess && (
                    <Button className={"btnChatBoxSubmit"} type="primary">
                      <Image src={iconChatBox} />
                    </Button>
                  )}
                  {!appendChatBoxSuccess && (
                    <Button
                      className={"btnChatBoxSubmit"}
                      type="primary"
                      htmlType="submit"
                    >
                      Gửi yêu cầu
                    </Button>
                  )}
                </Form>
              </div>
            </div>
          </div>
        )}
        {appendChatBoxSuccess && (
          <div className={"chatContainer"}>
            <Image
              unoptimized
              src={avatar}
              width={40}
              height={40}
              className="chatBoxAvatar"
            />
            <div className={"rowChat"}>
              <div className={"chatContent"}>
                <b>Thật tuyệt vời!</b>
                <div>
                  Anh chị vui lòng để ý điện thoại để được tư vấn tận tình nhé,
                  chúc anh chị một ngày tốt lành
                </div>
              </div>
            </div>
          </div>
        )}
        {appendChatBoxThreeDot && (
          <div className={"chatBoxThreeDot"}>
            <Image
              unoptimized
              src={avatar}
              width={40}
              height={40}
              className="chatBoxAvatar"
            />
            <div className={"stage"}>
              <div className={"dot-falling"}></div>
            </div>
          </div>
        )}
        <div ref={bottomRef}></div>
      </div>
      <div className={"wp-chatBoxFooter"}>
        <div className={"clinicRegister"}>
          <Image src={iconClinicGift} />
          <div className={"clinicRegisterText"}>
            Đăng ký ngay để nhận ưu đãi
          </div>
        </div>
        <div className={"clinicSupport"}>
          <div className={"clinicSupportText"}>
            <span>Đã có</span>
            <span className={"clinicSupportAmount"}>
              {detailClinic.total_contact}
            </span>
            <span>
              khách hàng yêu cầu hỗ trợ và tìm được cơ sở nha khoa ưng ý
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
