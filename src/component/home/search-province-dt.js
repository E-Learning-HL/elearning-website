import wpAxios from "@/src/util/request";
import { BASE_URL } from "../../const/const";
export async function searchTopDentistry(province_id) {
    const resutl = await wpAxios().get(`${BASE_URL}/clinic/search`, {
        params:{
            page: 1,
            limit: 6,
            province_id: province_id ? province_id: null
        }
    });
    return resutl.data;
}
