"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import styles from "./detail.scss";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import SwiperButtonNext from "./swiper-button";
import iconStar2 from "@/public/icon/icon-star-2.svg";
import iconExp from "@/public/icon/icon-exp.svg";
import { IMAGE_TYPE } from "@/src/const/const";
import Image from "next/image";
import ImageCommon from "@/src/component/image/image";

export default function Doctor({ detailClinic }) {
  console.log("doctor", detailClinic.doctor)
  return (
    <div className="wp-doctor-section">
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1.2,
          },
          768: {
            slidesPerView: 2.2,
          },
          1024: {
            slidesPerView: 2.5,
          },
        }}
        spaceBetween={10}
        modules={[Pagination]}
        className="mySwiperDoctor"
      >
        <SwiperButtonNext />
        {detailClinic?.doctor.map((item) => {
          let valueService = [];
          if (item.doctor_service.length > 0) {
            item.doctor_service.map((subItem) =>
              valueService.push(subItem.category_service.name)
            );
          }
          const avatar = item.image.find(
            (subItem) => subItem.image_type === IMAGE_TYPE.avatar
          );
          return (
            <SwiperSlide className="col-item-doctor" key={item.id}>
              <div className="item-doctor">
                <ImageCommon
                  style="image-doctor"
                  data={avatar}
                  width={246}
                  height={270}
                />
                <div className="doctor-name">{item.name}</div>
                <div className="doctor-title">
                  {item.title ? item.title : "_"}
                </div>
                <div className="space-title"></div>
                <div className="wp-line-doctor">
                  <div className="wp-left-doctor">
                    <Image src={iconStar2} className="icon-star-doctor" />
                    <div className="name-line-doctor">Dịch vụ:</div>
                  </div>
                  <div className="value-line-doctor">
                    {valueService.join(", ")}
                  </div>
                </div>
                <div className="wp-line-doctor">
                  <div className="wp-left-doctor">
                    <Image src={iconExp} className="icon-star-doctor" />
                    <div className="name-line-doctor">Kinh nghiệm:</div>
                  </div>
                  <div className="value-line-doctor">
                    {item.experience_time}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
