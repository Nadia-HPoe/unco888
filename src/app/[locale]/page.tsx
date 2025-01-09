import Banner1 from '@/components/Banner1/Banner1';
import Banner2 from '@/components/Banner2/Banner2';
import CLevel from '@/components/C-Level/CLevel';
import Banner3 from '@/components/Banner3/Banner3';
import Header from '@/components/Header/Header';
import News from '@/components/News/News';
import Investors from '@/components/Investors/Investors';
import Feedback from '@/components/Feedback/Feedback';
import Services from '@/components/Services/Services';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.scss';

export default async function Home() {
  return (
    <div className={styles.main}>
      <Header />
      <Banner1 />
      <Banner2 />
      <News />
      <Banner3 />
      <CLevel />
      <Investors />
      <Feedback />
      <Services />
      <Footer />
    </div>
  );
}
