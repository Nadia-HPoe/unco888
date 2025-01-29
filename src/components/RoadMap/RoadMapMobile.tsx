"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./roadMap.module.scss";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { RoadMapItem, RoadMapKeys } from "@/constants/RoadMapData";

const RoadMapMobile = ({ item, imageSize }: { item: RoadMapItem; imageSize: RoadMapKeys }) => {
  const t = useTranslations('textRoadMap');
  const [selectedAccordion, setSelectedAccordion] = useState<number | null>(null);

  const handleAccordionClick = (id: number) => {
    setSelectedAccordion(selectedAccordion === id ? null : id);
  };

  return (
    <>
      <div
        className={styles.container_wrapper_content}
        onClick={() => handleAccordionClick(item.id)}
      >
        <p
          className={`${styles.name_year} ${item.style === 'reverse' ? styles.name_year_reverse : ''}`}
        >
          {item.year}
        </p>
        <Image
          src='/icons/arrow.svg'
          className={item.id !== selectedAccordion ? styles.arrow : styles.arrow_reverse}
          alt='arrow'
          width={30}
          height={17}
        />
      </div>

      {item.id === selectedAccordion && (
        <div className={styles.content}>
          <Image
            className={styles.photo}
            src={item[imageSize] as string}
            alt='photo'
            width={370}
            height={268}
          />
          <Link
            href='https://www.instagram.com/uff_eu?igsh=MWl1MjZnNGJmNm5ucQ%3D%3D&utm_source=qr'
            passHref
          >
            <Image
              className={styles.icon_instagram}
              src='/images/RoadMap/instagram.svg'
              alt='Instagram'
              width={40}
              height={40}
            />
          </Link>
          <div className={styles.text}>{t(item.text)}</div>
          <div className={`${styles.flare} ${styles.flare_table}`}></div>
        </div>
      )}
    </>
  );
};

export default RoadMapMobile;
