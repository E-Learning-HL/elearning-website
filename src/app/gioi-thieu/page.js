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
          Chào mừng bạn đến với HL eLearning - Nền tảng hàng đầu cho việc học
          tiếng Anh trực tuyến!
          <br />
          <br />
        </p>
        <p className="content">
          HL eLearning là điểm đến đáng tin cậy để nâng cao trình độ tiếng Anh
          của bạn, với các khóa học và tài liệu đa dạng và phong phú, giúp bạn
          có thể học mọi lúc, mọi nơi.
          <br />
          <br />
        </p>
        <p className="title">Tầm nhìn và sứ mệnh</p>
        <p className="content">
          Tầm nhìn của HL eLearning là trở thành nền tảng hàng đầu cung cấp giáo
          trình học tiếng Anh chất lượng cao, phù hợp với mọi đối tượng học
          viên. Chúng tôi mong muốn mang lại cho mọi người cơ hội học tập và
          phát triển bản thân thông qua việc tiếp cận với tiếng Anh một cách dễ
          dàng và hiệu quả.
          <br /> <br />
          Sứ mệnh của chúng tôi là cung cấp những khóa học chất lượng, cập nhật
          theo xu hướng mới nhất, giúp học viên phát triển kỹ năng ngôn ngữ một
          cách toàn diện, từ ngữ pháp đến giao tiếp và viết. Chúng tôi cam kết
          đồng hành cùng học viên trên hành trình học tập và rèn luyện kỹ năng
          tiếng Anh của họ.
          <br />
          <br />
        </p>
        <p className="title">Chất lượng khóa học</p>
        <p className="content">
          Tại HL eLearning, chúng tôi cam kết cung cấp các khóa học tiếng Anh
          chất lượng, được thiết kế bởi đội ngũ giáo viên giàu kinh nghiệm và am
          hiểu về nhu cầu của học viên. Khóa học của chúng tôi không chỉ tập
          trung vào việc truyền đạt kiến thức mà còn đặt emphasis vào việc thực
          hành và áp dụng kiến thức vào các tình huống thực tế.
          <br />
          <br />
        </p>
        <p className="title">Phương pháp học tập linh hoạt</p>
        <p className="content">
          Chúng tôi hiểu rằng mỗi học viên có nhu cầu và phong cách học tập
          riêng biệt, vì vậy chúng tôi cung cấp các tùy chọn học linh hoạt, từ
          khóa học tự học đến các lớp học trực tuyến với giáo viên hướng dẫn
          trực tiếp. Điều này giúp học viên có thể tự chủ và linh hoạt trong
          việc lập kế hoạch học tập của mình.
          <br />
          <br />
        </p>
        <p className="title">Hỗ trợ và đội ngũ giáo viên</p>
        <p className="content">
          Đội ngũ giáo viên của chúng tôi không chỉ có kinh nghiệm trong việc
          giảng dạy mà còn mang đến sự tận tâm và nhiệt huyết trong việc hỗ trợ
          học viên. Chúng tôi luôn sẵn lòng lắng nghe và giúp đỡ học viên vượt
          qua mọi khó khăn trong quá trình học tập.
          <br />
          Với HL eLearning, việc học tiếng Anh trực tuyến trở nên dễ dàng và
          hiệu quả hơn bao giờ hết. Hãy tham gia cùng chúng tôi để trải nghiệm
          những khóa học chất lượng và độc đáo, và khám phá tiềm năng tiếng Anh
          của bạn!
          <br />
          <br />
        </p>
        <p className="title">Đại học Xây Dựng Hà Nội</p>
        <ul class="info">
          <li>
            <p>
              <strong>Đồ án tốt nghiệp</strong>
            </p>
          </li>
          <li>
            <p>
              <strong>Người thực hiện: Nguyễn Tuấn Hưng</strong>
            </p>
          </li>
          <li>
            <p>
              <strong>Đồng thực hiện: Vũ Duy Linh</strong>
            </p>
          </li>
          <li>
            <p>
              <strong>Email: hung88765@huce.edu.vn</strong>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
