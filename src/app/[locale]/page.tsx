import Banner1 from '@/components/Banner1/Banner1';
import Banner2 from '@/components/Banner2/Banner2';
import Banner3 from '@/components/Banner3/Banner3';
import BuyAndSell from '@/components/BuyAndSell/BuyAndSell';
import CLevel from '@/components/C-Level/CLevel';
import Contact_Component from '@/components/СontactСomponent/СontactСomponent';
import Feedback from '@/components/Feedback/Feedback';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Investors from '@/components/Investors/Investors';
import News from '@/components/News/News';
import QandA from '@/components/Q&A/Q&A';
import RoadMap from '@/components/RoadMap/RoadMap';
import Services from '@/components/Services/Services';
import styles from './page.module.scss';
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
      <QandA />
      <CLevel />
      <Investors />
      <Feedback />
      <BuyAndSell />
      <RoadMap />
      <Contact_Component />
      <Services />
      <Footer />
    </div>
  );
}
