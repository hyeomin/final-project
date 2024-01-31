// UserData.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../../api/homeApi';
import defaultImage from '../../../assets/defaultImg.jpg';
import firstPlace from '../../../assets/1stPlace.png';
import secondPlace from '../../../assets/2ndPlace.png';
import thirdPlace from '../../../assets/3rdPlace.png';
import St from './style';

type Props = {
  userId: string;
  index: number;
};

const TopUserDetail = ({ userId, index }: Props) => {
  const { data: userData } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUser(userId),
    // staleTime: 5 * 6 * 1000
    staleTime: Infinity
  });

  return (
    <>
      <St.ProfileImage>
        <img src={userData?.profileImg || defaultImage} alt="profile" />
      </St.ProfileImage>
      <St.UserName>
        {index === 0 && <img src={firstPlace} alt="firstPlace" />}
        {index === 1 && <img src={secondPlace} alt="secondPlace" />}
        {index === 2 && <img src={thirdPlace} alt="thirdPlace" />}
        <p>{userData?.displayName || '닉네임 없음'}</p>
      </St.UserName>
    </>
  );
};

export default TopUserDetail;
