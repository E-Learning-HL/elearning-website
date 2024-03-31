"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import * as NProgress from "nprogress";
import styles from "./footer.module.scss";
import logo from "@/public/image/logo-nha-nha-khoa-hub.png";
import imgabove from "@/public/image/footerimg1.svg";
import imgbelow from "@/public/image/footerimg2.svg";
import iconphone from "@/public/icon/icon-phone.svg";
import iconfacebook from "@/public/icon/icon-facebook.svg";
import iconzalo from "@/public/icon/icon-zalo.svg";
import imgcertificate from "@/public/image/certificate.png";
import { HIDE_HEADER_FOOTER } from "@/src/const/const";
import { Col, Row } from "antd";
import Link from "next/link";

const Footer = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const showFooter = !HIDE_HEADER_FOOTER.includes(pathname);

  function triggerButton(button) {
    switch (button) {
      case "phone":
        window.open("tel:(+84)961423199", "_self");
        break;
      case "facebook":
        window.open("https://www.facebook.com/nhakhoahub.vn", "_blank");
        break;
      case "zalo":
        window.open("https://zalo.me/1287972218027383068", "_blank");
        break;
    }
  }

  return (
    <>
      {showFooter && (
        <div className={styles.wrapperFooter}>
          <Image className={styles.imgAbove} src={imgabove} alt="image" />
          <Image className={styles.imgBelow} src={imgbelow} alt="image" />
          <Link href="/" className={styles.wpLogo}>
            <Image className={styles.logo} src={logo} />
          </Link>
          <div className={styles.contentFooter}>
            <Row gutter={[30, 28]}>
              <Col xs={24} sm={24} md={12} xl={8}>
                <div className={styles.about}>
                  <div>
                    <p className={styles.footerHead}>VỀ CHÚNG TÔI</p>
                  </div>
                  <div>
                    <div className={styles.footerIntroduce}>
                      <p>
                        NhaKhoaHub - Nền tảng review và tìm kiếm nha khoa uy tín
                        hàng đầu Việt Nam
                      </p>
                    </div>
                    <div className={styles.footerAdd}>
                      <p>
                        <strong>Công ty TNHH Fenik Technologies</strong>
                        <br />
                        <strong>Mã số thuế:</strong> 0109872256
                        <br />
                        <strong>Địa chỉ:</strong> Số 104, ngõ 54 Lê Quang Đạo,
                        Mễ Trì, Nam Từ Liêm, Hà Nội
                        <br />
                        <strong>Email:</strong>{" "}
                        nhakhoahub@fenik-technologies.com
                        <br />
                        <strong>Hotline:</strong> 0961 423 199
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} xl={5}>
                <div>
                  <p className={styles.footerHead}>CHÍNH SÁCH</p>
                </div>
                <div className={styles.wpFooterLink}>
                  <Row gutter={[14, 0]}>
                    <Col xs={12} sm={12} md={24} xl={24}>
                      <div className={styles.footerLink}>
                        <Link href="/gioi-thieu">Giới thiệu</Link>
                      </div>
                      <div className={styles.footerLink}>
                        <Link href="/lien-he-hop-tac">Liên hệ hợp tác</Link>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={24} xl={24}>
                      <div className={styles.footerLink}>
                        <Link href="/dieu-khoan">Điều khoản sử dụng</Link>
                      </div>
                      <div className={styles.footerLink}>
                        <Link href="/chinh-sach-bao-mat">
                          Chính sách bảo mật
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} xl={5}>
                <p className={styles.footerHead}>HỖ TRỢ KHÁCH HÀNG</p>
                <div className={styles.wpFooterSuport}>
                  <Row gutter={[14, 0]}>
                    <Col xs={12} sm={12} md={24} xl={24}>
                      <div className={styles.footerLink}>
                        <Link href="/blog/review-nha-khoa">
                          Review nha khoa
                        </Link>
                      </div>
                      <div className={styles.footerLink}>
                        <Link href="/blog/kien-thuc-nha-khoa">
                          Kiến thức nha khoa
                        </Link>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={24} xl={24}>
                      <div className={styles.footerLink}>
                        <Link href="/blog/kinh-doanh-nha-khoa">
                          Kinh doanh nha khoa
                        </Link>
                      </div>
                      <div className={styles.footerLink}>
                        <Link href="/lien-he-hop-tac">
                          Đăng phòng khám lên
                          <br /> NhaKhoaHub
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} xl={6}>
                <p className={styles.footerHead}>KẾT NỐI VỚI NHAKHOAHUB</p>
                <div className={styles.socialLink}>
                  <button onClick={() => triggerButton("phone")}>
                    <Image
                      src={iconphone}
                      className={styles.iconFooter}
                      alt="icon"
                    />
                  </button>
                  <button onClick={() => triggerButton("facebook")}>
                    <Image
                      src={iconfacebook}
                      className={styles.iconFooter}
                      alt="icon"
                    />
                  </button>
                  <button onClick={() => triggerButton("zalo")}>
                    <Image
                      src={iconzalo}
                      className={styles.iconFooter}
                      alt="icon"
                    />
                  </button>
                </div>
                <div>
                  <Image
                    src={imgcertificate}
                    className={styles.certificateImage}
                    alt="certificate"
                  ></Image>
                </div>
              </Col>
            </Row>
          </div>
          <div className={styles.line}></div>
          <div className={styles.wpCopyr}>
            <p>Copyright© 2023 Nha Khoa Hub</p>
          </div>
        </div>
      )}
    </>
  );
};
export default Footer;
