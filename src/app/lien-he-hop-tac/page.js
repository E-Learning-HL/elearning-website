import "@/src/style/lien-he-hop-tac.css";
import RegistrationClinic from "@/src/component/home/registration-clinic";
import { isObjectEmpty } from "@/src/util/util";

export async function generateMetadata({ params, searchParams }) {
  return {
    title: "Liên hệ hợp tác | NhaKhoaHub",
    description:
      "NhaKhoaHub hân hạnh được hợp tác với các cơ sở nha khoa uy tín và chuyên nghiệp. Chúng tôi tin rằng sự hợp tác này sẽ mang lại lợi ích tốt cho chúng ta và khách hàng.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/lien-he-hop-tac`,
    },
  };
}

export default function Contact() {
  return (
    <div className="wpContact">
      <div className="contact">
        <p>
          NhaKhoaHub rất hân hạnh được hợp tác với các cơ sở nha khoa uy tín và
          chuyên nghiệp. Chúng tôi tin rằng sự hợp tác này sẽ mang lại lợi ích
          tốt cho cả chúng ta và người dùng. <br /> <br />
          NhaKhoaHub tập trung vào đánh giá và tìm kiếm các cơ sở nha khoa chất
          lượng cao, và chúng tôi đang tìm những đối tác đáng tin cậy để cung
          cấp trải nghiệm tốt nhất cho khách hàng.
          <br /> <br /> Nếu bạn quan tâm đến việc hợp tác cùng NhaKhoaHub, hãy
          liên hệ ngay theo thông tin dưới đây: <br /> <br />
          Thông tin liên hệ hợp tác:
          <br /> <br />
        </p>
        <ul class="info">
          <li>
            <p>
              <strong>Công ty TNHH Fenik Technologies</strong>
            </p>
          </li>
          <li>
            <p>
              Địa chỉ: Số 104, ngõ 54 Lê Quang Đạo, Mễ Trì, Nam Từ Liêm, Hà Nội
            </p>
          </li>
          <li>
            <p>Hotline: 0961 423 199</p>
          </li>
          <li>
            <p>Email: nhakhoahub@fenik-technologies.com</p>
          </li>
          <li>
            <p>Fanpage: facebook.com/nhakhoahub.vn</p>
          </li>
          <li>
            <p>Giờ làm việc: 09:00 - 18:00</p>
          </li>
        </ul>
        <RegistrationClinic isStaticPage={true} />
      </div>
    </div>
  );
}
