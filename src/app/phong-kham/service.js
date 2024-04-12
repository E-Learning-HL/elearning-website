import wpAxios from "@/src/util/request";
import { BASE_URL } from "@/src/const/const";

export async function getListCourse() {
  const result = await wpAxios().get(`${BASE_URL}/api/courses/course-level`, {
    params: {
        startPoint: 0,
        endPoint: 1000
    },
  });
  return result.data;
}