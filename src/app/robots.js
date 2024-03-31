export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/private/",
        "/phong-kham/*?dichvu=*",
        "/chinh-sach-bao-mat?*",
        "/dieu-khoan?*",
        "/gioi-thieu?*",
        "/lien-he-hop-tac?*",
        "/blog?*",
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/sitemap.xml`,
  };
}
