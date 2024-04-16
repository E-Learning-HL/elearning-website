import wpAxios from "@/src/util/request";
import { BASE_URL } from "@/src/const/const";
import { URL_BLOG, REVALIDATE } from "@/src/const/const";

// import { cache } from "react";



export async function getAllMyCourse(access_token) {
  const result = await wpAxios().get(`${BASE_URL}/api/enrolments`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  // console.log("result", result);
  return result.data;
}

export async function getAllService() {
  const result = await wpAxios().get(`${BASE_URL}/admin/category-service/all`);
  // console.log("result", result);
  return result.data;
}

export async function getDistrictByProvinceId(province_id) {
  const result = await wpAxios().get(
    `${BASE_URL}/admin/district/get-popular-by-province-id/${province_id}`
  );
  return result.data;
}

export async function getAllProvince() {
  const result = await wpAxios().get(
    `${BASE_URL}/admin/province/include-district`
  );
  return result.data;
}
export async function getAllWeekDay() {
  const result = await wpAxios().get(`${BASE_URL}/admin/weekday`);

  return result.data;
}
export async function getBlog(current, categorySlug, pageSize) {
  const result = await wpAxios().get(
    `${URL_BLOG}/wp-admin/admin-ajax.php?action=get_all_posts`,
    {
      params: {
        current: current ? current : null,
        categorySlug: categorySlug ? categorySlug : null,
        pageSize: pageSize ? pageSize : 12,
      },
    }
  );
  return result.data;
  // console.log(
  //   "fetch ",
  //   `${URL_BLOG}/wp-admin/admin-ajax.php?action=get_all_posts&current=${
  //     current ? current : null
  //   }&pageSize=${pageSize ? pageSize : 12}`
  // );
  // const result = await fetch(
  //   `${URL_BLOG}/wp-admin/admin-ajax.php?action=get_all_posts&current=${
  //     current ? current : null
  //   }&categorySlug=${categorySlug ? categorySlug : null}
  //   &pageSize=${pageSize ? pageSize : 12}`,
  //   {
  //     method: "GET", // *GET, POST, PUT, DELETE, etc.
  //     cache: "force-cache",
  //   }
  // );
  // const res = await result.json();
  // console.log("res", res)
  // return res;
}

export async function getAllCategoryBlog() {
  const result = await fetch(
    `${URL_BLOG}/wp-admin/admin-ajax.php?action=get_all_category`,
    {
      method: "GET",
      // cache: "force-cache",
      next: { revalidate: REVALIDATE },
    }
  );
  const res = await result.json();
  return res;
}
export async function getAllSlug() {
  const result = await wpAxios().get(
    `${BASE_URL}/parse-slug/get-all-slug-for-sitemap`
  );

  // const result = await fetch(
  //   `${BASE_URL}/parse-slug/get-all-slug-for-sitemap`,
  //   {
  //     method: "GET",
  //     cache: "force-cache",
  //   }
  // );
  // const res = await result.json();
  return result?.data;
}

export async function getAllPostBlog() {
  // console.log(
  //   "fetch ",
  //   `${URL_BLOG}/wp-admin/admin-ajax.php?action=get_all_posts`
  // );
  // const result = await fetch(
  //   `${URL_BLOG}/wp-admin/admin-ajax.php?action=get_all_posts`,
  //   {
  //     method: "GET", // *GET, POST, PUT, DELETE, etc.
  //     cache: "force-cache",
  //   }
  // );
  // const res = await result.json();
  // return res;
  const result = await wpAxios().get(
    `${URL_BLOG}/wp-admin/admin-ajax.php?action=get_all_posts`
  );
  return result.data;
}

export async function amountContact() {
  const result = await wpAxios().get(`${BASE_URL}/contact/all`);
  return result.data.total;
}

export async function getListService() {
  const result = await wpAxios().get(`${BASE_URL}/admin/category-service`);
  return result.data;
}

export async function createContact(params) {
  try {
    let res = await wpAxios().post(
      `${BASE_URL}/contact`,
      {
        customer_name: params.customer_name,
        customer_phone_number: params.customer_phone_number,
        province_id: params.province_id,
        district_id: params.district_id,
        category_service_id: params.category_service_id,
        contact_clinic: [params.clinic_id],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res?.status === 200) {
    }
    return res;
  } catch (error) {
    return false;
  }
}

export async function getBlogDetail(slug) {
  // console.log(
  //   "fetch ",
  //   `${URL_BLOG}/wp-admin/admin-ajax.php?action=get_detail_post&postSlug=${slug}`
  // );
  // const result = await fetch(
  //   `${URL_BLOG}/wp-admin/admin-ajax.php?action=get_detail_post&postSlug=${slug}`,
  //   {
  //     method: "GET", // *GET, POST, PUT, DELETE, etc.
  //     cache: "force-cache",
  //   }
  // );
  // const res = await result.json();
  // return res;
  const result = await wpAxios().get(
    `${URL_BLOG}/wp-admin/admin-ajax.php?action=get_detail_post&postSlug=${slug}`
  );
  return result.data;
}

export async function getBlogRelated(id, tagId, limit) {
  const result = await wpAxios().get(
    `${URL_BLOG}/wp-admin/admin-ajax.php?action=get_related_posts&postId=${id}&tagId=${tagId}&limit=${limit}`
  );
  return result.data;
}

export async function getBlogPopular(limit) {
  const result = await wpAxios().get(
    `${URL_BLOG}/wp-admin/admin-ajax.php?action=get_popular_posts&limit=${limit}`
  );
  return result.data;
}

export async function getBlogNew(limit) {
  const result = await wpAxios().get(
    `${URL_BLOG}/wp-admin/admin-ajax.php?action=get_news_posts&limit=${limit}`
  );
  return result.data;
}
