import {
  getBlog,
  getAllCategoryBlog,
  getBlogDetail,
  getBlogPopular,
  getBlogRelated,
  getBlogNew,
} from "@/src/app/service.js";
import BodyListBlog from "@/src/app/blog/[slug]/client.js";
import styles from "@/src/app/blog/[slug]/page.module.scss";
import BodyBlogDetail from "../detail/[slug]/client";
import NotFound from "../../not-found/page";

export async function generateMetadata({ params, searchParams }) {
  let dataListCategoryBlog = null;
  let dataBlogDetail = null;
  try {
    const res = await Promise.all([
      getAllCategoryBlog(),
      getBlogDetail(params.slug),
    ]);
    dataListCategoryBlog = res[0];
    dataBlogDetail = res[1];
  } catch (error) {
    console.log(error);
  }

  const listCategoryBlog = dataListCategoryBlog?.data?.result?.map((item) => {
    return {
      name: item.name,
      slug: item.slug,
    };
  });
  const filterListCategoryBlog = listCategoryBlog.filter(function (obj) {
    return obj.name !== "Uncategorized";
  });

  const findId = filterListCategoryBlog?.find(
    (item) => item.slug == params.slug
  );
  if (findId) {
    const result = {
      title: findId.name + " | NhaKhoaHub",
    };
    if (findId.name === "Kiến thức nha khoa") {
      result.description =
        "Chuyên mục Kiến Thức Nha Khoa tại NhaKhoaHub - Nơi chia sẻ kiến thức chuyên môn, thông tin cập nhật và hữu ích về nha khoa và sức khỏe răng miệng.";
    } else if (findId.name === "Review nha khoa") {
      result.description =
        "Chuyên mục Review Nha Khoa tại NhaKhoaHub - Nơi cung cấp đánh giá chân thực, thông tin chi tiết về các phòng khám nha khoa, giúp bạn lựa chọn dịch vụ tốt nhất.";
    } else {
      result.description =
        "Tìm hiểu về kinh doanh nha khoa với những bài viết chuyên sâu, nhằm cung cấp thông tin cập nhất và chính xác. Chuyên mục dành riêng cho các chủ phòng khám.";
    }
    return result;
  } else {
    return {
      title: dataBlogDetail?.data?.result?.metaTitle,
      description: dataBlogDetail?.data?.result?.metaDescription,
      openGraph: {
        images: [dataBlogDetail?.data?.result?.thumb],
      },
    };
  }
}

export default async function ListBlog({ params, searchParams }) {
  let getListBlog = null;
  let dataListCategoryBlog = null;
  let dataListBlog = null;
  let listBlogSuggest = null;

  const limit_number = 5;
  let dataBlogDetail = null;
  let dataBlogNew = null;
  let dataBlogRelated = null;
  let dataBlogPopular = null;

  try {
    const res = await Promise.all([
      getAllCategoryBlog(),
      getBlogDetail(params.slug),
      getBlogNew(limit_number),
      getBlogPopular(limit_number),
    ]);

    dataListCategoryBlog = res[0];
    dataBlogDetail = res[1];
    dataBlogNew = res[2];
    dataBlogPopular = res[3];

    const tags = dataBlogDetail?.data?.result?.tags;
    const dataTagIds = tags && tags.map((item) => item.term_id);
    const postId = dataBlogDetail?.data?.result?.id;
    dataBlogRelated = await getBlogRelated(postId, dataTagIds, 3);
  } catch (error) {
    console.log(error);
  }

  const listBlogNew = getListData(dataBlogNew);
  const listBlogPopular = getListData(dataBlogPopular);
  const listBlogRelated = getListDataRelated(dataBlogRelated);
  const dataDetail = dataBlogDetail?.data?.result;

  listBlogSuggest = {
    listBlogNew: listBlogNew,
    listBlogPopular: listBlogPopular,
  };

  const listCategoryBlog = dataListCategoryBlog?.data?.result?.map((item) => {
    return {
      id: item.term_id,
      name: item.name,
      slug: item.slug,
      total: item.count,
    };
  });

  const filterListCategoryBlog = listCategoryBlog.filter(function (obj) {
    return obj.name !== "Uncategorized";
  });
  const findId = filterListCategoryBlog?.find(
    (item) => item.slug == params.slug
  );

  //check slug is category
  if (findId) {
    try {
      getListBlog = await getBlog(
        searchParams.page ? searchParams.page : 1,
        params.slug
      );
    } catch (error) {
      console.log(error);
    }
    dataListBlog = {
      data: getListBlog?.data,
      category_name: findId.name,
      category_slug: findId.slug,
      total_post: findId.total,
      category_id: findId.id,
    };

    return (
      <>
        <div className={styles.wpListBlog}>
          {/* breadCumb */}
          <BodyListBlog data={dataListBlog} dataASide={listBlogSuggest} />
        </div>
      </>
    );
  }

  if (dataBlogDetail.statusCode == 404) {
    return <NotFound />;
  }

  return (
    <>
      <div className={styles.wpBlog}>
        {/* breadCumb */}
        <BodyBlogDetail
          dataResult={{
            dataContentMain: {
              dataDetail: dataDetail,
              listRelated: listBlogRelated,
            },
            listBlogSuggest: {
              listBlogNew: listBlogNew,
              listBlogPopular: listBlogPopular,
            },
          }}
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

function getListDataRelated(dataBlog) {
  return dataBlog?.data?.result?.map((item) => {
    return {
      id: item.id,
      slug: item.slug,
      title: item.title,
      thumb: item.thumb,
      date: item.date,
      desc: item.desc,
    };
  });
}
