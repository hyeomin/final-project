import TopButton from '../components/about/TopButton';
import AboutFooter from '../components/about/aboutFooter/AboutFooter';
import AboutHeader from '../components/about/aboutHeader/AboutHeader';
import GetStarted from '../components/about/getStarted/GetStarted';
import HowToUse from '../components/about/howToUse/HowToUse';
import NewsRoom from '../components/about/newsRoom/NewsRoom';
import WhyMango from '../components/about/whyMango/WhyMango';

function About() {
  return (
    <>
      <AboutHeader />
      <WhyMango />
      <HowToUse />
      <NewsRoom />
      <GetStarted />
      <AboutFooter />
      <TopButton />
    </>
  );
}

export default About;
