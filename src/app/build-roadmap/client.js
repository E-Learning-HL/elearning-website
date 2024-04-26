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
  notification,
  Modal,
} from "antd";
import styles from "./page.module.scss";
import "@/src/style/common.css";
import "@/src/style/tim-nha-khoa.css";
import Link from "next/link";
import ImageCommon from "@/src/component/image/image";
import iconClose from "@/public/icon/icon-close.svg";
import iconLocation from "@/public/icon/icon-location.png";
import iconLocationUncheck from "@/public/icon/icon-location-uncheck.png";
import iconPinLocation from "@/public/icon/icon-pin-location.png";
import iconAmount from "@/public/icon/icon-amount.png";
import iconCountdown from "@/public/icon/icon-countdown.png";
import iconBooks from "@/public/icon/icon-books.png";
import iconAmountTest from "@/public/icon/icon-test.png";
import iconListening from "@/public/icon/icon-headphone.png";
import iconWriting from "@/public/icon/icon-writing.png";
import iconWritingAi from "@/public/icon/icon-writing-ai.png";
import iconSpeaking from "@/public/icon/icon-speaking.png";
import iconSpeakingAi from "@/public/icon/icon-speaking-ai.png";
import iconReading from "@/public/icon/icon-reading.png";
import { BASE_URL } from "../../const/const";
import iconQR from "@/public/icon/icon-qr-code.png";
import iconATM from "@/public/icon/icon-credit-card.png";

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
import { START_POINT, TARGET_POINT } from "@/src/const/const";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";

const { Search } = Input;
const { Panel } = Collapse;
const FormItem = Form.Item;

