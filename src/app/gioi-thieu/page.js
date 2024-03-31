import "@/src/style/gioi-thieu.css";
export async function generateMetadata({ params, searchParams }) {
  return {
    title: "Giới thiệu | NhaKhoaHub",
    description:
      "NhaKhoaHub là cầu nối đáng tin cậy giữa người dùng và cơ sở nha khoa chất lượng, cho phép bạn tìm kiếm các phòng khám nha khoa phù hợp theo nhu cầu của bạn.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/gioi-thieu`,
    },
  };
}

export default function Introduce() {
  return (
    <div className="wpIntroduce">
      <div className="introduce">
        <p className="title">
          Chào mừng đến với NhaKhoaHub - Nền tảng review và tìm kiếm các cơ sở
          nha khoa uy tín và phù hợp hàng đầu tại Việt Nam!
          <br />
          <br />
        </p>
        <p className="content">
          NhaKhoaHub là cầu nối đáng tin cậy giữa người dùng và các cơ sở nha
          khoa chất lượng, cung cấp công cụ cho phép bạn tìm kiếm các cơ sở nha
          khoa theo vị trí địa lý, loại dịch vụ, độ phổ biến và đánh giá từ
          người dùng, giúp bạn so sánh và chọn lựa dịch vụ nha khoa phù hợp nhất
          với mình.
          <br />
          <br />
        </p>
        <p className="title">Tầm nhìn và sứ mệnh</p>
        <p className="content">
          Tầm nhìn của NhaKhoaHub là trở thành một nền tảng hàng đầu cung cấp
          thông tin chính xác và chi tiết về các cơ sở nha khoa đồng thời tạo ra
          một cộng đồng, nơi mọi người có thể dễ dàng tìm kiếm và đánh giá các
          cơ sở nha khoa chất lượng, giúp họ lựa chọn phù hợp nhất với nhu cầu
          cá nhân.
          <br /> <br />
          Với sứ mệnh cung cấp thông tin chính xác và hữu ích, đồng thời tạo
          điều kiện thuận lợi để mọi người dùng có trải nghiệm chăm sóc răng
          miệng tốt nhất. NhaKhoaHub không ngừng nâng cao chất lượng phục vụ với
          các tiện ích dưới đây:
          <br />
          <br />
        </p>
        <p className="title">Tìm kiếm nhanh chóng và tiện lợi</p>
        <p className="content">
          Với cơ sở dữ liệu lớn, bạn có thể dễ dàng tìm kiếm các cơ sở nha khoa
          phù hợp với vị trí, loại dịch vụ, đánh giá từ người dùng và nhiều tiêu
          chí khác. Điều này giúp bạn tiết kiệm thời gian và tìm được địa chỉ
          nha khoa lý tưởng chỉ trong vài giây.
          <br />
          <br />
        </p>
        <p className="title">Đa dạng dịch vụ nha khoa</p>
        <p className="content">
          NhaKhoaHub không chỉ là nơi để bạn tìm kiếm các cơ sở nha khoa thông
          thường. Chúng tôi cung cấp thông tin hữu ích về nhiều loại dịch vụ nha
          khoa khác nhau, từ chăm sóc răng miệng thông thường đến các dịch vụ
          tiên tiến như chỉnh nha, trồng răng Implant, làm trắng răng và nhiều
          hơn nữa. Điều này giúp bạn dễ dàng tìm ra cơ sở phù hợp với nhu cầu
          riêng của mình.
          <br />
          <br />
        </p>
        <p className="title">Nhận xét và đánh giá chân thực</p>
        <p className="content">
          NhaKhoaHub khuyến khích cộng đồng người dùng đóng góp ý kiến thông qua
          việc đánh giá và nhận xét về các trải nghiệm cá nhân tại các cơ sở nha
          khoa. Điều này giúp chúng tôi xây dựng một nguồn thông tin đa dạng và
          chính xác, đồng thời giúp bạn có cái nhìn tổng quan và đánh giá chất
          lượng dịch vụ để đưa ra quyết định đúng đắn nhất.
          <br />
          <br />
        </p>
        <p className="title">Chất lượng và uy tín</p>
        <p className="content">
          Chất lượng và uy tín là yếu tố hàng đầu mà chúng tôi luôn đặt lên hàng
          đầu. Chúng tôi cam kết cung cấp thông tin chính xác và minh bạch về
          các phòng khám nha khoa giúp người dùng yên tâm khi lựa chọn dịch vụ
          phù hợp. Sứ mệnh của NhaKhoaHub không chỉ là tạo ra một cộng đồng
          review mà còn làm nền tảng đáng tin cậy cho quyết định về sức khỏe nha
          khoa của bạn.
          <br />
          <br />
        </p>
        <p className="title">Hỗ trợ tận tâm</p>
        <p className="content">
          Chúng tôi luôn lắng nghe và đáp ứng mọi nhu cầu của người dùng. Nếu
          bạn có bất kỳ thắc mắc hay cần hỗ trợ, đội ngũ chăm sóc khách hàng của
          NhaKhoaHub luôn sẵn lòng hỗ trợ bạn trong quá trình tìm kiếm và chọn
          lựa cơ sở nha khoa.
          <br />
          <br /> Với NhaKhoaHub, việc tìm kiếm một phòng khám nha khoa chất
          lượng, uy tín không còn là một thách thức. Chúng tôi cam kết cung cấp
          cho bạn một trải nghiệm tìm kiếm nha khoa nhanh chóng, dễ dàng, tin
          cậy và đầy đủ thông tin nhất. Hãy để NhaKhoaHub đồng hành cùng bạn
          trong hành trình chăm sóc và duy trì sức khỏe răng miệng.
          <br />
          <br /> Hy vọng rằng thông tin trên sẽ giúp bạn hiểu rõ hơn về
          NhaKhoaHub. Nếu có thắc mắc, vui lòng liên hệ theo thông tin dưới đây:
          <br />
          <br />
        </p>
        <p className="title">Công ty TNHH Fenik Technologies</p>
        <ul class="info">
          <li>
            <p>
              <strong>Công ty TNHH Fenik Technologies</strong>
            </p>
          </li>
          <li>
            <p>Mã số thuế: 0109872256</p>
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
      </div>
    </div>
  );
}
