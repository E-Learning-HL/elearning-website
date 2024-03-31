import styles from "./page.module.scss";
import {
  getBlog,
  getAllCategoryBlog,
  getBlogPopular,
  getBlogNew,
} from "@/src/app/service.js";
import BodyBlog from "./client";

export async function generateMetadata({ params, searchParams }) {
  return {
    title: "Blog | NhaKhoaHub",
    description:
      "Khám phá Blog của NhaKhoaHub để cập nhật những thông tin mới nhất về nha khoa, các bài viết chuyên sâu về hướng dẫn, review và mẹo vặt giúp bạn có nụ cười tự tin nhất.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/blog`,
    },
  };
}

export default async function Blog() {
  let dataCategoryBlog = null;
  let dataListCategoryBlog = null;
  let dataBlogNew = null;
  let dataBlogPopular = null;

  try {
    dataBlogNew = await getBlogNew(5);
    dataBlogPopular = await getBlogPopular(5);
  } catch (error) {
    console.log(error);
  }

  const listBlogNew = getListData(dataBlogNew);
  const listBlogPopular = getListData(dataBlogPopular);

  const listBlogSuggest = {
    listBlogNew: listBlogNew,
    listBlogPopular: listBlogPopular,
  };

  try {
    dataListCategoryBlog = await getAllCategoryBlog();
  } catch (error) {
    console.log(error);
  }

  const listCategoryBlog = dataListCategoryBlog?.data?.result?.map((item) => {
    return {
      id: item.term_id,
      name: item.name,
      slug: item.slug,
    };
  });

  try {
    dataCategoryBlog = await Promise.all(
      listCategoryBlog.map(async (item) => {
        const data = await getBlog(1, item.slug, 6);
        if (item.slug != "uncategorized") {
          return {
            data: data.data,
            category_name: item.name,
            category_slug: item.slug,
            category_id: item.id,
          };
        }
      })
    );
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <div className={styles.wpBlog}>
        <BodyBlog
          dataCategoryBlog={dataCategoryBlog}
          dataASide={listBlogSuggest}
        />
      </div>
    </>
  );
}

function getListData(dataBlog) {
  return dataBlog?.data?.result?.map((item) => {
    return {
      id: item.id,
      slug: item.slug,
      title: item.title,
      thumb: item.thumb,
    };
  });
}
