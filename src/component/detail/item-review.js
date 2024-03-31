import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Modal,
  Col,
  Row,
  Rate,
  Upload,
  Checkbox,
  message,
  notification,
  Image as AntImage,
} from "antd";
import useInteractCookie from "@/src/util/useInteractCookie";
import { PREFIX_IMAGE_URL } from "@/src/const/const";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import iconRating from "@/public/icon/icon-rating.svg";
import iconImageWhite from "@/public/icon/icon-image-white.svg";
import iconImage from "@/public/icon/icon-image.svg";
import iconTick from "@/public/icon/icon-tick.svg";
import iconEdit from "@/public/icon/icon-edit.svg";
import iconReply from "@/public/icon/icon-reply.svg";
import iconLike from "@/public/icon/icon-like.svg";
import iconDislike from "@/public/icon/icon-dislike.svg";
import iconLiked from "@/public/icon/icon-liked.svg";
import iconDisliked from "@/public/icon/icon-disliked.svg";
import logoReadyShare from "@/public/image/logo-ready-share.png";
import iconSend from "@/public/icon/icon-send.svg";
import "@/src/style/item-review.css";
import { strVNForSearch } from "@/src/util/util";
import axios from "axios";
import { BASE_URL, filterCretiriaName } from "@/src/const/const";
import { getReview } from "@/src/component/detail/get-review.js";
const FormItem = Form.Item;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export default function ItemReview({
  dataReview,
  setDataReview,
  item,
  index,
  reTrieveData,
}) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [varResponsive, setVarResponsive] = useState();
  const [likeRating, setLikeRating] = useState(item.total_like);
  const [dislikeRating, setDislikeRating] = useState(item.total_unlike);
  const [likeRatingCK, setLikeRatingCK] = useState(
    useInteractCookie(`${item.id}`).hasLiked
  );
  const listColor = [
    "#71A3DD",
    "#71CEDD",
    "#9A92F2",
    "#FF8E75",
    "#F59B5A",
    "#DD71BF",
    "#F66565",
    "#71DDA9",
    "#A3C07E",
    "#FF7AE2",
  ];
  // let backgroundColor = null;
  const [dislikeRatingCK, setDislikeRatingCK] = useState(
    useInteractCookie(`${item.id}`).hasDisLiked
  );
  const validCretiria = item.rating_general;
  const finalCretiria =
    validCretiria.length > 4
      ? // ? validCretiria.sort(() => Math.random() - 0.5).slice(0, 4)
        // : [...validCretiria];
        validCretiria.slice(0, 4)
      : [...validCretiria];
  const uploadRef = useRef(null);
  function handleImageClick() {
    const element = document.getElementById("imageClickID");
    element.click();
  }
  //listen to responsive
  const changeVariable = () => {
    if (typeof window !== "undefined") {
      const screenWidth = window.innerWidth;

      if (screenWidth < 1024 && varResponsive != 0) {
        setVarResponsive(0);
      } else if (screenWidth >= 1024 && varResponsive != 1) {
        setVarResponsive(1);
      }
    }
  };
  // changeVariable();

  const displayCaptcha = () => {
    if (!document.getElementById("reCaptcha_script")) {
      const script = document.createElement("script");
      script.id = "reCaptcha_script";
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_KEY}`;
      script.async = true;
      document.body.appendChild(script);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("resize", changeVariable);
  }

  //convert name to fill to avatar
  function abbreviateName(fullName) {
    const words = fullName.trim().split(" ");
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    } else if (words.length === 2) {
      return words.map((word) => word.charAt(0).toUpperCase()).join("");
    } else {
      return (
        words[0].charAt(0).toUpperCase() +
        words[words.length - 1].charAt(0).toUpperCase()
      );
    }
  }
  //convert date
  function convertDate(date) {
    const apiDate = new Date(date);
    const day = apiDate.getDate();
    const month = apiDate.getMonth() + 1;
    const year = apiDate.getFullYear();

    const validDate = `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;

    return validDate;
  }
  const [formReplyComment] = Form.useForm(); ///
  const onSend = async (rating_id) => {
    grecaptcha.ready(function () {
      grecaptcha
        .execute(`${process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_KEY}`, {
          action: "submit",
        })
        .then(async function (token) {
          const formValue = await formReplyComment.validateFields([
            `nameReply${rating_id}`,
            `contentReply${rating_id}`,
            `image`,
          ]);
          const cleanNotImage = formValue?.image?.filter(
            (item) => item.type === "image/jpeg" || item.type === "image/png"
          );
          let image = [];
          if (formValue?.image) {
            image = await Promise.all(
              cleanNotImage?.map(async (item) => {
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
          const data = {
            user_name: formValue[`nameReply${rating_id}`],
            content: formValue[`contentReply${rating_id}`],
            user_id: null,
            rating_id: rating_id,
            comment_parent_id: null,
            image: image.length > 0 ? image[0] : null,
          };
          console.log("data", data);
          axios
            .post(`${BASE_URL}/admin/comment`, data)
            .then(async (response) => {
              console.log("POST request successful!", response.data);
              formReplyComment.resetFields();
              setFileList([]);
              console.log(fileList);
              reTrieveData();
            })
            .catch((error) => {
              console.error("Error making POST request:", error);
            });
        });
    });
  };
  const onInteract = async (action, rating_id, index) => {
    const { hasLiked, hasDisLiked, setLikeCookie, setDislikeCookie } =
      useInteractCookie(`${rating_id}`);
    //change before call api
    if (action == "LIKE" && !hasLiked) {
      setLikeRating(likeRating + 1);
      setLikeRatingCK(true);
      if (hasDisLiked) {
        setDislikeRating(dislikeRating - 1);
        setDislikeRatingCK(false);
      }
    } else if (action == "UNLIKE" && !hasDisLiked) {
      setDislikeRating(dislikeRating + 1);
      setDislikeRatingCK(true);
      if (hasLiked) {
        setLikeRating(likeRating - 1);
        setLikeRatingCK(false);
      }
    }
    const likeAction = {
      status: "LIKE",
      comment_id: null,
      rating_id: rating_id,
      user_id: null,
    };
    const disLikeAction = {
      status: "UNLIKE",
      comment_id: null,
      rating_id: rating_id,
      user_id: null,
    };
    const body = action == "LIKE" ? likeAction : disLikeAction;
    if (body == likeAction && !hasLiked) {
      if (hasDisLiked) {
        axios
          .post(`${BASE_URL}/admin/like/removeLikeOrUnlike`, disLikeAction)
          .then(async (response) => {
            console.log("POST request successful!", response.data);
            // reTrieveData();
          })
          .catch((error) => {
            console.error("Error making POST request:", error);
          });
      }
      axios
        .post(`${BASE_URL}/admin/like`, body)
        .then(async (response) => {
          console.log("POST request successful!", response.data);
          // reTrieveData();
          setLikeCookie();
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    } else if (body == disLikeAction && !hasDisLiked) {
      if (hasLiked) {
        axios
          .post(`${BASE_URL}/admin/like/removeLikeOrUnlike`, likeAction)
          .then(async (response) => {
            console.log("POST request successful!", response.data);
            // reTrieveData();
          })
          .catch((error) => {
            console.error("Error making POST request:", error);
          });
      }
      axios
        .post(`${BASE_URL}/admin/like`, body)
        .then(async (response) => {
          console.log("POST request successful!", response.data);
          setDislikeCookie();
          // reTrieveData();
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    }
    // axios
    //   .post(`${BASE_URL}/admin/like`, body)
    //   .then((response) => {
    //     console.log("POST request successful!", response.data);
    //     // let likeChange;
    //     // if (action == "LIKE") {
    //     //   likeChange = {
    //     //     ...dataReview[index],
    //     //     total_like: dataReview[index].total_like + 1,
    //     //   };
    //     // } else {
    //     //   likeChange = {
    //     //     ...dataReview[index],
    //     //     total_unlike: dataReview[index].total_unlike + 1,
    //     //   };
    //     // }

    //     // let newDataReview = [...dataReview];
    //     // newDataReview.splice(index, 1, likeChange);
    //     // setDataReview(newDataReview);
    //     reTrieveData();
    //   })
    //   .catch((error) => {
    //     console.error("Error making POST request:", error);
    //   });
  };
  const onInteractReply = async (
    action,
    rating_id,
    index_rating,
    comment_id,
    index_comment
  ) => {
    const { hasLiked, hasDisLiked, setLikeCookie, setDislikeCookie } =
      useInteractCookie(`${rating_id}_${comment_id}`);
    const likeAction = {
      status: "LIKE",
      comment_id: comment_id,
      rating_id: rating_id,
      user_id: null,
    };
    const disLikeAction = {
      status: "UNLIKE",
      comment_id: comment_id,
      rating_id: rating_id,
      user_id: null,
    };
    const body = action == "LIKE" ? likeAction : disLikeAction;
    if (body == likeAction && !hasLiked) {
      if (hasDisLiked) {
        axios
          .post(`${BASE_URL}/admin/like/removeLikeOrUnlike`, disLikeAction)
          .then(async (response) => {
            console.log("POST request successful!", response.data);
            // reTrieveData();
          })
          .catch((error) => {
            console.error("Error making POST request:", error);
          });
      }
      axios
        .post(`${BASE_URL}/admin/like`, body)
        .then(async (response) => {
          console.log("POST request successful!", response.data);
          reTrieveData();
          setLikeCookie();
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    } else if (body == disLikeAction && !hasDisLiked) {
      if (hasLiked) {
        axios
          .post(`${BASE_URL}/admin/like/removeLikeOrUnlike`, likeAction)
          .then(async (response) => {
            console.log("POST request successful!", response.data);
            // reTrieveData();
          })
          .catch((error) => {
            console.error("Error making POST request:", error);
          });
      }
      axios
        .post(`${BASE_URL}/admin/like`, body)
        .then(async (response) => {
          console.log("POST request successful!", response.data);
          setDislikeCookie();
          reTrieveData();
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    }
  };
  // const validCretiria = item.rating_general;
  // const finalCretiria =
  //   validCretiria.length > 4
  //     ? validCretiria.sort(() => Math.random() - 0.5).slice(0, 4)
  //     : [...validCretiria];
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
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
  const [fileList, setFileList] = useState([]);

  const handleRemove = (file) => {
    // Update the fileList state after removing the file
    setFileList((prevFileList) =>
      prevFileList.filter((item) => item.uid !== file.uid)
    );
  };
  const buttonUpload = fileList.length != 1 && (
    <Image
      src={iconImage}
      onClick={(e) => {
        uploadRef.current.click();
        e.stopPropagation();
      }}
      style={{ cursor: "pointer", marginRight: "8px" }}
    />
  );
  // const ratingInteract = useInteractCookie(`${item.id}`);

  // const backgroundColor =listColor[Math.floor(Math.random() * listColor.length)];
  const backgroundColor = () => {
    return listColor[Math.floor(Math.random() * listColor.length)];
  };

  const backgroundColorMemo = useMemo(
    () => backgroundColor(),
    [listColor.length]
  );
  return (
    <div className="wpItemReview">
      <div className="wpUserOverview">
        <Row gutter={[12, 14]}>
          <Col xs={24} sm={24} md={12} xl={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="userOverview">
                <div
                  className="avatar"
                  style={{ backgroundColor: backgroundColorMemo }}
                >
                  {abbreviateName(item.user_name)}
                </div>
                {/* change color of avatar */}
                <div className="userInfo">
                  <div className="wpUserName-Score">
                    <div className="userName">{item.user_name}</div>
                    <div className="userScore">
                      <div className="title">Đã đánh giá</div>
                      <div className="score">{item.averageRate}</div>
                      <div className="image">
                        <Image src={iconRating} width={16} height={16}></Image>
                      </div>
                    </div>
                  </div>
                  <div className="listRatingService">
                    <Row gutter={[8, { xl: 7, md: 7, xs: 0, sm: 0 }]}>
                      {item.rating_category_service.map((service) => (
                        <Col>
                          <div className="ratingService">
                            <Image src={iconTick}></Image>
                            <div className="serviceNane">
                              {
                                service.category_service_clinic.category_service
                                  ?.name
                              }
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </div>
              </div>
              {item.averageRate >= 7 && (
                <div className="logoReadyShare">
                  <Image src={logoReadyShare}></Image>
                </div>
              )}
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} xl={12}>
            <div className="commonRatingPoint">
              {finalCretiria.map((cretiria) => {
                return (
                  <div className="wpCretiriaPoint">
                    <div className="cretiria">{cretiria.name}:</div>
                    <div className="point">{cretiria.value}</div>
                    <div className="image">
                      <Image src={iconRating} width={16} height={16}></Image>
                    </div>
                  </div>
                );
              })}
              {validCretiria.length > 4 && <div className="more">[...]</div>}
            </div>
          </Col>
        </Row>
      </div>
      <div className="wpContent">
        <div className="wpMainContent">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="content">{item.content}</div>
            {item.averageRate >= 7 && (
              <div className="logoReadyShare">
                <Image src={logoReadyShare}></Image>
              </div>
            )}
          </div>
          <div className="wpImageContent">
            <AntImage.PreviewGroup>
              {item.image.map((img, index) => {
                if (index > varResponsive) {
                  return (
                    <div>
                      <AntImage
                        className="imageContent"
                        style={{ display: "none" }}
                        src={`${PREFIX_IMAGE_URL}${img.key}`}
                      ></AntImage>
                    </div>
                  );
                } else if (
                  item.image.length > varResponsive + 1 &&
                  index == varResponsive
                ) {
                  return (
                    <div style={{ position: "relative" }}>
                      <AntImage
                        id="imageClickID"
                        className="imageContent"
                        src={`${PREFIX_IMAGE_URL}${img.key}`}
                      ></AntImage>
                      <div
                        className="buttonMoreImage"
                        onClick={() => {
                          handleImageClick();
                        }}
                      >
                        <Image
                          src={iconImageWhite}
                          style={{ marginRight: "4px" }}
                        ></Image>
                        +{item.image.length - 2}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div>
                      <AntImage
                        className="imageContent"
                        src={`${PREFIX_IMAGE_URL}${img.key}`}
                      ></AntImage>
                    </div>
                  );
                }
              })}
            </AntImage.PreviewGroup>
          </div>
          {/* <div cl></div> */}
          <div className="spInteract">
            <div className="wpInteract">
              <div className="interact">
                <div
                  className="iconInteract"
                  onClick={() => onInteract("LIKE", item.id, index)}
                >
                  <Image src={likeRatingCK ? iconLiked : iconLike}></Image>
                </div>
                <div className="numberInteract">{likeRating}</div>
              </div>
              <div className="interact">
                <div
                  className="iconInteract"
                  onClick={() => onInteract("UNLIKE", item.id, index)}
                >
                  <Image
                    src={dislikeRatingCK ? iconDisliked : iconDislike}
                  ></Image>
                </div>
                <div className="numberInteract">{dislikeRating}</div>
              </div>
              <div className="interact" onClick={() => setIsCommentOpen(true)}>
                <div className="iconInteract">
                  <Image src={iconReply}></Image>
                </div>
                <div className="textInteract">
                  Trả lời ({item.comment.length})
                </div>
              </div>

              {item.source == "USER" && (
                <div className="timeUpload">{convertDate(item.created_at)}</div>
              )}
            </div>
            {item.source == "GOOGLE" && (
              <div className="source">Nguồn: Google</div>
            )}
          </div>
        </div>
      </div>
      {isCommentOpen == true && (
        <Row className="wpReply">
          <Col xs={20} sm={20} md={20} xl={20}>
            <div className="listReply">
              {item.comment.map((comment, index_comment) => {
                const interactComment = useInteractCookie(
                  `${item.id}_${comment.id}`
                );
                return (
                  <div className="itemReply">
                    <div className="userInfo">
                      <div
                        className="avatar"
                        style={{ backgroundColor: backgroundColorMemo }}
                      >
                        {abbreviateName(comment.user_name)}
                      </div>
                      <div className="userName">{comment.user_name}</div>
                    </div>
                    <div className="wpContentReply">
                      <div className="wpMainContent">
                        <div className="content">{comment.content}</div>
                        {comment?.image && (
                          <div className="wpImageContent">
                            <AntImage.PreviewGroup>
                              <AntImage
                                className="imageContent"
                                src={`${PREFIX_IMAGE_URL}${comment?.image?.key}`}
                              ></AntImage>
                            </AntImage.PreviewGroup>
                          </div>
                        )}
                        <div className="wpInteract">
                          <div className="interact">
                            <div
                              className="iconInteract"
                              onClick={() =>
                                onInteractReply(
                                  "LIKE",
                                  item.id,
                                  index,
                                  comment.id,
                                  index_comment
                                )
                              }
                            >
                              <Image
                                src={
                                  interactComment.hasLiked
                                    ? iconLiked
                                    : iconLike
                                }
                              ></Image>
                            </div>
                            <div className="numberInteract">
                              {comment.total_like}
                            </div>
                          </div>
                          <div className="interact">
                            <div
                              className="iconInteract"
                              onClick={() =>
                                onInteractReply(
                                  "UNLIKE",
                                  item.id,
                                  index,
                                  comment.id,
                                  index_comment
                                )
                              }
                            >
                              <Image
                                src={
                                  interactComment.hasDisLiked
                                    ? iconDisliked
                                    : iconDislike
                                }
                              ></Image>
                            </div>
                            <div className="numberInteract">
                              {comment.total_unlike}
                            </div>
                          </div>
                          <div className="timeUpload">
                            {convertDate(comment.created_at)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {item.comment.length > 3 && (
              <div className="seeMore">Xem thêm ...</div>
            )}
            <div className="formReply" id="form-reply" onClick={displayCaptcha}>
              <div className="formTitle">Trả lời</div>
              <Form form={formReplyComment}>
                <FormItem
                  className="nameReplyInput"
                  name={`nameReply${item.id}`}
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Input placeholder="Họ và tên"></Input>
                </FormItem>
                <FormItem
                  className="contentReplyInput"
                  name={`contentReply${item.id}`}
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập câu trả lời"
                    suffix={
                      <div>
                        {buttonUpload}
                        <Image
                          src={iconSend}
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            onSend(item.id);
                            e.stopPropagation();
                          }}
                        />
                      </div>
                    }
                  ></Input>
                </FormItem>
                <FormItem
                  name="image"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  className="imageReplyInput"
                  style={fileList.length != 0 ? {} : { display: "none" }}
                >
                  <Upload
                    listType="picture-card"
                    // fileList={fileList}
                    onPreview={handlePreview}
                    // beforeUpload={beforeUpload}
                    onRemove={handleRemove}
                    maxCount={1}
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
                        setFileList((prevFileList) => [...prevFileList, file]);
                        onSuccess();
                      }
                    }}
                  >
                    <div className="upLoadButton" ref={uploadRef}></div>
                  </Upload>
                </FormItem>
              </Form>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}
