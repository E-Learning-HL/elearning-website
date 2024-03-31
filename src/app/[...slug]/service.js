import { cache } from "react";
import wpAxios from "@/src/util/request";
import { BASE_URL } from "../../const/const";

export async function parseSlug(slug) {
  var queryParams = slug
    .map((item) => `slug=${encodeURIComponent(item)}`)
    .join("&");
  console.log("queryParams", queryParams);
  console.log("fetch ", `${BASE_URL}/parse-slug?${queryParams}`);
  const result = await fetch(`${BASE_URL}/parse-slug?${queryParams}`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    cache: "force-cache",
  });
  const res = await result.json();
  // console.log("res ====", res);
  return res;
}

export const getParseSlug = cache(async (slug) => {
  const result = await wpAxios().post(`${BASE_URL}/parse-slug`, {
    slug,
  });
  // console.log("result", result);
  return result?.data;
});
