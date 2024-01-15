import St from './style';
import AdminContents from './AdminContents';
import UserContents from './UserContents';

function MainBody() {
  return (
    <St.Container>
      <AdminContents />
      <UserContents />
    </St.Container>
  );
}

export default MainBody;
