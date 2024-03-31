import "@/src/style/dieu-khoan.css";

export async function generateMetadata({ params, searchParams }) {
  return {
    title: "Điều khoản sử dụng | NhaKhoaHub",
    description:
      "Mời bạn vui lòng đọc kỹ các quy định sử dụng website dưới đây trước khi quyết định sử dụng thông tin, dịch vụ của chúng tôi.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/dieu-khoan`,
    },
  };
}

export default function Policy() {
  return (
    <div className="wpPolicy">
      <div className="policy">
        <p className="content">
          Mời bạn vui lòng đọc kỹ các quy định sử dụng website dưới đây trước
          khi quyết định sử dụng thông tin, dịch vụ của chúng tôi.
          <br />
          <br />
        </p>
        <p className="title">Quy định chung về thông tin website</p>
        <p className="content">
          Trên trang web NhaKhoaHub.vn, mọi nội dung liên quan đến y tế, sức
          khỏe chỉ mang tính chất tham khảo. Người dùng chịu trách nhiệm khi lựa
          chọn cơ sở nha khoa dựa trên nhiều yếu tố khác nhau như vị trí, chuyên
          môn, kinh nghiệm hoặc đánh giá từ người dùng khác.
          <br />
          <br /> NhaKhoaHub xác nhận rằng tất cả các cơ sở nha khoa đều có giấy
          phép, chứng nhận hoặc đăng ký hoạt động theo yêu cầu của pháp luật.
          NhaKhoaHub cũng có quyền loại trừ cơ sở nha khoa khỏi nền tảng nếu có
          hành vi vi phạm pháp luật và nha khoa này này sẽ tự chịu trách nhiệm
          trước pháp luật. <br />
          <br />
          NhaKhoaHub cung cấp danh sách cơ sở nha khoa dựa trên nhu cầu người
          dùng như loại dịch vụ, chi phí, khu vực, thời gian cùng với số điểm
          đánh giá khi trải nghiệm thực tế của khách hàng. <br />
          <br />
          Người dùng chịu trách nhiệm về thông tin gửi đi và không được tạo bất
          kỳ rắc rối nào cho NhaKhoaHub hoặc người dùng khác. Vi phạm quy định
          có thể dẫn đến hủy bỏ quyền sử dụng trang web và có thể chịu trách
          nhiệm trước pháp luật.
          <br />
          <br />
        </p>
        <p className="title">Quyền thu thập và sử dụng thông tin</p>
        <p className="content">
          NhaKhoaHub thu thập và lưu trữ thông tin khi bạn truy cập và sử dụng
          trang web, bao gồm dữ liệu thống kê truy cập và thông tin cá nhân bạn
          cung cấp khi đăng ký hoặc sử dụng dịch vụ. Các thông tin cá nhân như
          tên, số điện thoại, email, địa chỉ sẽ được mã hóa để bảo vệ quyền
          riêng tư.
          <br />
          <br /> Chúng tôi có thể sử dụng thông tin này cho mục đích nghiên cứu,
          thiết kế dịch vụ và tuân thủ theo yêu cầu của pháp luật. Khi đăng ký,
          các thành viên đồng ý chia sẻ một số thông tin cá nhân để thuận tiện
          trong việc lưu trữ và nhận dạng hồ sơ.
          <br />
          <br />
        </p>
        <p className="title">Đăng ký sử dụng và đăng nhập tài khoản</p>
        <p className="content">
          Khi đăng ký sử dụng tài khoản trên NhaKhoaHub, bạn cần cung các thông
          tin cá nhân chính xác, đầy đủ và mới nhất.
          <br />
          <br /> Sau khi đăng ký, bạn chịu trách nhiệm bảo quản mật khẩu, không
          cho phép bất cứ người nào sử dụng vào bất cứ mục đích nào. NhaKhoaHub
          coi việc truy cập bằng tên và mật khẩu của bạn là việc của bạn, dù
          được sử dụng bởi người khác.
          <br />
          <br /> Đăng nhập có thể sử dụng email hoặc số điện thoại, mật khẩu
          hoặc mã OTP. Nếu mật khẩu bị tiết lộ, bạn cần thay đổi ngay và thông
          báo cho chúng tôi.
          <br />
          <br />
        </p>
        <p className="title">Tuyên bố từ chối</p>
        <p className="content">
          Tất cả thông tin khi đăng ký tài khoản trên NhaKhoaHub cần phải chính
          xác và đầy đủ. Bạn phải bảo mật mật khẩu và không chia sẻ với người
          khác. NhaKhoaHub coi việc truy cập bằng tên và mật khẩu của bạn là
          việc của bạn, dù được sử dụng bởi người khác.
          <br />
          <br /> NhaKhoaHub không đảm bảo tuyệt đối an ninh trang web trước các
          hành động phá hoại từ Internet. Chúng tôi cố gắng cung cấp thông tin
          chính xác nhưng không đảm bảo về chất lượng hoặc chính xác của thông
          tin.
          <br />
          <br /> Chúng tôi có thể cập nhật thông tin mà không cần báo trước.
          NhaKhoaHub không chịu trách nhiệm về mất mát, thiệt hại, hoặc thông
          tin không chính xác từ việc sử dụng website này. <br />
          <br />
          Việc sử dụng thông tin trên trang web là rủi ro của người dùng.
          NhaKhoaHub không chịu trách nhiệm về thiệt hại trực tiếp, gián tiếp,
          ngẫu nhiên từ việc sử dụng thông tin trên trang web.
          <br />
          <br /> Các liên kết bên ngoài dẫn đến trang web không thuộc sở hữu của
          chúng tôi và chúng tôi không chịu trách nhiệm về thông tin hoặc lỗi
          trên những trang đó
          <br />
          <br />
        </p>
        <p className="title">Quy định về hành động không được phép</p>
        <ul>
          <li>
            <p>
              Bạn không có quyền xâm phạm, truy cập, hoặc sử dụng máy chủ hoặc
              dữ liệu của chúng tôi nếu không được phép.{" "}
            </p>
          </li>
          <li>
            <p>
              Cấm hạn chế hoặc ngăn cản người dùng khác sử dụng tiện ích trên
              NhaKhoaHub.
            </p>
          </li>
          <li>
            <p>
              Không gửi hoặc truyền thông tin xúc phạm, khiêu dâm, đe dọa hoặc
              vi phạm luật pháp.
            </p>
          </li>
          <li>
            <p>Tin nhắn quảng cáo, thư rác không được chấp nhận.</p>
          </li>
          <li>
            <p>
              Không sử dụng, truyền bất kỳ thông tin không thuộc quyền sở hữu
              hoặc chứa virus.
            </p>
          </li>
          <li>
            <p>
              Cấm sử dụng thông tin từ NhaKhoaHub với mục đích thương mại mà
              không có sự đồng ý bằng văn bản.
            </p>
          </li>
          <li>
            <p>
              Chúng tôi có toàn quyền từ chối hoặc cấm truy cập vào trang web
              NhaKhoaHub nếu bạn vi phạm điều khoản hoặc chúng tôi xác định là
              cần thiết.
            </p>
          </li>
          <li>
            <p>
              Bạn chịu trách nhiệm pháp lý, chi phí và tổn thất nếu vi phạm điều
              khoản của NhaKhoaHub.
            </p>
          </li>
        </ul>
        <br />
        <p className="title">Quyền sở hữu trí tuệ</p>
        <p className="content">
          Quyền sở hữu trí tuệ trên website thuộc về Công ty TNHH Fenik
          Technologies, không được phép sao chép hoặc sử dụng mà không có sự cho
          phép bằng văn bản. <br />
          <br />
          Chúng tôi quyết định quyền hiển thị nội dung trên website và chúng tôi
          có toàn quyền quyết định việc sử dụng thông tin của bạn theo đúng quy
          tắc và an ninh quốc gia.
          <br />
          <br /> Tất cả các quyền về nội dung và dịch vụ trên trang web được
          kiểm soát và chỉ có thể được sử dụng khi có sự cho phép bằng văn bản
          từ chúng tôi.
          <br />
          <br /> Bạn đồng ý để chúng tôi tự do sử dụng, đề xuất, gợi ý, bình
          luận hoặc hình thức thông báo nào khác mà bạn cung cấp cho chúng tôi
          có liên quan tới NhaKhoaHub một cách hoàn toàn miễn phí...
          <br />
          <br />
        </p>
        <p className="title">Thông báo về quyền tác giả</p>
        <p className="content">
          Nếu bạn cho rằng quyền sở hữu của bạn đã bị sử dụng theo những cách
          thức vi phạm quyền tác giả trên NhaKhoaHub, bạn có thể liên hệ với
          nhân viên phụ trách vấn đề bản quyền của chúng tôi tại địa chỉ:
          contact@nhakhoahub.vn hoặc hotline 0961.454.228
          <br />
          <br />
          Bất kỳ tranh chấp nào liên quan đến việc sử dụng website và dịch vụ
          của chúng tôi sẽ được giải quyết theo Luật pháp Việt Nam. Khi đăng ký
          hoặc sử dụng, bạn tự đồng ý tuân theo quy định của Luật pháp.
          <br />
          <br />
        </p>
        <p className="title">Điều kiện hợp pháp</p>
        <p className="content">
          Để sử dụng rang web, bạn phải đủ 18 tuổi hoặc tuổi hợp pháp để ký kết
          các hợp đồng pháp lý. Người giám hộ của trẻ em dưới 18 tuổi có thể sử
          dụng trang web thay mặt cho trẻ. Khi thực hiện điều này, bạn xác nhận
          mình là người giám hộ và tất cả các quy định Điều khoản sử dụng áp
          dụng cho bạn trong vai trò người đại diện hoặc được ủy quyền bởi cá
          nhân đó. Nếu bạn không đáp ứng các tiêu chuẩn của Điều khoản này, vui
          lòng không sử dụng trang web. Bạn cũng cam kết rằng bạn có đầy đủ
          quyền lực và năng lực để tham gia vào Điều khoản này khi sử dụng trang
          web.
          <br />
          <br />
        </p>
      </div>
    </div>
  );
}
