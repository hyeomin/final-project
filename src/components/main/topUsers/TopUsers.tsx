import { useQuery } from '@tanstack/react-query';
import { styled } from 'styled-components';
import { getAllUsers } from '../../../api/authApi';
import { getTopUsers } from '../../../api/homeApi';
import firstPlace from '../../../assets/1stPlace.png';
import secondPlace from '../../../assets/2ndPlace.png';
import thirdPlace from '../../../assets/3rdPlace.png';
import defaultImage from '../../../assets/defaultImg.jpg';
import { QUERY_KEYS } from '../../../query/keys';

const TopUsers = () => {
  // 유저정보 가져오기(profileImg)
  const { data: users } = useQuery({
    queryKey: [QUERY_KEYS.USERPOSTS],
    queryFn: getAllUsers
  });
  // console.log('유저 목록===>', users);

  const { data: topUsers } = useQuery({
    queryKey: ['topUsers'],
    queryFn: getTopUsers
  });

  return (
    <Container>
      <Title>
        <h1>TOP 10</h1>
        <h3>망고의 에코라이프 인플루언서들을 확인하세요!</h3>
      </Title>
      <UserList>
        {topUsers?.map((user, idx) => {
          return (
            <UserCard key={idx}>
              <ImagegeWrapper>
                <img src={users?.find((u) => u.uid === user.uid)?.profileImg || defaultImage} alt="profile" />
              </ImagegeWrapper>
              <UserName>
                {idx === 0 && <img src={firstPlace} alt="firstPlace" />}
                {idx === 1 && <img src={secondPlace} alt="secondPlace" />}
                {idx === 2 && <img src={thirdPlace} alt="thirdPlace" />}
                <p>{users?.find((u) => u.uid === user.uid)?.displayName}</p>
              </UserName>
            </UserCard>
          );
        })}
      </UserList>
    </Container>
  );
};

const Container = styled.section`
  /* background-color: burlywood; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 40px 0 150px 0; // 333 -> 150
  & h1 {
    color: #000;
    font-size: 28px;
    font-weight: 700;
  }
  & h3 {
    color: #ffa114;
    font-size: 17px;
    font-weight: 600;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  gap: 10px;
`;

const UserList = styled.div`
  /* background-color: #4e9903; */
  width: 85%; // 100%
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto auto;
  gap: 10px; // 40px
`;

const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  /* background-color: palegreen; */
`;

const ImagegeWrapper = styled.div`
  width: 100px; //200px
  height: 100px; //200px
  border-radius: 50%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const UserName = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
  & img {
    width: 30px;
    height: 30px;
  }
`;

export default TopUsers;
