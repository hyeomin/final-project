import AdminContents from './adminContents/AdminContents';
import PopularContents from './popularContents/PopularContents';
import St from './style';
import TopUsers from './topUsers/TopUsers';

function MainBody() {
  return (
    <St.Container>
      <AdminContents />
      <PopularContents />
      <TopUsers />
    </St.Container>
  );
}

export default MainBody;
