export default async function sitemap() {
  const staticSlug = [
    {
      url: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/blog/sitemap.xml`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/chinh-sach-bao-mat`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/dieu-khoan`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/gioi-thieu`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/lien-he-hop-tac`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/phong-kham/sitemap.xml`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/tim-nha-khoa`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/tim-nha-khoa/sitemap.xml`,
      lastModified: new Date(),
    },
  ];
  return [...staticSlug];
}