function SearchResultClientChild({
  searchParams,
  searchResult,
  listPaymentMethod,
}) {
  // console.log("listPaymentMethod", listPaymentMethod);
  // console.log("searchParamssearchParams",parseInt(searchParams.start_point), parseInt(searchParams.target_point));
  const { data } = useQuery({
    queryKey: ["api-common"],
  });
  const router = useRouter();
  const [form] = Form.useForm();
  const pathname = usePathname();
  const searchParamUrl = useSearchParams();
  const [currentPrice, setCurrentPrice] = useState(PRICE_FILTER);
  const [selectedID, setSelectedID] = useState();
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIdPay, setCurrenIdPay] = useState(null)
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
  const [startPoint, setStartPoint] = useState(
    parseInt(searchParams?.start_point)
  );
  const [targetPoint, setTargetPoint] = useState(
    parseInt(searchParams?.target_point)
  );
  const [dataCourses, setDataCourses] = useState(searchResult);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const includesValue = (array, x) => array.some((item) => item.value === x);
  const formattedCourses = dataCourses?.map((course) => ({
    courseId: course.course_id,
  }));

  const handleUpdateUrl = (startPoint, targetPoint) => {
    // Tạo query object mới từ query parameters hiện tại
    const query = {
      ...router.query,
      start_point: startPoint,
      target_point: targetPoint,
    };

    // Thực hiện cập nhật URL mà không load lại trang
    router.push({
      pathname: router.pathname,
      query: query,
    });
  };

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

  const openNotificationWithIcon = (type, message, des) => {
    notification[type]({
      message: message,
      description: des,
      top: 72,
    });
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
      routeSearch.length > 0 ? routeSearch.join("") : "/build-roadmap";
    // console.log("routeSearch", urlQuery);
    NProgress.start();
    wrapperRouterPush(router, `${urlQuery}?${param}`);
  };

  const onSubmit = () => {
    if (session) {
      if (paymentMethod) {
        if (dataCourses?.length > 0 && amountPriceCourse) {
          const body = {
            amount:
              dataCourses?.length > 1
                ? amountPriceCourse * 0.7
                : amountPriceCourse,
            paymentMethodId: paymentMethod ? paymentMethod : null,
            course: formattedCourses ? formattedCourses : null,
          };
          axios
            .post(`${BASE_URL}/api/payments/create-payment`, body, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.user?.access_token}`,
              },
            })
            .then((res) => {
              console.log("====resss", res);
              setModalOpen(true)
              setCurrenIdPay(res.data.paymentId)
            })
            .catch((error) => {
              // openNotificationWithIcon("error", "Error", "Có lỗi xảy ra.");
            });
        } else {
          openNotificationWithIcon("error", "Error", "Có lỗi xảy ra.");
        }
      } else {
        openNotificationWithIcon(
          "warning",
          "Warning",
          "Vui lòng chọn phương thức thanh toán."
        );
      }
    } else {
      openNotificationWithIcon(
        "warning",
        "Warning",
        "Bạn cần đăng nhập để thực hiện hành động này."
      );
    }
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
  const lenghtCourse = dataCourses?.length;
  const amountPriceCourse = dataCourses?.reduce(
    (total, course) => total + course.course_price,
    0
  );
  const roadmapVar = `${
    START_POINT?.find((item) => item.value === startPoint)?.lable
  } - ${TARGET_POINT?.find((item) => item.value === targetPoint)?.lable}`;

  useEffect(() => {
    handleResize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
  }, []);

  const handlePay = (status) => {
    axios.patch(`${BASE_URL}/api/payments/update-payment/${currentIdPay}`,{
      status: status
    },{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    })
    .then(() => {
      openNotificationWithIcon(
        "success",
        "Success",
        "Mua khóa học thành công."
      );
      setModalOpen(false)
    })
    .catch(() => {
      openNotificationWithIcon("error", "Error", "Có lỗi xảy ra.");
    })
  }

  useEffect(() => {
    const recall = async () => {
      try {
        const result = await axios.get(`${BASE_URL}/api/courses/course-level`, {
          params: {
            startPoint: includesValue(START_POINT, startPoint)
              ? startPoint
              : null,
            endPoint: includesValue(TARGET_POINT, targetPoint)
              ? targetPoint
              : null,
          },
        });
        setDataCourses(result.data);
      } catch (error) {}
    };
    recall();
  }, [startPoint, targetPoint]);

  return (
    <div className="row-wp-search-result">
      {/* <BlockTopFilter searchParams={searchParams} /> */}
      <Modal title="Xác nhận thanh toán" open={modalOpen} onOk={() => {handlePay('SUCCESS')}} onCancel={() => {handlePay('FAILED')}} okText="Đã thanh toán" cancelText="Hủy">
      </Modal>
      <Form form={form} className="wrapper-form-search-top">
        <div id="pin-search"></div>
        <Row className={styles.wpBlockTopFilter} gutter={[14, 14]}>
          {/* Thông tin thanh toán */}
          <Col xl={9} xs={24} sm={24} md={9}>
            <div className={styles.wpSelectLeft}>
              {dataCourses?.length > 0 ? (
                <div className={styles.selectLeft}>
                  <div className={styles.title}>THÔNG TIN THANH TOÁN</div>
                  <div className={styles.listItem}>
                    {/* //map here */}
                    {dataCourses?.map((item) => {
                      return (
                        <div className={styles.item}>
                          <div className={styles.titleItem}>
                            {item.course_name_course}
                          </div>
                          <div className={styles.priceItem}>
                            {item?.course_price?.toLocaleString("en-US")}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* //giảm giá */}
                  {lenghtCourse > 1 && (
                    <div className={styles.wpDiscount}>
                      <div className={styles.titleCp}>GIẢM GIÁ</div>
                      <div className={styles.coupon}>30%</div>
                    </div>
                  )}
                  <div className={styles.wpAmount}>
                    <div className={styles.titleAmount}>Tổng</div>
                    <div className={styles.paymentAmount}>
                      {lenghtCourse > 1
                        ? (amountPriceCourse * 0.7)?.toLocaleString("en-US")
                        : amountPriceCourse?.toLocaleString("en-US")}
                    </div>
                  </div>
                  <div className={styles.methodPayment}>
                    <div className={styles.titlePay}>Select payment method</div>
                    <Radio.Group
                      size="large"
                      className="radio-payment-method"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      {listPaymentMethod?.map((item) => {
                        return (
                          <Radio.Button value={item.id}>
                            <div className="wp-item">
                              <Image
                                className="image-pay"
                                src={item.name === "ATM" ? iconATM : iconQR}
                              ></Image>
                              <div className="text-pay">{item.name}</div>
                            </div>
                          </Radio.Button>
                        );
                      })}
                    </Radio.Group>
                  </div>
                  <div
                    className={`${styles.buttonPay} button-blue`}
                    onClick={onSubmit}
                  >
                    THANH TOÁN NGAY
                  </div>
                </div>
              ) : (
                <div className={styles.alterSelectLeft}>
                  {startPoint >= targetPoint
                    ? "Please choose goals higher than your current level."
                    : "Please select your level and goal to see the roadmap."}
                </div>
              )}
            </div>
          </Col>
          {/* Chọn lộ trình */}
          <Col xl={15} xs={24} sm={24} md={15}>
            <div className={styles.wpSelectRight}>
              <div className={styles.selectRight}>
                <div className={styles.title}>
                  Chọn trình độ hiện tại của bạn
                </div>
                <div className={`${styles.startPoint} start-point`}>
                  <Radio.Group
                    defaultValue={
                      searchParams?.start_point
                        ? parseInt(searchParams?.start_point)
                        : ""
                    }
                    className="wp-radio-select"
                    onChange={(e) => {
                      setStartPoint(e.target.value);
                      router.replace(
                        `/build-roadmap?start_point=${e.target.value}&target_point=${targetPoint}`,
                        { shallow: true, scroll: false }
                      );
                    }}
                  >
                    {START_POINT.map((item) => {
                      return (
                        <Radio.Button
                          value={item.value}
                          checked={item.value === -1 ? true : false}
                          className="wp-item-select"
                        >
                          <div className="item-select">
                            <Image
                              src={iconLocation}
                              className="icon-location"
                            ></Image>
                            <div className="text-brand">{item.lable}</div>
                            <Image
                              src={item.link}
                              className="item-image"
                            ></Image>
                          </div>
                        </Radio.Button>
                      );
                    })}
                  </Radio.Group>
                </div>
                <div className={styles.title}>Chọn mục tiêu của bạn</div>
                <div className={`${styles.targetPoint} target-point`}>
                  <Radio.Group
                    defaultValue={
                      searchParams?.target_point
                        ? parseInt(searchParams?.target_point)
                        : ""
                    }
                    className="wp-radio-select"
                    onChange={(e) => {
                      setTargetPoint(e.target.value);
                      router.replace(
                        `/build-roadmap?start_point=${startPoint}&target_point=${e.target.value}`,
                        { shallow: true, scroll: false }
                      );
                    }}
                  >
                    {TARGET_POINT.map((item, idex) => {
                      return (
                        <Radio.Button
                          value={item.value}
                          className="wp-item-select"
                          checked={item.value == 3 ? true : false}
                        >
                          <div className="item-select">
                            <Image
                              src={iconLocation}
                              className="icon-location"
                            ></Image>
                            <div className="text-brand">{item.lable}</div>
                          </div>
                        </Radio.Button>
                      );
                    })}
                  </Radio.Group>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {dataCourses?.length > 0 && (
          <Row gutter={[{ md: 25, xl: 30 }, 10]}>
            <Col xl={8} xs={24} sm={24} md={10}>
              <div className={styles.wpColFilter} id="wpCol">
                <div className={styles.wpSummary}>
                  <div className={styles.titleSum}>LỘ TRÌNH CỦA BẠN</div>
                  <div className={styles.roadMap}>
                    <div className={styles.wpLeft}>
                      <Image
                        src={iconPinLocation}
                        className={styles.iconItem}
                      ></Image>
                      <div className={styles.titleContent}>Roadmap:</div>
                    </div>
                    <div className={styles.mainContent}>{roadmapVar}</div>
                  </div>
                  <div className={styles.roadMap}>
                    <div className={styles.wpLeft}>
                      <Image
                        src={iconCountdown}
                        className={styles.iconItem}
                      ></Image>
                      <div className={styles.titleContent}>Used time:</div>
                    </div>
                    <div className={styles.mainContent}>
                      {lenghtCourse} years
                    </div>
                  </div>
                  <div className={styles.roadMap}>
                    <div className={styles.wpLeft}>
                      <Image
                        src={iconAmount}
                        className={styles.iconItem}
                      ></Image>
                      <div className={styles.titleContent}>
                        Number of courses:
                      </div>
                    </div>
                    <div className={styles.mainContent}>{lenghtCourse}</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={16} xs={24} sm={24} md={14} className={styles.wpColRight}>
              {/* <SearchResult
              searchParams={searchParams}
              searchResult={searchResult}
            /> */}
              <div className={styles.wpContentCourses}>
                {/* map here */}
                {dataCourses?.map((item) => {
                  return (
                    <div className={styles.wpItemCourse}>
                      <div className={styles.titleCourse}>
                        {item?.course_name_course}
                      </div>
                      <div className={styles.overView}>
                        <Row gutter={[15, 15]}>
                          <Col xl={12}>
                            <div className={styles.items}>
                              <Image
                                className={styles.imageItems}
                                src={iconBooks}
                              ></Image>
                              <div className={styles.contentItems}>
                                <div className={styles.titleItems}>
                                  Number of lessons
                                </div>
                                <div className={styles.valueItems}>
                                  {item?.countlesson}
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col xl={12}>
                            <div className={styles.items}>
                              <Image
                                className={styles.imageItems}
                                src={iconAmountTest}
                              ></Image>
                              <div className={styles.contentItems}>
                                <div className={styles.titleItems}>
                                  Number of assignments
                                </div>
                                <div className={styles.valueItems}>100+</div>
                              </div>
                            </div>
                          </Col>
                          <Col xl={12}>
                            <div className={styles.items}>
                              <Image
                                className={styles.imageItems}
                                src={iconWritingAi}
                              ></Image>
                              <div className={styles.contentItems}>
                                <div className={styles.titleItems}>
                                  AI grading listening
                                </div>
                                <div className={styles.valueItems}>
                                  Unlimited
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col xl={12}>
                            <div className={styles.items}>
                              <Image
                                className={styles.imageItems}
                                src={iconSpeakingAi}
                              ></Image>
                              <div className={styles.contentItems}>
                                <div className={styles.titleItems}>
                                  AI grading speaking
                                </div>
                                <div className={styles.valueItems}>
                                  Unlimited
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <div className={`${styles.wpCurri} wp-curri`}>
                        <Collapse defaultActiveKey={1}>
                          <Panel header="CURRICULUM" key={1}>
                            <Row gutter={[15, 15]}>
                              <Col xl={12}>
                                <div className={styles.itemCurri}>
                                  <Image
                                    src={iconListening}
                                    className={styles.imageCurri}
                                  ></Image>
                                  <div className={styles.contentCurri}>
                                    <div className={styles.titleCurri}>
                                      Listening
                                    </div>
                                    <div className={styles.valueCurri}>
                                      {item.course_listening}
                                    </div>
                                  </div>
                                </div>
                              </Col>
                              <Col xl={12}>
                                <div className={styles.itemCurri}>
                                  <Image
                                    src={iconSpeaking}
                                    className={styles.imageCurri}
                                  ></Image>
                                  <div className={styles.contentCurri}>
                                    <div className={styles.titleCurri}>
                                      Speaking
                                    </div>
                                    <div className={styles.valueCurri}>
                                      {item.course_speaking}
                                    </div>
                                  </div>
                                </div>
                              </Col>
                              <Col xl={12}>
                                <div className={styles.itemCurri}>
                                  <Image
                                    src={iconReading}
                                    className={styles.imageCurri}
                                  ></Image>
                                  <div className={styles.contentCurri}>
                                    <div className={styles.titleCurri}>
                                      Reading
                                    </div>
                                    <div className={styles.valueCurri}>
                                      {item.course_reading}
                                    </div>
                                  </div>
                                </div>
                              </Col>
                              <Col xl={12}>
                                <div className={styles.itemCurri}>
                                  <Image
                                    src={iconWriting}
                                    className={styles.imageCurri}
                                  ></Image>
                                  <div className={styles.contentCurri}>
                                    <div className={styles.titleCurri}>
                                      Writing
                                    </div>
                                    <div className={styles.valueCurri}>
                                      {item.course_writing}
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Panel>
                        </Collapse>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        )}
      </Form>
    </div>
  );
}

export default function SearchResultClient({
  searchParams,
  searchResult,
  listPaymentMethod,
}) {
  return (
    <Suspense>
      <SearchResultClientChild
        searchParams={searchParams}
        searchResult={searchResult}
        listPaymentMethod={listPaymentMethod}
      />
    </Suspense>
  );
}
