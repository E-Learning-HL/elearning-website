import wpAxios from "@/src/util/request";
import { BASE_URL } from "@/src/const/const";
export async function getReview(clinic_id, page) {
    const resutl = await wpAxios().get(`${BASE_URL}/admin/rating/${clinic_id}`, {
        params:{
            page: page? page : null,
            limit: 10
        }
    });
    return resutl;
}

export async function getComment(rating_id){
    const resutl = await wpAxios().get(`${BASE_URL}/admin/comment/${rating_id}`);
    return resutl;
}
