"use client";
import {
  Row,
  Col,
  Form,
  Input,
  Pagination,
  AutoComplete,
  Collapse,
  TimePicker,
  Checkbox,
  Select,
  Radio,
  Popover,
} from "antd";
import styles from "./page.module.scss";
import "@/src/style/common.css";
import "@/src/style/tim-nha-khoa.css";
import Link from "next/link";
import ImageCommon from "@/src/component/image/image";
import iconClose from "@/public/icon/icon-close.svg";

import Image from "next/image";

import { useEffect, useState, useRef, Suspense } from "react";
import * as NProgress from "nprogress";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import iconWallet from "@/public/icon/icon-wallet.svg";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { PRICE_FILTER, PRICE_FILTER_SERVICE } from "@/src/const/const";
import { CloseCircleFilled } from "@ant-design/icons";
import {
  removeUndefined,
  wrapperRouterPush,
  strVNForSearch,
  toSlug,
} from "@/src/util/util";
import _ from "lodash";
// import BlockTopFilter from "./block-top-filter";
import SearchResult from "./search-result";
import {
  ArrowLeftOutlined,
  CheckOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getClinicByName } from "@/src/component/home/service";
import "@/src/style/home.css";

const { Search } = Input;
const { Panel } = Collapse;
const FormItem = Form.Item;

