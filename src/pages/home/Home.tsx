import HomeHeader from './components/homeHeader/HomeHeader';
import PopularContents from './components/popularContents/PopularContents';
import TopUsers from './components/topUsers/TopUsers';
import St from './style';

function Home() {
  return (
    <St.Container>
      <HomeHeader />
      <PopularContents />
      <TopUsers />
    </St.Container>
  );
}

export default Home;
