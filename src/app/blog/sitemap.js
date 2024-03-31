import { getAllCategoryBlog, getAllPostBlog } from "@/src/app/service.js";
export default async function sitemap() {
  let dataListCategoryBlog;
  let dataListPostBlog;

  try {
    dataListCategoryBlog = await getAllCategoryBlog();

    dataListPostBlog = await getAllPostBlog();
  } catch (error) {
    console.log(error);
  }

  if (dataListCategoryBlog?.data?.result) {
    const filterListCategoryBlog = dataListCategoryBlog?.data?.result.filter(
      function (obj) {
        return obj.name !== "Uncategorized";
      }
    );
    const listCategoryBlog = filterListCategoryBlog.map((item) => ({
      url: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/blog/${item.slug}`,
      lastModified: new Date(),
    }));
    const listPostBlog = dataListPostBlog?.data?.result.map((item) => ({
      url: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/blog/${item.slug}`,
      lastModified: new Date(),
    }));
    return [...listCategoryBlog, ...listPostBlog];
  }
}
export const dynamic = "force-dynamic";
