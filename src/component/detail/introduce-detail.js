import styles from "@/src/app/phong-kham/[slug]/page.module.scss";
import React, { useState, useRef, useEffect } from "react";
import Parser from "html-react-parser";
import iconShowContent from "@/public/icon/icon-show-content.svg";
import Image from "next/image";

export default function IntroduceDetail({ content }) {
  const [show, setShow] = useState(true);
  const [divHeight, setDivHeight] = useState(0);
  const divRef = useRef(null);
  const contentStyle = {
    height: !show && divHeight > 380 ? "380px" : "auto", //`${divHeight}.px`,
    transition: "height 0.3s ease-in-out",
  };

  useEffect(() => {
    if (divRef.current) {
      setDivHeight(divRef.current.clientHeight);
      if (divHeight > 380) {
        setShow(false);
      }
    }
  }, [divHeight]);

  return (
    <div className="wp-introduce">
      {!show && (
        <button class="btn_toggle_content" onClick={() => setShow(!show)}>
          <Image src={iconShowContent}></Image>
        </button>
      )}
      {content && (
        <div class="content" style={contentStyle} ref={divRef}>
          {Parser(content)}
        </div>
      )}
    </div>
  );
}
