import { useSwiper } from "swiper/react";
import iconPreviewLeft from "@/public/icon/icon-preview-left.svg";
import iconNextRight from "@/public/icon/icon-next-right.svg";
import Image from "next/image";

export default function SwiperButtonNext() {
  const swiper = useSwiper();
  return (
    <div className="wp-icon-swiper">
      <div className="icon-preview-left" onClick={() => swiper.slidePrev()}>
        <Image src={iconPreviewLeft} />
      </div>

      <div className="icon-next-right" onClick={() => swiper.slideNext()}>
        <Image src={iconNextRight} />
      </div>
    </div>
  );
}
