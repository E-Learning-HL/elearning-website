"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import defaultImage from "@/public/image/default-image-square.png";
import { PREFIX_IMAGE_URL } from "@/src/const/const";

export default function ImageCommon({ data, style, width, height }) {
  const [image, setImage] = useState(data);
  return width ? (
    <Image
      unoptimized
      fill={true}
      // src={image ? `${PREFIX_IMAGE_URL}${image.key}` : defaultImage}
      src={image ? image : defaultImage}
      className={style}
      onError={() => {
        setImage(null);
      }}
      alt={image?.key}
    />
  ) : (
    <Image
      unoptimized
      fill={true}
      // src={image ? `${PREFIX_IMAGE_URL}${image.key}` : defaultImage}
      src={image ? image : defaultImage}
      className={style}
      onError={() => {
        setImage(null);
      }}
      width={width}
      height={height}
      alt={image?.key}
    />
  );
}
