import { parseSlug, getParseSlug } from "./service";
import SearchResult from "../tim-nha-khoa/page";
import NotFound from "../not-found/page";
import moment from "moment";
import { LIST_REDIRECT } from "@/src/const/list-redirect";
import { redirect } from "next/navigation";

export async function generateMetadata({ params, searchParams }) {
  const dataParseSlug = await parseSlug(params.slug);
  if (
    dataParseSlug?.category_service &&
    !dataParseSlug?.province_id &&
    !dataParseSlug?.district_id
  ) {
    const result = {
      title:
        "Top nha khoa " +
        dataParseSlug.category_service_name.toLowerCase() +
        " uy tín tốt nhất tháng " +
        moment().format("MM/YYYY"),
    };
    if (dataParseSlug.category_service_name == "Nhổ răng") {
      result.description =
        "Dịch vụ nhổ răng chuyên nghiệp, an toàn, và tiện lợi. Đội ngũ bác sĩ giàu kinh nghiệm, sẵn sàng phục vụ bạn mọi lúc, mọi nơi. Liên hệ nha khoa để được tư vấn miễn phí.";
    } else if (dataParseSlug.category_service_name == "Khám răng miệng") {
      result.description =
        "Khám răng miệng định kỳ để bảo vệ sức khỏe của bạn. Danh sách nha khoa cung cấp dịch vụ chăm sóc răng miệng toàn diện với đội ngũ bác sĩ giàu kinh nghiệm. Đặt lịch ngay!";
    } else if (dataParseSlug.category_service_name == "Điều trị tủy") {
      result.description =
        "Điều trị tủy giúp thoát khỏi cơn đau nhức, khó chịu và bảo tồn cấu trúc răng một cách tốt nhất. Giải pháp này không gây đau đớn quá nhiều. Hãy chọn nha khoa tốt để điều trị!";
    } else if (dataParseSlug.category_service_name == "Điều trị cười hở lợi") {
      result.description =
        "Điều trị cười hở lợi sẽ giúp phần nướu lộ diện ít hoặc rất ít khi cười, giúp cân đối giữa các bộ phận môi, răng, lợi mang lại nụ cười thẩm mỹ hơn. Điều trị ngay để có nụ cười hoàn hảo.";
    } else if (dataParseSlug.category_service_name == "Chụp X-Quang răng") {
      result.description =
        "Chụp X-quang nha khoa là phương pháp hiện đại giúp bác sĩ chẩn đoán nhanh và chính xác các bệnh về răng miệng như mọc răng khôn, răng bị sâu, bệnh nha chu hoặc các vấn đề khác";
    } else if (dataParseSlug.category_service_name == "Niềng răng") {
      result.description =
        "Niềng răng giúp điều chỉnh những chiếc răng mọc lệch lạc, hô móm và khấp khểnh để bạn có thể tự tin hơn trong giao tiếp. Hãy lựa chọn niềng răng tại các nha khoa uy tín!";
    } else if (dataParseSlug.category_service_name == "Trồng răng Implant") {
      result.description =
        "Trồng răng Implant giúp bạn phục hình các răng đã mất, nhanh chóng sở hữu được một hàm răng bền chắc như răng thật. Danh sách cơ sở nha khoa chuyên nghiệp, uy tín cho bạn lựa chọn";
    } else if (dataParseSlug.category_service_name == "Điều trị viêm nướu") {
      result.description =
        "Viêm nướu là bệnh lý viêm nhiễm các mô mềm quanh răng, dẫn đến sưng tấy, chảy máu và đau nhức. Nếu không được chữa trị kịp thời, nó có thể bị viêm nha chu và dẫn đến mất răng.";
    } else if (dataParseSlug.category_service_name == "Đính đá") {
      result.description =
        "Đính đá lên răng là một xu hướng thẩm mỹ đang được giới trẻ ưa chuộng. Bằng cách gắn viên đá kim cương lấp lánh lên răng, tạo nên vẻ sang trọng và quý phái.";
    } else if (
      dataParseSlug.category_service_name == "Phục hình răng cố định"
    ) {
      result.description =
        "Phục hình răng cố định giúp tái tạo lại cấu trúc răng đã bị mất như trám răng, bọc sứ, cầu răng và cấy ghép implant để khôi phục lại chức năng và hình thái tự nhiên của răng. ";
    } else if (dataParseSlug.category_service_name == "Lấy cao răng") {
      result.description =
        "Lấy cao răng (cạo vôi răng) giúp loại bỏ mảng bám và cao răng từ bề mặt răng và dưới nướu.Cải thiện thẩm mỹ cho hàm răng để bảo vệ sức khỏe răng miệng.";
    } else if (dataParseSlug.category_service_name == "Đánh bóng răng") {
      result.description =
        "Đánh bóng răng giúp cho răng trở nên bóng đẹp hơn và mang lại hơi thở thơm mát và nụ cười tỏa sáng. Duy trì thói quen chăm sóc răng miệng để nụ cười luôn rạng ngời.";
    } else if (dataParseSlug.category_service_name == "Răng giả tháo lắp") {
      result.description =
        "Hàm răng giả tháo lắp phù hợp khi mất răng quá nhiều, xương bị tiêu, kinh phí điều trị hạn hẹp, giúp bệnh nhân khôi phục được chức năng ăn nhai mà không cần can thiệp quá nhiều";
    } else if (dataParseSlug.category_service_name == "Bọc răng sứ") {
      result.description =
        "Bọc răng sứ giúp cải thiện khiếm khuyết của răng bằng cách sử dụng mão răng làm bằng sứ. Đảm bảo chức năng ăn nhai tốt cùng hàm răng đều đẹp, trắng sáng tự nhiên.";
    } else if (dataParseSlug.category_service_name == "Dán răng sứ") {
      result.description =
        "Dán răng sứ là dùng lớp phôi sứ mỏng gắn lên răng thật để khôi phục tình trạng răng bị sứt mẻ, nhiễm màu. Bảo tồn mô răng tối đa, hiệu quả về mặt thẩm mỹ và chức năng ăn nhai.";
    } else if (dataParseSlug.category_service_name == "Nhổ răng khôn") {
      result.description =
        "Nhổ răng khôn cần được thực hiện từ sớm tránh gây đau nhức và ảnh hưởng đến các răng lân cận. Việc nhổ răng khôn cần phải được thực hiện tại nha khoa uy tín.";
    } else if (dataParseSlug.category_service_name == "Trám răng") {
      result.description =
        "Trám răng là kỹ thuật sử dụng vật liệu nhân tạo lấp vào mô răng bị thiếu do sâu răng, sứt mẻ răng để khôi phục chức năng ban đầu và cải thiện thẩm mỹ cho răng";
    } else if (dataParseSlug.category_service_name == "Tẩy trắng răng") {
      result.description =
        "Phương pháp tẩy trắng răng là tối ưu nhất cho những trường hợp hàm răng bị xỉn màu, ố vàng mang lại một hàm răng trắng sáng và đều màu. Giúp bạn có nụ cười tự tin và tỏ sáng";
    } else if (dataParseSlug.category_service_name == "Điều trị nha chu") {
      result.description =
        "Viêm nha chu là tình trạng nhiễm trùng do sự tích tụ mảng bám, gây viêm nướu, làm tổn thương mô mềm và có thể dẫn đến mất răng. Cần điều trị nha chu sớm nhất có thể.";
    }
    return result;
  } else if (
    dataParseSlug?.category_service &&
    dataParseSlug?.province_id &&
    !dataParseSlug?.district_id
  ) {
    return {
      title:
        "Top nha khoa " +
        dataParseSlug.category_service_name.toLowerCase() +
        " tại " +
        dataParseSlug?.province_name +
        " tốt nhất tháng " +
        moment().format("MM/YYYY"),
    };
  } else if (
    dataParseSlug?.category_service &&
    dataParseSlug?.province_id &&
    dataParseSlug?.district_id
  ) {
    return {
      title:
        dataParseSlug.category_service_name +
        " tại " +
        dataParseSlug?.district_name +
        ", " +
        dataParseSlug?.province_name +
        " tốt nhất tháng " +
        moment().format("MM/YYYY"),
    };
  } else if (
    !dataParseSlug?.category_service &&
    dataParseSlug?.province_id &&
    !dataParseSlug?.district_id
  ) {
    return {
      title:
        "Top nha khoa tại " +
        dataParseSlug?.province_name +
        " tốt nhất tháng " +
        moment().format("MM/YYYY"),
    };
  } else if (
    !dataParseSlug?.category_service &&
    dataParseSlug?.province_id &&
    dataParseSlug?.district_id
  ) {
    return {
      title:
        "Top nha khoa tại " +
        dataParseSlug?.district_name +
        ", " +
        dataParseSlug?.province_name +
        " tốt nhất tháng " +
        moment().format("MM/YYYY"),
    };
  } else {
    return {
      title: "Tìm kiếm nha khoa uy tín phù hợp nhất với bạn | NhaKhoaHub",
    };
  }
}

export default async function SearchClinicSlug({ params, searchParams }) {
  const dataParseSlug = await parseSlug(params.slug);
  if (LIST_REDIRECT.has(params.slug[0])) {
    const redirectLink = LIST_REDIRECT.get(params.slug[0]);
    params.slug[0] = redirectLink;
    const fullLink = "/" + params.slug.join("/");

    redirect(fullLink);
  }
  const newSearchParams = { ...searchParams, ...dataParseSlug };

  return <SearchResult params={params} searchParams={newSearchParams} />;
}
