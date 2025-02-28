import Link from "next/link";
import React, { JSX } from "react";
import styles from "../components/RoadMap/roadMap.module.scss";

const useSearchLinks = (text: string, isShowList: boolean = true): JSX.Element => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  const links = text.match(urlRegex) || [];

  const renderedText = (
    <>
      {parts.map((part, index) => {
        if (urlRegex.test(part)) {
          return (
            <Link className={styles.linksUnco} key={index} href={part} passHref>
              {links.length > 1 && isShowList ? (
                <ul>
                  <li className={styles.container_for_links}> <span className={styles.snow_for_links}>*</span> {part}</li>
                </ul>
              ) : (
                <span>{part}</span>
              )}
            </Link>
          );
        } else {
          return <span key={index}>{part}</span>;
        }
      })}
    </>
  );

  return renderedText;
};

export default useSearchLinks;
