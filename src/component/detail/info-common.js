"use client";
import "@/src/style/detail.css";
import iconMarkBlue from "@/public/icon/icon-mark-blue.svg";
import iconStar from "@/public/icon/icon-star.svg";
import iconCheck from "@/public/icon/icon-check.svg";

import Image from "next/image";
export default function InfoCommon({ detailClinic }) {
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
  let backgroundColor = null;
  return (
    <div className="wp-info-common">
      {/* <div className="wp-block-specialization">
        <div className="wp-title-block">
          <Image src={iconMarkBlue} className="icon-title" />
          Chuyên khoa:
        </div>
        <div className="wp-tag-block">
          {detailClinic?.specialization_clinic.map((item) => {
            return (
              <div className="common-tag" key={item.specialization.name}>
                {item.specialization.name}
              </div>
            );
          })}
        </div>
      </div> */}
      {detailClinic.category_service_clinic[0]?.category_service && (
        <div className="wp-block-specialization">
          <div className="wp-title-block">
            <Image src={iconStar} className="icon-title" />
            Dịch vụ nổi bật:
          </div>
          <div className="wp-tag-block">
            {detailClinic?.category_service_clinic.map((item) => {
              backgroundColor =
                listColor[Math.floor(Math.random() * listColor.length)];
              return (
                <div
                  className="common-tag"
                  key={item.category_service?.name}
                  style={{ backgroundColor: backgroundColor }}
                >
                  {item.category_service?.name}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="wp-block-specialization">
        <div className="wp-title-block">
          <Image src={iconCheck} className="icon-title" />
          Tiện ích tại nha khoa:
        </div>
        <div className="wp-tag-block">
          {detailClinic?.tag_clinic.map((item) => {
            backgroundColor =
              listColor[Math.floor(Math.random() * listColor.length)];
            return (
              <div
                className="common-tag"
                key={item.tag.name}
                style={{ background: backgroundColor }}
              >
                {item.tag.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
