import React from 'react';
import defaultImage from '../../../assets/defaultImg.jpg';
import firstPlace from '../../../assets/1stPlace.png';
import secondPlace from '../../../assets/2ndPlace.png';
import thirdPlace from '../../../assets/3rdPlace.png';
import { styled } from 'styled-components';
import style from '../admin/style';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../../query/keys';
import { getAllUsers } from '../../../api/authApi';
import { getTopRankedUsers } from '../../../api/homeApi';

const UserRanking = () => {
  // 유저정보 가져오기(profileImg)
  // const { data: users } = useQuery({
  //   queryKey: [QUERY_KEYS.USERPOSTS],
  //   queryFn: getAllUsers
  // });
  // console.log('유저 목록===>', users);

  const { data: topTenUsers } = useQuery({
    queryKey: ['topTenUsers'],
    queryFn: getTopRankedUsers
  });

  return (
    <Container>
      <Title>
        <h1>TOP 10</h1>
        <h3>친환경 습관 만렙! 상위 랭킹 유저들의 노하우를 살펴보세요!</h3>
      </Title>
      <UserList>
        <UserCard>
          <img src={defaultImage} alt="profile" />
          <img src={firstPlace} alt="firstPlace" />
          <p>유저닉네임</p>
        </UserCard>
        <UserCard>
          <img src={defaultImage} alt="profile" />
          <img src={secondPlace} alt="secondPlace" />
          <p>유저닉네임</p>
        </UserCard>
        <UserCard>
          <img src={defaultImage} alt="profile" />
          <img src={thirdPlace} alt="thirdPlace" />
          <p>유저닉네임</p>
        </UserCard>
        <UserCard>
          <img src={defaultImage} alt="profile" />
          <p>유저닉네임</p>
        </UserCard>
        <UserCard>
          <img src={defaultImage} alt="profile" />
          <p>유저닉네임</p>
        </UserCard>
        <UserCard>
          <img src={defaultImage} alt="profile" />
          <p>유저닉네임</p>
        </UserCard>
        <UserCard>
          <img src={defaultImage} alt="profile" />
          <p>유저닉네임</p>
        </UserCard>
        <UserCard>
          <img src={defaultImage} alt="profile" />
          <p>유저닉네임</p>
        </UserCard>
      </UserList>
    </Container>
  );
};

const Container = styled.section`
  background-color: burlywood;
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
  width: 89%; // 100%
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto auto;
  gap: 30px; // 40px
`;

const UserCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 230px;
  background-color: palegreen;
  & img:nth-child(1) {
    width: 150px; //200px
    height: 150px; //200px
    background-color: #fff;
    border-radius: 20px;
  }
  & img:nth-child(2) {
    position: absolute;
    right: 0;
    width: 65px;
    height: 65px;
  }
  & p {
    margin-top: 10px;
  }
`;
export default UserRanking;
