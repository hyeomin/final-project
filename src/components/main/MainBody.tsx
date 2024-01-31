import AdminContentsTest from './adminContents/AdminContents';
import PopularContents from './popularContents/PopularContents';
import St from './style';
import TopUsers from './topUsers/TopUsers';

function MainBody() {
  return (
    <St.Container>
      <AdminContentsTest />
      <PopularContents />
      <TopUsers />
    </St.Container>
  );
}

export default MainBody;
