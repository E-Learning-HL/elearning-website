import wpAxios from "@/src/util/request";
import { BASE_URL } from "../../const/const";
export async function searchClinic(
  name,
  province_id,
  time,
  page,
  category_service,
  weekday,
  district_id,
  min,
  max,
) {
  const result = await wpAxios().get(`${BASE_URL}/clinic/search`, {
    params: {
      name: name ? name : null,
      page: 1,
      limit: 10,
      province_id: province_id ? province_id : null,
      time: time ? time : null,
      page: page ? page : 1,
      category_service: category_service ? category_service : null,
      weekday: weekday ? weekday : null,
      district_id: district_id ? district_id : null,
      min: min ? min * 1000000 : null,
      max: max ? max * 1000000 : null,
    },
  });
  return result;
}
