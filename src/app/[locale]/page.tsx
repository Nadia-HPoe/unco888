import Banner1 from '@/components/Banner1/Banner1';
import Banner2 from '@/components/Banner2/Banner2';
import CLevel from '@/components/C-Level/CLevel';
import Banner3 from '@/components/Banner3/Banner3';
import Header from '@/components/Header/Header';
import News from '@/components/News/News';
import Investors from '@/components/Investors/Investors';
import Contact_Component from '@/components/СontactСomponent/СontactСomponent';
import Feedback from '@/components/Feedback/Feedback';
import Services from '@/components/Services/Services';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.scss';
import BuyAndSell from '@/components/BuyAndSell/BuyAndSell';

import { GetHeaderData } from '@/constants/GetHeaderData';

export default async function Home() {
  const headerData = await GetHeaderData();

  return (
    <div className={styles.main}>
      <Header data={headerData} />
      <Banner1 />
      <Banner2 />
      <News />
      <Banner3 />
      <CLevel />
      <Investors />
      <Feedback />
      <BuyAndSell />
      <Contact_Component />
      <Services />
      <Footer />
    </div>
  );
}
