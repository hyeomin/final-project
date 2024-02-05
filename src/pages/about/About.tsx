import TopButton from './components/TopButton';
import AboutFooter from './components/aboutFooter/AboutFooter';
import AboutHeader from './components/aboutHeader/AboutHeader';
import GetStarted from './components/getStarted/GetStarted';
import HowToUse from './components/howToUse/HowToUse';
import NewsRoom from './components/newsRoom/NewsRoom';
import WhyMango from './components/whyMango/WhyMango';

function About() {
  return (
    <>
      <AboutHeader />
      <WhyMango />
      <HowToUse />
      <NewsRoom />
      <GetStarted />
      <AboutFooter />
      <TopButton position={20} />
    </>
  );
}

export default About;
