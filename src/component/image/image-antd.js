"use client";
import React, { useEffect, useState } from "react";
import { FALLBACK } from "@/src/const/const";
import defaultImage from "@/public/image/default-image-square.png";
import Image from "next/image";
import { Image as ImageAntd } from "antd";
export default function ImageAntdCommon({ data, className, width, height }) {
  const [image, setImage] = useState(data);
  return (
    <>
      {image ? (
        <ImageAntd
          src={image ? image.toString() : "false"}
          className={className}
          onError={() => {
            setImage(null);
          }}
          fallback={FALLBACK}
          alt={image}
          preview={false}
        />
      ) : (
        <Image
          unoptimized
          // fill={true}
          src={defaultImage}
          className={className}
          alt={image}
        />
      )}
    </>
  );
}
