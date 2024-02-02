import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../api/authApi';
import defaultUserProfile from '../../assets/realMango.png';

type Props = {
  userId: string;
  type: 'profileImg' | 'displayName';
};

const UserDetail = ({ userId, type }: Props) => {
  const { data: userData } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUser(userId),
    staleTime: 60_000
  });

  return (
    <>
      {type === 'profileImg' ? (
        <img src={userData?.profileImg || defaultUserProfile} alt="profile" />
      ) : (
        <span>{userData?.displayName}</span>
      )}
    </>
  );
};

export default UserDetail;
