import Button from '@/components/Button/Button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styles from './page.module.scss';

export default function NotFoundPage() {
  const t = useTranslations('not found');
  return (
    <div className={styles.notfound}>
      <Image
        className={styles.notfound_image}
        src='/images/404-logo.png'
        alt='not-found'
        width={499}
        height={333}
      />
      <h1 className={styles.notfound_title}>OOPS...</h1>
      <h2 className={styles.notfound_text}>{t('text')}</h2>
      <Button className={styles.notfound_button} link='/' text={t('button')} />
    </div>
  );
}
