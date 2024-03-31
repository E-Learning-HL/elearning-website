import { getAllClinicSlug } from "./[slug]/service.js";
export default async function sitemap() {
  let dataListClinicSlug;

  try {
    dataListClinicSlug = await getAllClinicSlug();
  } catch (error) {
    console.log(error);
  }

  if (dataListClinicSlug) {
    const listClinicSlug = dataListClinicSlug.map((item) => ({
      url: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/phong-kham/${item.slug}`,
      lastModified: new Date(),
    }));
    return [...listClinicSlug];
  }
}
export const dynamic = "force-dynamic";
