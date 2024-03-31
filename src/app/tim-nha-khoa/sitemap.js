import { getAllSlug } from "../service";

export default async function sitemap() {
  let dataAllSlug;

  try {
    dataAllSlug = await getAllSlug();
  } catch (error) {
    console.log(error);
  }
  const parseAllSlug = dataAllSlug.map((item) => {
    return {
      url: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/${item}`,
      lastModified: new Date(),
    };
  });
  return [...parseAllSlug];
}
export const dynamic = "force-dynamic";
