import wpAxios from "@/src/util/request";
import { BASE_URL } from "@/src/const/const";
import axios from "axios";



export async function getDetailCourse(id) {
  const result = await wpAxios().get(`${BASE_URL}/api/courses/get-course-public/${id}`, {
    params: {},
  });
  return result.data;
}
export async function getListCourses() {
  const result = await wpAxios().get(`${BASE_URL}/api/courses/course-level`, {
    params: {
      startPoint: 0,
      endPoint: 1000
    },
  });
  return result.data;
}


export async function getDetailClinicAxios(slug) {
  const result = await wpAxios().get(`${BASE_URL}/clinic/findBySlug/${slug}`, {
    params: {},
  });
  return result.data;
}

export async function getDetailClinic(slug) {
  const result = await fetch(`${BASE_URL}/clinic/findBySlug/${slug}`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    cache: "force-cache",
  });
  const res = await result.json();
  // console.log("res ====", res);
  return res;
}

export async function parseSlugDetail(slug) {
  const result = await wpAxios().get(
    `${BASE_URL}/parse-slug/detail-clinic?slug=${slug}`
  );
  return result.data;
}

export async function getAllClinicSlug() {
  const result = await wpAxios().get(`${BASE_URL}/clinic/getAllClinicSlug`);
  // const result = await fetch(`${BASE_URL}/clinic/getAllClinicSlug`, {
  //   method: "GET", // *GET, POST, PUT, DELETE, etc.
  //   cache: "force-cache",
  // });
  // const res = await result.json();
  return result?.data;
}

export async function getAllPostClinic(user_id, page = 1) {
  const result = await wpAxios().get(
    `${BASE_URL}/admin/post/public?user_id=${user_id}&limit=10&page=${page}`
  );

  return result?.data;
}

export async function getDetailPostAxios(id) {
  console.log("id", id);
  const result = await wpAxios().get(`${BASE_URL}/admin/post/${id}`);

  return result?.data;
}
