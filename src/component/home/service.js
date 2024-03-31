import wpAxios from "@/src/util/request";
import { BASE_URL } from "@/src/const/const";
export async function getClinicByName(name) {
  console.log("BASE_URL", BASE_URL);
  const result = await wpAxios().get(`${BASE_URL}/clinic/name?name=${name}`);
  return result.data;
}

export async function createRegistrationClinic(params) {
  const data = {
    name: params.name,
    phone_number: params.phone_number,
    email: params.email,
    clinic_name: params.clinic_name,
    province_id: params.province_id,
    district_id: params.district_id,
    note: params.note,
  }
  try {
    let res = await wpAxios().post(`${BASE_URL}/registration_clinic`,data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res?.status === 200) {}
    return res;
  } catch (error) {
    return false;
  }
}

export async function getListProvince() {
  const result = await wpAxios().get(`${BASE_URL}/admin/province`);
  return result.data
}

export async function getListDistrict(id) {
  const result = await wpAxios().get(`${BASE_URL}/admin/district/get-by-province-id/${id}`)
  return result.data
}

