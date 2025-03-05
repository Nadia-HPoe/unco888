'use client';
import Image from 'next/image';
import Link from 'next/link';
import RoadMapMobile from './RoadMapMobile';
import styles from './roadMap.module.scss';
import useSearchLinks from '@/hooks/useSearchLinks';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { RoadMapData, RoadMapKeys } from '@/constants/RoadMapData';
import { useWindowSize } from '@/hooks/useWindowSize';

const RoadMap = () => {
  const t = useTranslations('textRoadMap');
  const [imageSize, setImageSize] = useState<RoadMapKeys>('img1440');
  const getSearchLinks = useSearchLinks;

  const { width } = useWindowSize();

  const updateImageSize = () => {
    if (width < 390) {
      setImageSize('img390');
    } else if (width < 760) {
      setImageSize('img760');
    } else {
      setImageSize('img1440');
    }
  };

  useEffect(() => {
    if (width) {
      updateImageSize();
    }
  }, [width]);

  return (
    <div className={styles.container_main} id='roadmap'>
      <h2 className={styles.title}>{t('title')}</h2>

      {RoadMapData.map((item, index) =>
        imageSize === 'img390' ? (
          <RoadMapMobile
            item={item}
            imageSize={imageSize}
            key={index}
            getSearchLinks={getSearchLinks}
          />
        ) : (
          <div key={index} className={styles.content}>
            <div
              className={`${styles.container_wrapper_content} ${item.style === 'reverse' ? styles.container_wrapper_content_reverse : ''}`}
            >
              <div className={styles.text}>
                {getSearchLinks(t(item.text), true, styles.linksUnco)}
              </div>
              <div
                className={`${styles.container_year} ${item.style === 'reverse' ? styles.container_year_reverse : ''}`}
              >
                <Image
                  src='/images/RoadMap/circle.svg'
                  className={`${styles.circle_of_year} ${item.style === 'reverse' ? styles.circle_of_year_reverse : ''}`}
                  alt='circle'
                  width={50}
                  height={50}
                />
                <p
                  className={`${styles.line_of_year} ${item.style === 'reverse' ? styles.line_of_year_reverse : ''}`}
                />
                <div
                  className={`${styles.flare} ${item.style === 'reverse' ? styles.flare_reverse : styles.flare_non_reverse}`}
                />
                <p
                  className={`${styles.name_year} ${item.style === 'reverse' ? styles.name_year_reverse : ''}`}
                >
                  {item.year}
                </p>
              </div>
              <div
                className={`${styles.container_wrapper_instagram} ${item.style === 'reverse' ? styles.container_wrapper_instagram_reverse : ''}`}
              >
                <Image
                  className={styles.photo}
                  src={item[imageSize] as string}
                  alt='photo'
                  width={370}
                  height={268}
                />
                <Link
                  className={`${styles.icon_instagram} ${item.style === 'reverse' ? styles.icon_instagram_reverse : ''}`}
                  href='https://www.instagram.com/uff_eu?igsh=MWl1MjZnNGJmNm5ucQ%3D%3D&utm_source=qr'
                  passHref
                >
                  <Image
                    src='/images/RoadMap/instagram.svg'
                    alt='Instagram'
                    width={40}
                    height={40}
                  />
                </Link>
              </div>
            </div>
            <div className={`${styles.flare} ${styles.flare_table}`}></div>
          </div>
        )
      )}
    </div>
  );
};

export default RoadMap;
