"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import * as NProgress from "nprogress";
import styles from "./footer.module.scss";
import logo from "@/public/image/elearning-logo.png";
import imgabove from "@/public/image/footerimg1.svg";
import imgbelow from "@/public/image/footerimg2.svg";
import iconphone from "@/public/icon/icon-phone.svg";
import iconfacebook from "@/public/icon/icon-facebook.svg";
import iconzalo from "@/public/icon/icon-zalo.svg";
import { HIDE_FOOTER, HIDE_FOOTER_DYNAMIC } from "@/src/const/const";
import { Col, Row } from "antd";
import Link from "next/link";

const Footer = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const showFooter = !HIDE_FOOTER.includes(pathname);
  const showFooterDynamic = !HIDE_FOOTER_DYNAMIC.some((route) =>
    pathname.startsWith(route)
  );

  function triggerButton(button) {
    switch (button) {
      case "phone":
        window.open("tel:(+84)923286123", "_self");
        break;
      case "facebook":
        window.open("https://www.facebook.com/truongdhxaydung", "_blank");
        break;
    }
  }

  return (
    <>
      {showFooter && showFooterDynamic && (
        <div className={styles.wrapperFooter}>
          <Image className={styles.imgAbove} src={imgabove} alt="image" />
          <Image className={styles.imgBelow} src={imgbelow} alt="image" />
          <Link href="/" className={styles.wpLogo}>
            <Image className={styles.logo} src={logo} />
          </Link>
          <div className={styles.contentFooter}>
            <Row gutter={[30, 28]} style={{ display:'flex', justifyContent:'center' }}>
              <Col xs={24} sm={24} md={12} xl={8}>
                <div className={styles.about}>
                  <div>
                    <p className={styles.footerHead}>VỀ CHÚNG TÔI</p>
                  </div>
                  <div>
                    <div className={styles.footerIntroduce}>
                      <p>
                        S eLearning - Nền tảng luyện thi IELTS tích hợp AI Tiên
                        phong công nghệ, dẫn đầu hiệu quả
                      </p>
                    </div>
                    <div className={styles.footerAdd}>
                      <p>
                        <strong>Đại học Xây Dựng Hà Nội</strong>
                        <br />
                        <strong>Địa chỉ:</strong> Số 55 Giải Phóng, Đồng Tâm,
                        Hai Bà Trưng, Hà Nội
                        <br />
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
                        <Link href="/">Giới thiệu</Link>
                      </div>
                      <div className={styles.footerLink}>
                        <Link href="">Liên hệ hợp tác</Link>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={24} xl={24}>
                      <div className={styles.footerLink}>
                        <Link href="">Điều khoản sử dụng</Link>
                      </div>
                      <div className={styles.footerLink}>
                        <Link href="">
                          Chính sách bảo mật
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              {/* <Col xs={24} sm={24} md={12} xl={5}>
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
              </Col> */}
              <Col xs={24} sm={24} md={12} xl={6}>
                <p className={styles.footerHead}>KẾT NỐI VỚI LEARNING</p>
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
                  <button>
                    <Image
                      src={iconzalo}
                      className={styles.iconFooter}
                      alt="icon"
                    />
                  </button>
                </div>
                {/* <div>
                  <Image
                    src={imgcertificate}
                    className={styles.certificateImage}
                    alt="certificate"
                  ></Image>
                </div> */}
              </Col>
            </Row>
          </div>
          <div className={styles.line}></div>
          <div className={styles.wpCopyr}>
            <p>Copyright© 2024 HL Techs</p>
          </div>
        </div>
      )}
    </>
  );
};
export default Footer;
