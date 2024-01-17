import AdminContents from './adminContents/AdminContents';
import St from './adminContents/style';
import TopUsers from './topUsers/TopUsers';
import styled from 'styled-components';
import UserContents from './userContents/UserContents';

function MainBody() {
  return (
    <Container>
      <AdminContents />
      <UserContents />
      <TopUsers />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 50px;
`;
export default MainBody;
