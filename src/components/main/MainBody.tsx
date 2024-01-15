import St from './admin/style';
import AdminContents from './admin/AdminContents';
import UserContents from './users/UserContents';

function MainBody() {
  return (
    <St.Container>
      <AdminContents />
      <UserContents />
    </St.Container>
  );
}

export default MainBody;