function SearchResultClientChild({ searchParams, searchResult }) {
  const { data } = useQuery({
    queryKey: ["api-common"],
  });
  const router = useRouter();
  const [form] = Form.useForm();
  const pathname = usePathname();
  const searchParamUrl = useSearchParams();
  const [currentPrice, setCurrentPrice] = useState(PRICE_FILTER);
  const [selectedID, setSelectedID] = useState();

  const defaultActiveKey =
    typeof window !== "undefined" && window.innerWidth < 768 ? [] : ["1"];
  // const selectedID = useIdServiceStore((value) => value.idService);

  const [optionsName, setOptionsName] = useState([]);
  const [showDistrict, setShowDistrict] = useState(false);
  const [openSelectAddress, setOpenSelectAddress] = useState(false);
  const [listProvince, setListProvince] = useState(data?.listProvince);
  const [listDistrict, setListDistrict] = useState([]);
  const [listDistrictNoChange, setListDistrictNoChange] = useState([]);
  const [changeState, setChangeState] = useState(false);

  const [inputValue, setInputValue] = useState("");

  //parse tag
  let tagSearch = [];
  if (searchParams?.category_service_name) {
    tagSearch.push({
      name: searchParams?.category_service_name,
      key: "category_service",
    });
  }
  if (searchParams?.province_name || searchParams?.district_name) {
    tagSearch.push({
      name: `${searchParams?.district_name || ""}${
        searchParams?.province_name && searchParams?.district_name ? ", " : ""
      } ${searchParams?.province_name || ""}`,
      key: "addressName",
    });
  }
  if (searchParams?.name) {
    tagSearch.push({
      name: searchParams?.name,
      key: "name",
    });
  }
  if (searchParams?.weekday) {
    const weekday = searchParams.weekday.split(",").map(Number);
    // form.setFieldsValue({ weekday: weekday });
    console.log("weekday", weekday);
    weekday.map((item) => {
      tagSearch.push({
        name: item != 8 ? `Thứ ${item}` : "Chủ Nhật",
        key: "weekday",
        value: item,
      });
    });
  }
  if (searchParams?.min || searchParams?.max) {
    if (!searchParams?.max) {
      tagSearch.push({
        name: `Trên ${
          searchParams?.min >= 1
            ? `${searchParams?.min} Triệu`
            : `${searchParams?.min * 1000} Nghìn`
        }`,
        key: "money",
      });
    }
    if (searchParams?.min && searchParams?.max) {
      tagSearch.push({
        name: `${
          searchParams?.min >= 1 ? searchParams?.min : searchParams?.min * 1000
        } đến ${
          searchParams?.max >= 1
            ? `${searchParams?.max} Triệu`
            : `${searchParams?.max * 1000} Nghìn`
        } `,
        key: "money",
      });
    }
    if (!searchParams?.min) {
      tagSearch.push({
        name: `Dưới ${
          searchParams?.max >= 1
            ? `${searchParams?.max} Triệu`
            : `${searchParams?.max * 1000} Nghìn`
        }`,
        key: "money",
      });
    }
  }
  if (searchParams?.time) {
    tagSearch.push({
      name: searchParams.time,
      key: "time",
    });
  }

  const removeRoute = (item) => {
    if (item?.key == "addressName") {
      form.setFieldsValue({
        provinceName: undefined,
        districtName: undefined,
      });
    } else if (item?.key == "weekday") {
      const oldWeek = form.getFieldValue("weekday");
      console.log("oldWeek", oldWeek);
      const removedWeek = oldWeek.filter((sitem) => sitem !== item?.value);
      form.setFieldsValue({ weekday: removedWeek });
    } else if (item?.key == "money") {
      form.setFieldsValue({
        min: undefined,
        max: undefined,
      });
    } else if (item?.key == "time") {
      form.setFieldsValue({
        time: undefined,
      });
    } else {
      form.setFieldsValue({ [item?.key]: undefined });
    }
    onReSearch();
  };

  useEffect(() => {
    if (searchParams.time) {
      form.setFieldsValue({ time: moment(searchParams.time, "HH:mm") });
    }

    if (searchParams.category_service) {
      // const categoryService = searchParams.category_service
      //   .split(",")
      //   .map(Number);
      form.setFieldsValue({
        category_service: parseInt(searchParams.category_service),
      });
    } else {
      form.setFieldsValue({ category_service: undefined });
    }
    if (searchParams.weekday) {
      const weekday = searchParams.weekday.split(",").map(Number);
      form.setFieldsValue({ weekday: weekday });
    }
    // ,
  }, [pathname, searchParamUrl]);

  useEffect(() => {
    if (searchParams?.province_id) {
      const itemProvince = listProvince.find(
        (item) => item.id == searchParams?.province_id
      );
      form.setFieldsValue({
        province_id: itemProvince.id,
        provinceName: itemProvince.name,
      });
      if (searchParams?.district_id != form.getFieldValue("district_id")) {
        const itemDistrict = itemProvince.district.find(
          (item) => item.id == searchParams?.district_id
        );
        form.setFieldsValue({
          district_id: itemDistrict?.id,
          districtName: itemDistrict?.name,
        });
      }
    } else {
      form.setFieldsValue({
        province_id: undefined,
        provinceName: undefined,
        district_id: undefined,
        districtName: undefined,
      });
    }
    setSelectedID(searchParams.category_service);
    form.setFieldsValue({
      min: searchParams.min,
      max: searchParams.max,
    });
    if (searchParams?.name) {
      form.setFieldsValue({
        name: searchParams?.name,
      });
    }

    setChangeState(!changeState);
  }, [pathname, searchParamUrl, searchParams]);

  const onReSearch = async () => {
    const fieldsValue = await form.validateFields();
    // console.log("fieldsValue", fieldsValue);
    if (fieldsValue.time) {
      fieldsValue.time = moment(fieldsValue.time).format("HH:mm");
    }

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

    // console.log("routeSearch", routeSearch);
    const parseValue = {
      ...fieldsValue,
      // province_id: form.getFieldValue("province_id"),
      district_id: undefined,
    };
    removeUndefined(parseValue);
    const param = new URLSearchParams(parseValue).toString();

    const urlQuery =
      routeSearch.length > 0 ? routeSearch.join("") : "/tim-nha-khoa";
    // console.log("routeSearch", urlQuery);
    NProgress.start();
    wrapperRouterPush(router, `${urlQuery}?${param}`);
  };

  useEffect(() => {
    window.addEventListener("resize", function () {
      var filterContainer = document.getElementById("wpCol");
      if (filterContainer) {
        filterContainer.style.height = window.innerHeight + "px";
      }
    });
  }, []);

  const handleButtonPrice = (item) => {
    form.setFieldsValue({
      min: item.min,
      max: item.max,
    });
  };
  useEffect(() => {
    // console.log(selectedID);
    // setCurrentPrice(PRICE_FILTER_SERVICE[2].price);
    const filterID = PRICE_FILTER_SERVICE.find((item) => item.id == selectedID);
    if (filterID?.id == null) {
      setCurrentPrice(PRICE_FILTER);
    } else {
      setCurrentPrice(filterID.price);
    }
  }, [selectedID]);

  const dataIntroduce = data?.listService?.find(
    (item) => item.id == searchParams.category_service
  );

  const [optionsCategoryService, setOptionsCategoryService] = useState(
    data?.listService?.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    })
  );
  const filterOption = (input, option) => {
    if (option.props.label) {
      return strVNForSearch(option.props.label).includes(strVNForSearch(input));
    } else {
      return false;
    }
  };
  const onSearchName = (searchText) => {
    debounceOnChangeInput(searchText);
  };
  const debounceOnChangeInput = _.debounce((event) => {
    requestSearchName(event);
  }, 300);
  const requestSearchName = async (searchText) => {
    if (searchText) {
      const result = await getClinicByName(searchText);
      // console.log("result", result);
      const newOption = result.map((item) => {
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
        };
      });
      setOptionsName(newOption);
    }
  };

  const debounceOnChangeInputProvice = _.debounce((event) => {
    const filterProvince = data?.listProvince.filter((item) =>
      strVNForSearch(item.name).includes(strVNForSearch(event))
    );
    setListProvince(filterProvince);
  }, 300);
  const debounceSetShowDistrict = _.debounce(() => {
    setShowDistrict(false);
  }, 300);
  const debounceOnChangeInputDistrict = _.debounce((event) => {
    const filterDistrict = listDistrictNoChange.filter((item) =>
      strVNForSearch(item.name).includes(strVNForSearch(event))
    );
    setListDistrict(filterDistrict);
  }, 300);
  const scrollableDivRef = useRef(null);
  const scrollToTop = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = 0;
    }
  };
  const removeAllTag = () => {
    form.resetFields();
    onReSearch();
  };
  useEffect(() => {
    scrollToTop();
  }, [showDistrict]);
  const handleResize = () => setWidth(window.innerWidth);
  const [width, setWidth] = useState(1024);

  useEffect(() => {
    handleResize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className="row-wp-search-result">
      {/* <BlockTopFilter searchParams={searchParams} /> */}

      <Form form={form} className="wrapper-form-search-top">
        <div id="pin-search"></div>
        <Row className={styles.wpBlockTopFilter} gutter={[12, 14]}>
          {/* chọn dịch vụ */}
          <Col xl={4} xs={24} sm={24} md={4}>
            <div className={styles.wpItemSearch}>
              <div className={styles.titleSearch}>Chọn dịch vụ</div>

              <FormItem name="category_service">
                <Select
                  onChange={(value) => {
                    setSelectedID(value);
                  }}
                  allowClear
                  showSearch
                  options={optionsCategoryService}
                  getPopupContainer={() =>
                    document.getElementById("pin-search")
                  }
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
            </div>
          </Col>
          {/* chọn khu vực */}
          <Col
            xl={5}
            xs={24}
            sm={24}
            md={5}
            className="wrapper-form-search-address"
          >
            <div className={styles.wpItemSearch}>
              <div className={styles.titleSearch}>Chọn khu vực</div>
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
                                  // setIdProvince(item.id);

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
                      <div className="wp-modal-select-2">
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
                        <div
                          className="wp-list-select-2"
                          ref={scrollableDivRef}
                        >
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
                  <div className="wp-button-choose">
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
                    {(form.getFieldValue("districtName") ||
                      form.getFieldValue("provinceName")) && (
                      <CloseCircleFilled
                        className="icon-clear"
                        onClick={() => {
                          form.setFieldsValue({
                            province_id: undefined,
                            provinceName: undefined,
                            district_id: undefined,
                            districtName: undefined,
                          });
                          setChangeState(!changeState);
                        }}
                      />
                    )}
                  </div>
                </Popover>
              </FormItem>
            </div>
          </Col>
          {/* Phòng khám nha khoa */}
          <Col xl={12} xs={24} sm={24} md={12}>
            <div className={styles.wpItemSearch}>
              <div className={styles.titleSearch}>Phòng khám nha khoa</div>
              <FormItem name="name">
                <AutoComplete
                  options={optionsName}
                  placeholder="Nhập tên phòng khám"
                  className="wrapper-input-search"
                  onSearch={onSearchName}
                  value={inputValue}
                  onChange={(data, option) => {
                    // setInputValue(data);
                    // console.log("data", data);
                    form.setFieldsValue({ name: data?.value });
                  }}
                  onSelect={(data, option) => {
                    // setInputValue(option.label);
                    form.setFieldsValue({
                      name: option?.label?.props?.children?.props.children[1]
                        ?.props?.children,
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
                  getPopupContainer={() =>
                    document.getElementById("pin-search")
                  }
                />
              </FormItem>
            </div>
          </Col>
          {/* Button tìm kiếm */}
          <Col xl={3} xs={24} sm={24} md={3} className={styles.colButtonSearch}>
            <div className={styles.wpItemSearch}>
              <div
                className={`${styles.buttonSearch} button-blue`}
                onClick={onReSearch}
              >
                TÌM KIẾM
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter={[{ md: 25, xl: 30 }, 0]}>
          <Col xl={8} xs={24} sm={24} md={10}>
            <div className={styles.wpColFilter} id="wpCol">
              {/* <div className={styles.wpBlockTime}>  
                  <Collapse defaultActiveKey={["1"]}>
                    <Panel header="THỜI GIAN KHÁM" key="1">
                      <FormItem name="time">
                        <TimePicker
                          // getPopupContainer={() =>
                          //   document.getElementById("pin-search")
                          // }
                          format={"HH:mm"}
                          minuteStep={15}
                          dropdownAlign={{
                            points: ["tl", "bl"], // align dropdown bottom-left to top-left of input element
                            offset: [0, -4], // align offset
                            overflow: {
                              adjustX: 0,
                              adjustY: 0, // do not auto flip in y-axis
                            },
                          }}
                          placeholder="Chọn thời gian khám"
                          onSelect={(time) => {
                            console.log("time", time);
                            form.setFieldsValue({ time });
                          }}
                        />
                      </FormItem>
                      <div
                        onClick={onReSearch}
                        className={styles.buttonReSearch}
                      >
                        Tìm Kiếm
                      </div>
                    </Panel>
                  </Collapse>
                </div> */}
              <div>
                <div className={styles.wpPrice}>
                  <Collapse defaultActiveKey={defaultActiveKey}>
                    <Panel header="GIÁ TIỀN" key="1">
                      <div className={styles.wpInputForm}>
                        <div className={styles.inputForm}>
                          <Image
                            src={iconWallet}
                            className={styles.icon}
                          ></Image>
                          <FormItem name="min">
                            <Input type="number" placeholder="Giá tối thiểu" />
                          </FormItem>
                        </div>
                        <p>-</p>
                        <div className={styles.inputForm}>
                          <Image
                            src={iconWallet}
                            className={styles.icon}
                          ></Image>
                          <FormItem name="max">
                            <Input type="number" placeholder="Giá tối đa" />
                          </FormItem>
                        </div>
                        <p>Triệu</p>
                      </div>
                      <div className={styles.wpOption}>
                        <Radio.Group>
                          <Row gutter={[8, 12]}>
                            {currentPrice.map((item) => (
                              <Col span={12}>
                                <Radio.Button
                                  value={item}
                                  onClick={() => handleButtonPrice(item)}
                                >
                                  {item.name}
                                </Radio.Button>
                              </Col>
                            ))}
                          </Row>
                        </Radio.Group>
                      </div>
                    </Panel>
                  </Collapse>
                </div>
                <div className={styles.wpWeekday}>
                  <Collapse defaultActiveKey={defaultActiveKey}>
                    <Panel header="CHỌN NGÀY KHÁM TRONG TUẦN" key="1">
                      <FormItem name="weekday">
                        <Checkbox.Group>
                          <Row>
                            {data?.listWeekday?.map((item) => {
                              return (
                                <Col span={8}>
                                  <Checkbox value={item.id}>
                                    <div className={styles.itemCheckbox}>
                                      {item.name}
                                    </div>
                                  </Checkbox>
                                </Col>
                              );
                            })}
                          </Row>
                        </Checkbox.Group>
                      </FormItem>
                    </Panel>
                  </Collapse>
                </div>
              </div>
              <div className={styles.wpButtonReSearch}>
                <div
                  onClick={onReSearch}
                  className={`${styles.buttonReSearch} button-blue`}
                >
                  ÁP DỤNG
                </div>
              </div>
            </div>
          </Col>
          <Col xl={16} xs={24} sm={24} md={14} className={styles.wpColRight}>
            {tagSearch?.length > 0 && (
              <div className={styles.wpFilter}>
                <div className={styles.titleFilter}>Từ khóa</div>
                <div className={styles.wpTag}>
                  <div className={styles.listTag}>
                    {tagSearch.map((item) => {
                      return (
                        <div key={item?.name} className={styles.tagSearch}>
                          <div className={styles.tagSearchItem}>
                            {item?.name}
                          </div>
                          <Image
                            onClick={() => removeRoute(item)}
                            src={iconClose}
                            className={styles.iconClose}
                          />
                        </div>
                      );
                    })}
                    <div onClick={removeAllTag} className={styles.tagClear}>
                      Xóa tất cả
                    </div>
                  </div>
                </div>
              </div>
            )}
            <SearchResult
              searchParams={searchParams}
              searchResult={searchResult}
            />
          </Col>
        </Row>
        {/* <Row className={styles.wpBlockIntroduceCategoryService}>
          {searchParams.category_service && dataIntroduce?.introduce && (
            <div className={styles.wpIntroduce}>
              <p className={styles.introduceTitle}>
                Các loại {dataIntroduce?.name} đang được thực hiện phổ biến hiện
                nay là:
              </p>
              <div className={styles.introduceLine}></div>
              <div
                dangerouslySetInnerHTML={{ __html: dataIntroduce?.introduce }}
              />
            </div>
          )}
        </Row> */}
      </Form>
    </div>
  );
}

export default function SearchResultClient({ searchParams, searchResult }) {
  return (
    <Suspense>
      <SearchResultClientChild
        searchParams={searchParams}
        searchResult={searchResult}
      />
    </Suspense>
  );
}
