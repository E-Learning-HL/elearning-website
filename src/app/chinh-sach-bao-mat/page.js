import "@/src/style/chinh-sach-bao-mat.css";
import { isObjectEmpty } from "@/src/util/util";
export async function generateMetadata({ params, searchParams }) {
  return {
    title: "Chính sách bảo mật | NhaKhoaHub",
    description:
      "Bạn đang truy cập vào website NhaKhoaHub.vn, chúng tôi xin thông báo về chính sách bảo mật liên quan trực tiếp đến thông tin cá nhân của bạn.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/chinh-sach-bao-mat`,
    },
  };
}
export default function Privacy() {
  return (
    <div className="wpPrivacy">
      <div className="privacy">
        <p className="content">
          Bạn đang truy cập vào website NhaKhoaHub.vn, chúng tôi xin thông báo
          về chính sách bảo mật liên quan trực tiếp đến thông tin cá nhân của
          bạn.
          <br />
          <br />
        </p>
        <p className="title">Thu thập thông tin cá nhân</p>
        <p className="content">
          Thông tin cá nhân được thu thập khi bạn truy cập vào NhaKhoaHub.vn,
          bao gồm địa chỉ IP của bạn. Chúng tôi sử dụng cookie để lưu trữ dữ
          liệu server của website gửi đến trình duyệt của bạn, giúp chúng tôi
          hiểu nhu cầu và mong muốn của người đọc khi sử dụng trang web. <br />
          <br />
          Để có quyền truy cập và cập nhật thông tin, cũng như để đăng bình luận
          trên trang web, bạn cần đăng ký thông tin cá nhân của mình. Đồng thời,
          bạn cũng có thể cung cấp thêm thông tin cá nhân để nhận tư vấn từ các
          chuyên gia của NhaKhoaHub. Mục đích của việc thu thập thông tin khách
          hàng bao gồm giới thiệu dịch vụ, hỗ trợ tư vấn và chia sẻ thông tin
          trong cộng đồng. <br />
          <br />
          Thông tin được lưu trữ tại server của NhaKhoaHub sẽ bị xóa khi nhận
          được yêu cầu hủy bỏ hoặc lệnh xóa từ chủ sở hữu tài khoản.
          <br />
          <br />
        </p>
        <p className="title">Đối tượng có thể sử dụng thông tin bảo mật</p>
        <p className="content">
          Đối tượng được ủy quyền sử dụng thông tin bảo mật của chúng tôi bao
          gồm:
        </p>
        <ul>
          <li>
            <p>Bộ phận chăm sóc, hỗ trợ khách hàng của NhaKhoaHub.</p>
          </li>
          <li>
            <p>Đối tác của NhaKhoaHub.</p>
          </li>
          <li>
            <p>
              Các cá nhân, tổ chức hoặc bên thứ ba uy tín nhận được chúng tôi
              chuyển giao tài sản hoặc tham gia hoạt động kinh doanh.
            </p>
          </li>
          <li>
            <p>
              NhaKhoaHub có trách nhiệm cung cấp thông tin theo yêu cầu từ các
              cơ quan như chính quyền, cơ quan tư pháp như Viện kiểm sát, tòa án
              và các ban ngành liên quan.
            </p>
          </li>
        </ul>
        <br />
        <p className="title">Cam kết bảo mật thông tin</p>
        <p className="content">
          Chúng tôi cam kết bảo mật thông tin người dùng khi nhận thông tin cá
          nhân, sử dụng nó chỉ với mục đích đem lại lợi ích cho người dùng.
          <br />
          <br /> Mặc dù chúng tôi nỗ lực bảo mật thông tin người dùng, tuy
          nhiên, không thể đảm bảo 100% an toàn trên internet. Do đó, chúng tôi
          không chắc chắn về việc thông tin người dùng được bảo mật tuyệt đối.
          Chúng tôi không chịu trách nhiệm nếu thông tin bị rò rỉ từ hệ thống
          của chúng tôi.
          <br />
          <br />
          Website của chúng tôi có thể liên kết với các trang web khác nằm ngoài
          quyền quản lý của chúng tôi, vì vậy, chúng tôi không chịu trách nhiệm
          về thông tin cá nhân mà người dùng cung cấp khi truy cập vào các trang
          web đó. <br />
          <br />
          Người dùng được khuyến cáo không cung cấp thông tin cá nhân nếu không
          đồng ý với các điều khoản của chúng tôi. Hơn nữa, chúng tôi khuyến
          nghị không tiết lộ chi tiết thông tin thanh toán cho bất kỳ ai. Chúng
          tôi không chịu trách nhiệm về rủi ro giao dịch thông tin qua email
          hoặc internet. <br />
          <br />
          Chúng tôi cũng cảnh báo người dùng không được can thiệp hoặc thay đổi
          cấu trúc dữ liệu của website hoặc thực hiện các hoạt động phá hoại hệ
          thống. Mọi vi phạm sẽ bị tước quyền lợi và xử lý theo luật pháp nếu
          cần thiết.
          <br />
          <br />
        </p>
        <p className="title">Quy định sử dụng cookie</p>
        <p className="content">
          Trang web có thể sử dụng cookie và công nghệ theo dõi người dùng, tuỳ
          thuộc vào các tính năng được cung cấp. Cookie sẽ nhận diện và lưu trữ
          thông tin về hoạt động duyệt web của bạn, được lưu trữ bởi trình duyệt
          internet trên ổ cứng máy tính của bạn.
          <br />
          <br /> Nếu trình duyệt bạn đang sử dụng đã được thiết lập không cho
          phép cookie, điều này có thể ảnh hưởng đến trải nghiệm của bạn khi
          truy cập web. Vì vậy, người dùng hãy chấp nhận rằng cookie không chứa
          thông tin riêng tư và được bảo vệ khỏi virus.
          <br />
          <br /> Thông tin từ cookie sẽ được lưu trữ bởi Google và được sử dụng
          để cải thiện dịch vụ liên quan đến hoạt động internet và việc sử dụng
          internet mà bạn quan tâm. <br />
          <br />
          Chúng tôi có thể kết hợp thông tin cá nhân của người dùng mà chúng tôi
          lưu trữ với dữ liệu từ bên thứ ba để hỗ trợ hoạt động nghiên cứu và đo
          lường hiệu suất nội dung, hiệu quả của quảng cáo trên trang web.
          <br />
          <br /> Mặc dù chúng tôi có thể sử dụng thông tin đã tổng hợp, nhưng
          không thể sử dụng nó để xác định người dùng cá nhân đã truy cập trang
          web.
          <br />
          <br />
        </p>
        <p className="title">Tuân thủ quy định pháp luật</p>
        <p className="content">
          Thông tin khách hàng có thể được chia sẻ với bên thứ ba nếu cần thiết
          để thực thi điều khoản chúng tôi đề ra, điều tra vi phạm, hoặc bảo vệ
          thương hiệu và tài sản của NhaKhoaHub.
          <br />
          <br /> Chính sách bảo mật của chúng tôi có thể được điều chỉnh để bảo
          vệ hệ thống và lợi ích của khách hàng. Các cập nhật sẽ không được
          thông báo trước, vì vậy khi truy cập trang web, vui lòng xem lại chính
          sách bảo mật để cập nhật thông tin. Cảm ơn bạn đã đọc và theo dõi
          NhaKhoaHub.
        </p>
      </div>
    </div>
  );
}
