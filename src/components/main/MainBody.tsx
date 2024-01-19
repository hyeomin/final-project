import AdminContents from './adminContents/AdminContents';
import PopularContents from './popularContents/PopularContents';
import TopUsers from './topUsers/TopUsers';
import St from './style';
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
