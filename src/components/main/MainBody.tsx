// import AdminContents from './adminContents/AdminContents';
import AdminContentsTest from './adminContents/AdminContentsTest';
import PopularContents from './popularContents/PopularContents';
import St from './style';
import TopUsers from './topUsers/TopUsers';

function MainBody() {
  return (
    <St.Container>
      {/* <AdminContents /> */}
      <AdminContentsTest />
      <PopularContents />
      <TopUsers />
    </St.Container>
  );
}

export default MainBody;
