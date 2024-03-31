"use client";
import { Form, Select, Popover, Input } from "antd";
import React, { useEffect, useState } from "react";
import { AutoComplete, Button } from "antd";
import "@/src/style/home.css";
import "@/src/style/common.css";

import { getClinicByName } from "./service";
import _ from "lodash";
import { strVNForSearch, toSlug } from "@/src/util/util";

import * as NProgress from "nprogress";
import { useRouter } from "next/navigation";
import { removeUndefined } from "@/src/util/util";
import moment from "moment";
import Link from "next/link";
import logos from "@/public/image/logo-ready-share.png";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeftOutlined,
  CheckOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ImageCommon from "../image/image";
// import iconArrow from '@/public/icon/icon-arrow.svg'

const FormItem = Form.Item;
export default function FormSearch() {
  const { data } = useQuery({
    queryKey: ["api-common"],
  });
  const [url, setUrl] = useState("/tim-nha-khoa");
  const router = useRouter();
  const filterOption = (input, option) => {
    if (option.props.label) {
      return strVNForSearch(option.props.label).includes(strVNForSearch(input));
    } else {
      return false;
    }
  };
  const [form] = Form.useForm();
  const [optionsName, setOptionsName] = useState([]);
  const [optionsCategoryService, setOptionsCategoryService] = useState(
    data?.listService?.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    })
  );

  const [showDistrict, setShowDistrict] = useState(false);
  const [idProvince, setIdProvince] = useState(null);
  const [listDistrict, setListDistrict] = useState([]);
  const [listDistrictNoChange, setListDistrictNoChange] = useState([]);

  const [listProvince, setListProvince] = useState(data?.listProvince);

  const [openSelectAddress, setOpenSelectAddress] = useState(false);

  const debounceOnChangeInput = _.debounce((event) => {
    requestSearch(event);
  }, 300);
  const [inputValue, setInputValue] = useState("");

  const onFinish = async () => {
    // const fieldsValue = await form.validateFields();
    // console.log("fieldsValue", fieldsValue);
  };

  const onSearch = (searchText) => {
    debounceOnChangeInput(searchText);
  };
  // const [chooseLabel, setChooseLabel] = useState(null)
  const requestSearch = async (searchText) => {
    if (searchText) {
      const result = await getClinicByName(searchText);
      // console.log("result", result);
      const newOption = result.map((item) => {
        // console.log(item);
        return {
          value: item.id,
          label: (
            <Link href={`/phong-kham/${item.slug}`}>
              <div className="item-result-search">
                <ImageCommon data={item} style={"logo-on-search"} />
                {/* <Image src={logos} height={30} width={30}/> */}
                <span>{item.name}</span>
              </div>
            </Link>
          ),
          // label:item.name
        };
      });
      setOptionsName(newOption);
    }
  };
  const onSubmit = async () => {
    const fieldsValue = await form.validateFields();
    console.log("fieldsValue", fieldsValue);

    const routeSearch = [];
    if (fieldsValue.category_service) {
      const categoryServiceName = data.listService.find(
        (item) => item.id == fieldsValue.category_service
      );
      routeSearch.push(`/${toSlug(categoryServiceName?.name)}`);
      delete fieldsValue.category_service;
    }

    if (form.getFieldValue("provinceName")) {
      routeSearch.push(`/${toSlug(form.getFieldValue("provinceName"))}`);
    }

    if (form.getFieldValue("districtName")) {
      routeSearch.push(`/${toSlug(form.getFieldValue("districtName"))}`);
    }

    const parseValue = {
      ...fieldsValue,
      // province_id: form.getFieldValue("province_id"),
      district_id: undefined,
    };
    removeUndefined(parseValue);

    const param = new URLSearchParams(parseValue).toString();
    const urlQuery =
      routeSearch.length > 0 ? routeSearch.join("") : "tim-nha-khoa";
    NProgress.start();
    router.push(`${urlQuery}?${param}`);
  };

  const debounceOnChangeInputProvice = _.debounce((event) => {
    console.log("filterProvince");
    const filterProvince = data?.listProvince.filter((item) =>
      strVNForSearch(item.name).includes(strVNForSearch(event))
    );
    setListProvince(filterProvince);
  }, 300);
  const debounceOnChangeInputDistrict = _.debounce((event) => {
    const filterDistrict = listDistrictNoChange.filter((item) =>
      strVNForSearch(item.name).includes(strVNForSearch(event))
    );
    setListDistrict(filterDistrict);
  }, 300);

  const debounceSetShowDistrict = _.debounce(() => {
    setShowDistrict(false);
  }, 300);
  const handleResize = () => setWidth(window.innerWidth);
  const [width, setWidth] = useState(1024);

  useEffect(() => {
    handleResize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
  }, []);

  return (
    <Form form={form} onFinish={onFinish} className="wrapper-form-search">
      <div id="pin-search"></div>
      <FormItem name="category_service">
        <Select
          allowClear
          showSearch
          options={optionsCategoryService}
          getPopupContainer={() => document.getElementById("pin-search")}
          placeholder="Chọn dịch vụ"
          filterOption={filterOption}
          dropdownAlign={{
            points: ["tl", "bl"], // align dropdown bottom-left to top-left of input element
            offset: [0, -4], // align offset
            overflow: {
              adjustX: 0,
              adjustY: 0, // do not auto flip in y-axis
            },
          }}
        />
      </FormItem>

      <FormItem name="district_id">
        <Popover
          placement="bottom"
          overlayClassName="wp-popover-select"
          align={
            width < 600
              ? {
                  points: ["tc", "bc"],
                  offset: [0, -71],
                }
              : {}
          }
          title={
            <div className="wp-title-select">
              <div className="wp-left-select">
                {showDistrict ? (
                  <div
                    className="button-back"
                    onClick={() => {
                      setShowDistrict(false);
                    }}
                  >
                    <ArrowLeftOutlined />
                  </div>
                ) : null}
                <div className="title-select">
                  {!showDistrict ? "Tỉnh thành" : "Quận huyện"}
                </div>
              </div>
              <div
                className="button-check-done"
                onClick={() => {
                  setOpenSelectAddress(false);
                }}
              >
                <CheckOutlined />
              </div>
            </div>
          }
          motion={null}
          content={
            !showDistrict ? (
              <div className="wp-modal-select">
                <FormItem name="text_search_province">
                  <Input
                    placeholder="Tỉnh thành"
                    onChange={(event) => {
                      event.persist();
                      debounceOnChangeInputProvice(event.target.value);
                    }}
                    prefix={<SearchOutlined />}
                  />
                </FormItem>
                <div className="wp-list-select">
                  {listProvince?.map((item) => {
                    return (
                      <div
                        className="wp-item-choose"
                        onClick={() => {
                          setIdProvince(item.id);

                          form.setFieldsValue({
                            province_id: item.id,
                            provinceName: item.name,
                            district_id: null,
                            districtName: null,
                            text_search_districts: null,
                          });
                          setListDistrictNoChange(item?.district);
                          setListDistrict(item?.district);
                          setShowDistrict(true);
                        }}
                      >
                        {item.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="wp-modal-select">
                <FormItem name="text_search_districts">
                  <Input
                    placeholder="Quận huyện"
                    onChange={(event) => {
                      event.persist();
                      debounceOnChangeInputDistrict(event.target.value);
                    }}
                    prefix={<SearchOutlined />}
                  />
                </FormItem>
                <div className="wp-list-select">
                  {listDistrict.map((item) => {
                    return (
                      <div
                        className="wp-item-choose"
                        onClick={() => {
                          form.setFieldsValue({
                            district_id: item.id,
                            districtName: item.name,
                          });
                          setOpenSelectAddress(false);
                          // setShowDistrict(false);
                          debounceSetShowDistrict();
                        }}
                      >
                        {item.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          }
          onOpenChange={(newOpen) => {
            setOpenSelectAddress(newOpen);
          }}
          destroyTooltipOnHide={true}
          trigger="click"
          open={openSelectAddress}
        >
          <div className="button-choose">
            {form.getFieldValue("districtName")
              ? form.getFieldValue("districtName") + ", "
              : null}
            {form.getFieldValue("provinceName")}
            {!form.getFieldValue("districtName") &&
              !form.getFieldValue("provinceName") && (
                <div className="un-choose">Chọn khu vực</div>
              )}
          </div>
        </Popover>
      </FormItem>
      <FormItem name="name">
        <AutoComplete
          options={optionsName}
          placeholder="Nhập tên phòng khám"
          className="wrapper-input-search"
          onSearch={onSearch}
          value={inputValue}
          onChange={(data, option) => {
            // setInputValue(data);
            form.setFieldsValue({ name: data?.value });
          }}
          onSelect={(data, option) => {
            // setInputValue(option.label);
            form.setFieldsValue({
              name: option?.label?.props?.children?.props.children[1]?.props
                ?.children,
            });
          }}
          labelInValue={true}
          filterOption={false}
          onBlur={() => {
            setOptionsName([]);
          }}
          dropdownAlign={{
            points: ["tl", "bl"], // align dropdown bottom-left to top-left of input element
            offset: [0, -4], // align offset
            overflow: {
              adjustX: 0,
              adjustY: 0, // do not auto flip in y-axis
            },
          }}
          getPopupContainer={() => document.getElementById("pin-search")}
        />
      </FormItem>
      <FormItem>
        <Button
          className="button-submit-search button-blue"
          htmlType="submit"
          onClick={onSubmit}
        >
          TÌM KIẾM NGAY
        </Button>
      </FormItem>

      {/* {dataSearch?.map(item => <div>{item.name}</div>)} */}
    </Form>
  );
}
