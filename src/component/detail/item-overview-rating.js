"use client";
import styles from "@/src/app/phong-kham/[slug]/page.module.scss";
import { STROKE_COLOR, TRAIL_COLOR, PREFIX_IMAGE_URL } from "@/src/const/const";
import { Col, Row, Progress } from "antd";

export default function ItemOverviewRating({ percent, name }) {
  return (
    <div className={styles.wpProgressLine}>
      <Progress
        percent={percent * 10}
        strokeColor={STROKE_COLOR}
        trailColor={TRAIL_COLOR}
        showInfo={false}
        size={[20, 30]}
      />
      <div className={styles.progressLine}>
        <div className={styles.titleProgressLine}>{name}</div>
        <div className={styles.valueProgressLine}>
          {percent ? percent.toFixed(1) : '-'}
        </div>
      </div>
    </div>
  );
}
