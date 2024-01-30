import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getUser } from '../../../../api/authApi';
import defaultProfileImage from '../../../../assets/realMango.png';
import St from './style';

type Props = {
  userId: string;
};

const UserDetail = ({ userId }: Props) => {
  const { data: userData } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUser(userId)
    // staleTime: Infinity
  });

  return (
    <div>
      <St.UserProfileImage>
        <img src={userData?.profileImg || defaultProfileImage} alt="user profile image" />
        {/* <img src={defaultProfileImage} alt="user profile image" /> */}
      </St.UserProfileImage>
      <span>{userData?.displayName}</span>
    </div>
  );
};

export default UserDetail;
