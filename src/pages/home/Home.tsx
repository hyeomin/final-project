import HomeHeader from './\bcomponents/homeHeader/HomeHeader';
import PopularContents from './\bcomponents/popularContents/PopularContents';
import TopUsers from './\bcomponents/topUsers/TopUsers';
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
