"use client";
import styles from "@/src/component/blog/blog-detail.module.scss";
import { wrapperRouterPush } from "@/src/util/util";
import { useRouter } from "next/navigation";
import ImageAntdCommon from "@/src/component/image/image-antd";
import Link from "next/link";
import { useEffect } from "react";

export default function ShowBlogSuggest({ data, hasForm = true }) {
  const displayCaptcha = () => {
    if (!document.getElementById("reCaptcha_script")) {
      const script = document.createElement("script");
      script.id = "reCaptcha_script";
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_KEY}`;
      script.async = true;
      document.body.appendChild(script);
    }
  };

  useEffect(() => {
    return () => {
      const scriptToRemove = document.getElementById("reCaptcha_script");
      if (scriptToRemove) {
        document.body.removeChild(scriptToRemove);
      }
    };
  }, []);

  return (
    <div className={styles.wpBlogSuggest}>
      {/* <div className={styles.wpBlogSearch}>
        <Input
          size="large"
          placeholder="Tìm kiếm bài viết"
          prefix={<SearchOutlined />}
        />
      </div> */}
      <div className={styles.wpBlogNew}>
        <p className={styles.headTitle}> TIN MỚI NHẤT </p>
        {data?.listBlogNew?.map((item) => (
          <div className={styles.wpContentCard}>
            <Link class={styles.cardItem} href={"/blog/" + item.slug}>
              <ImageAntdCommon
                data={item.thumb}
                className={styles.contentImage}
                width="100%"
                height="100%"
              />
              <div
                class={styles.cardItemTitle}
                dangerouslySetInnerHTML={{ __html: item.title }}
              ></div>
            </Link>
          </div>
        ))}
      </div>
      <div className={styles.wpBlogNew}>
        <p className={styles.headTitle}> TIN ĐỌC NHIỀU </p>
        {data?.listBlogPopular?.map((item) => (
          <div className={styles.wpContentCard}>
            <Link class={styles.cardItem} href={"/blog/" + item.slug}>
              <ImageAntdCommon
                data={item.thumb}
                className={styles.contentImage}
                width="100%"
                height="100%"
              />
              <div
                class={styles.cardItemTitle}
                dangerouslySetInnerHTML={{ __html: item.title }}
              ></div>
            </Link>
          </div>
        ))}
      </div>
      {hasForm && (
        <embed
          className={styles.formContact}
          onClick={displayCaptcha}
          src={`${process.env.NEXT_PUBLIC_BLOG_EMBED_HOST_URL}/contact/create`}
        />
      )}

      <div className={styles.wpSearchFit}>
        <p className={styles.headTitle}>
          Tìm kiếm nha khoa uy tín phù hợp nhất với bạn!
        </p>
        <Link
          href="/build-roadmap"
          className={`${styles.wpInputearch} button-blue`}
        >
          TÌM KIẾM CƠ SỞ GẦN NHẤT
        </Link>
      </div>
    </div>
  );
}
