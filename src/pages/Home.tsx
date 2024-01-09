import HyTest from '../components/main/HyTest';
import Main from '../components/main/index';
import CS from './CommonStyle';

function Home() {
  return (
    <CS.FullContainer>
      <Main />
      <HyTest />
    </CS.FullContainer>
  );
}

export default Home;
