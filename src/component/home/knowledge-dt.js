"use client";
import { Image as ImageAntd } from "antd";
import Image from "next/image";
import { FALLBACK } from "@/src/const/const";
import "@/src/style/knowledge-dt.css";
import righticon from "@/public/icon/icon-right-blue.svg";
import * as NProgress from "nprogress";
import { Row, Col } from "antd";
import Link from "next/link";

export default function KnowledgeDentistry({ knowledgeDentistryData }) {
  return (
    <div className="wp-knowledgeDentistry">
      <div className="title">
        <h2>KIẾN THỨC NHA KHOA</h2>
      </div>
      <div className="line"></div>
      <div className="wp-content">
      <div class="slider">
            <div class="item">
                <h1>Slide 1</h1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum hic iure enim, rem accusamus odit nemo aspernatur consequuntur vero in veniam fugiat, consectetur officiis voluptatum quidem libero. Sed, dignissimos exercitationem, animi a repellendus tempora recusandae qui consequatur, itaque deleniti nobis.
            </div>
            <button id="next">&lt;</button>
            <button id="prev">&gt;</button>
        </div>
      </div>
    </div>
  );
}
