import wpAxios from "@/src/util/request";
import { BASE_URL } from "@/src/const/const";

export async function getAllTest(courseId, access_token) {
  const result = await wpAxios().get(
    `${BASE_URL}/api/assignments/get-exam/${courseId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
    //    {
    //     params: {
    //         startPoint: 0,
    //         endPoint: 1000
    //     },
    //   }
  );
  return result.data;
}

export async function getOwnedCourse(access_token) {
  const result = await wpAxios().get(`${BASE_URL}/api/enrolments`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  return result.data;
}

export async function getResultTest(id ,access_token) {
  const result = await wpAxios().get(`${BASE_URL}/api/assignments/get-score/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  return result.data;
}

