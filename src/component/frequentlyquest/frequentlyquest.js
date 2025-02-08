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
              <Image src={iconArrow} width={24} height={24} alt="icon" />
            </div>
          )}
        >
          <Panel
            header={<h3>Tôi phải làm gì để bắt đầu học tại S eLearning?</h3>}
            key="1"
          >
            <p>
              Để bắt đầu học tại S eLearning, bạn cần tạo một tài khoản mới
              hoặc đăng nhập vào tài khoản hiện có của mình. Sau đó, bạn có thể
              duyệt qua các khóa học và tài nguyên học tập, chọn khóa học phù
              hợp và đăng ký để bắt đầu học.
            </p>
          </Panel>
          <Panel
            header={<h3>Thời gian học mỗi khóa trong bao lâu?</h3>}
            key="2"
          >
            <p>
              Mỗi khóa học của Edmicro có thời gian sử dụng là 1 năm. Bạn mua
              cùng lúc 2 khóa sẽ được nhận ưu đãi gấp đôi thời hạn sử dụng cho
              cả 2 khóa lên thành 2 năm, 3 khóa là 3 năm và tương tự… <br />
              Nếu mỗi tuần bạn dành từ 8-10h cho việc học, trong khoảng 3-4
              tháng bạn sẽ hoàn thành 1 khóa học, tăng 1 band điểm.
            </p>
          </Panel>
          <Panel
            header={
              <h3>Tôi có thể truy cập các tài nguyên học tập như thế nào?</h3>
            }
            key="3"
          >
            <p>
              Sau khi đăng ký vào một khóa học, bạn có thể truy cập vào các tài
              liệu học tập và tài nguyên qua trang khóa học của mình. Tùy thuộc
              vào nội dung của từng khóa học, các tài nguyên có thể bao gồm bài
              giảng, bài tập, video, bài kiểm tra, và các tài liệu tham khảo.
            </p>
          </Panel>
          <Panel
            header={
              <h3>
                Tôi muốn cải thiện kỹ năng nghe và giao tiếp tiếng Anh của mình.
                S eLearning có khóa học nào phù hợp không?
              </h3>
            }
            key="4"
          >
            <p>
              Có chắc chắn! S eLearning cung cấp một loạt các khóa học tập
              trung vào phát triển kỹ năng nghe và giao tiếp tiếng Anh. Những
              khóa học này bao gồm các bài giảng, bài tập, và hoạt động thực
              hành để giúp bạn cải thiện kỹ năng ngôn ngữ của mình một cách hiệu
              quả.
            </p>
          </Panel>
        </Collapse>
      </div>
    </div>
  </div>
);

export default Frequentlyquest;
