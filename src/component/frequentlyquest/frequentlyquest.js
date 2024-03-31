"use client";
import styles from "./frequentlyquest.module.scss";
import { Collapse } from "antd";
import "@/src/style/frequentlyquest.css";
import iconArrow from "@/public/icon/icon-arrow.svg";
import Image from "next/image";
const { Panel } = Collapse;

const Frequentlyquest = () => (
  <div className={styles.wpFrequentlyquest}>
    <div className={styles.wpFrequentlyQuestContent}>
      <div className={styles.title}>
        <h2>CÂU HỎI THƯỜNG GẶP</h2>
        <div className={styles.line}></div>
      </div>
      <div className={`${styles.frequentlyquest} frequentlyquest`}>
        <Collapse
          accordion
          expandIcon={({ isActive }) => (
            <div
              style={{
                transform: `rotate(${isActive ? 180 : 0}deg)`,
                display: "flex",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "8px",
              }}
            >
              <Image src={iconArrow} width={24} height={24} alt="icon"/>
            </div>
          )}
        >
          <Panel header={<h3>NhaKhoaHub là gì?</h3>} key="1">
            <p>
              NhaKhoaHub là nền tảng review và tìm kiếm cơ sở nha khoa phù hợp
              theo loại dịch vụ và khu vực.
            </p>
          </Panel>
          <Panel
            header={<h3>NhaKhoaHub có phải phòng khám nha khoa không?</h3>}
            key="2"
          >
            <p>
              NhaKhoaHub không phải là phòng khám nha khoa, chúng tôi kết nối
              khách hàng với cơ sở nha khoa trên toàn quốc.
            </p>
          </Panel>
          <Panel
            header={
              <h3>NhaKhoaHub cung cấp dịch vụ gì? Tại sao nên sử dụng?</h3>
            }
            key="3"
          >
            <p>
              NhaKhoaHub được xây dựng để giúp người dùng tìm kiếm, so sánh và
              lựa chọn các cơ sở nha khoa uy tín, chất lượng. Với hệ thống hàng
              hơn 10.000 cơ sở nha khoa uy tín, khách hàng có thể đưa ra lựa
              chọn phù hợp nhất về dịch vụ, chi phí, thời gian và địa điểm thăm
              khám.
            </p>
          </Panel>
          <Panel header={<h3>Sử dụng NhaKhoaHub có mất phí không?</h3>} key="4">
            <p>
              Không, NhaKhoaHub miễn phí hoàn toàn cho tất cả đối tượng người
              dùng.
            </p>
          </Panel>
          <Panel
            header={
              <h3>
                Liên hệ với phòng khám để nhận tư vấn và đặt lịch trên
                NhaKhoaHub như thế nào?
              </h3>
            }
            key="5"
          >
            <p>
              Bạn thực hiện các bước sau đây: <br />
              Bước 1: Tại trang chủ, tìm kiếm phòng khám nha khoa theo dịch vụ
              hoặc khu vực.
              <br />
              Bước 2: Lựa chọn cơ sở mà bạn mong muốn thăm khám. <br />
              Bước 3: Kết nối trực tiếp với phòng khám để nhận tư vấn hoặc đặt
              lịch tại khung chat của trang chi tiết phòng khám.
            </p>
          </Panel>
        </Collapse>
      </div>
    </div>
  </div>
);

export default Frequentlyquest;
