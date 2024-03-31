import { getAllPostClinic, getDetailClinicAxios } from "../service";
import BodyListPost from "./client";
import styles from "@/src/app/blog/[slug]/page.module.scss";
import NotFound from "../../../not-found/page";

export default async function ListPost({ params, searchParams }) {
  let dataListPost = null;
  let detailClinic = null;

  detailClinic = await getDetailClinicAxios(params.slug);
  if (!detailClinic) {
    return <NotFound />;
  }

  try {
    dataListPost = await getAllPostClinic(detailClinic.user_id);
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <div className={styles.wpListPost}>
        <BodyListPost dataListPost={dataListPost} clinic={detailClinic} />
      </div>
    </>
  );
}
