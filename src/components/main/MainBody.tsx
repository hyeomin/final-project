import St from './admin/style';
import AdminContents from './admin/AdminContents';
import UserContents from './users/UserContents';
import styled from 'styled-components';
import UserRanking from './ranking/Ranking';

function MainBody() {
  return (
    <Container>
      <AdminContents />
      <UserContents />
      <UserRanking />
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
