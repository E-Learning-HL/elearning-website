"use client";
import Image from "next/image";
import { Col, Row, Skeleton } from "antd";
import Link from "next/link";
import "@/src/style/feature.css";

export default function Feature() {
  const MARKER_FEATURE = [
    {
      name: "ROADMAP",
      subText: "Lộ trình học hiệu quả",
      image: require("@/public/icon/graduation.svg"),
      link: "",
      // thuc tap
      // link: "/build-roadmap",
    },
    {
      name: "IELTS",
      subText: "Làm chủ IELTS với phương pháp tiên tiến",
      image: require("@/public/icon/school.svg"),
      link: "/course",
    },
    {
      name: "TOEIC",
      subText: "Sự chuẩn bị toàn diện cho kỳ thi TOEIC",
      link: "",
    },
  ];

  return (
    <div className="wpFeature">
      <Row
        gutter={[
          { xs: 14, sm: 14, md: 20, xl: 30 },
          { xs: 30, sm: 30, md: 20, xl: 30 },
        ]}
        className={"listFeature"}
      >
        {MARKER_FEATURE.map((item) => (
          <Col xs={24} sm={24} md={8} xl={8}>
            <Link href={item?.link}>
              <div className="itemFeature">
                <div className="itemImage">
                  {item.name === "TOEIC" ? (
                    <div className="coming">SẮP RA MẮT</div>
                  ) : (
                    <Image
                      src={item.image}
                      className="serviceImage"
                      alt="image"
                    ></Image>
                  )}
                </div>
                <div className="itemTitle">
                  <h3>{item.name}</h3>
                  <p>{item.subText}</p>
                </div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}
