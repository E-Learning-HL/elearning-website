import wpAxios from "@/src/util/request";
import { BASE_URL } from "../../const/const";
export async function searchClinic(
  start_point,
  target_point
  // time,
  // page,
  // category_service,
  // weekday,
  // district_id,
  // min,
  // max,
) {
  const result = await wpAxios().get(
    `${BASE_URL}/api/courses/course-level`,
    {
      params: {
        startPoint: start_point ? start_point : null,
        endPoint: target_point ? target_point : null,
      //   limit: 10,
      //   province_id: province_id ? province_id : null,
      //   time: time ? time : null,
      //   page: page ? page : 1,
      //   category_service: category_service ? category_service : null,
      //   weekday: weekday ? weekday : null,
      //   district_id: district_id ? district_id : null,
      //   min: min ? min * 1000000 : null,
      //   max: max ? max * 1000000 : null,
      },
    }
  );
  return result;
}
