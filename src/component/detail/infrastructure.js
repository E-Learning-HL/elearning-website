"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import defaultImage from "@/public/image/default-image-square.png";
import { PREFIX_IMAGE_URL } from "@/src/const/const";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { IMAGE_TYPE } from "@/src/const/const";
import ImageCommon from "@/src/component/image/image";
import { Image } from "antd";

export default function Infrastructure({ detailClinic }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiper = useSwiper();
  const imageIntroduce = detailClinic?.image.filter(
    (item) => item.image_type == IMAGE_TYPE.introduce
  );
  return (
    <div className="wp-infrastructure">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={false}
        spaceBetween={0}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        useSwiper={swiper}
      >
        {imageIntroduce?.map((item) => {
          return (
            <SwiperSlide>
              {/* <ImageCommon data={item} /> */}
              <Image
                src={item ? `${PREFIX_IMAGE_URL}${item.key}` : defaultImage}
                className="img"
              ></Image>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={false}
        spaceBetween={16}
        slidesPerView={4.5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {imageIntroduce?.map((item) => {
          return (
            <SwiperSlide>
              {/* <ImageCommon data={item} /> */}
              <Image
                src={item ? `${PREFIX_IMAGE_URL}${item.key}` : defaultImage}
                className="img"
                preview={false}
              ></Image>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
