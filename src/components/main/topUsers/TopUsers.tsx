import React from 'react';
import defaultImage from '../../../assets/defaultImg.jpg';
import firstPlace from '../../../assets/1stPlace.png';
import secondPlace from '../../../assets/2ndPlace.png';
import thirdPlace from '../../../assets/3rdPlace.png';
import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../../query/keys';
import { getAllUsers } from '../../../api/authApi';
import { getTopUsers } from '../../../api/homeApi';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import theme from '../../../styles/theme';

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
        <h3>친환경 습관 만렙! 상위 랭킹 유저들의 노하우를 살펴보세요!</h3>
      </Title>
      <UserList>
        {topUsers?.map((user, idx) => {
          return (
            <UserCard key={idx}>
              <ImagegeWrapper>
                <img src={users?.find((u) => u.uid === user.uid)?.profileImg || defaultImage} alt="profile" />
                {idx === 0 && <img src={firstPlace} alt="firstPlace" />}
                {idx === 1 && <img src={secondPlace} alt="secondPlace" />}
                {idx === 2 && <img src={thirdPlace} alt="thirdPlace" />}
              </ImagegeWrapper>
              <p>{users?.find((u) => u.uid === user.uid)?.displayName}</p>
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
  margin-bottom: 333px;
  & h1 {
    color: #000;
    font-size: 28px;
    font-weight: 700;
  }
  & h3 {
    color: #ffa114;
    font-size: 17px;
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
  width: 100%; // 100%
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto auto;
  gap: 30px; // 40px
`;

const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 200px;
  /* background-color: palegreen; */
  & p {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: 20px;
  }
`;

const ImagegeWrapper = styled.div`
  position: relative;
  width: 175px; //200px
  height: 175px; //200px
  border-radius: 50%;
  overflow: hidden;

  //프로필
  & img:nth-child(1) {
    width: 100%;
    height: 100%;
  }
  // 메달
  & img:nth-child(2) {
    position: absolute;
    width: 65px;
    height: 65px;
    right: 20px;
  }
`;
export default TopUsers;
