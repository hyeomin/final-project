import { useQuery } from '@tanstack/react-query';
import { getTopUsers } from 'api/homeApi';
import firstPlace from 'assets/home/1stPlace.png';
import secondPlace from 'assets/home/2ndPlace.png';
import thirdPlace from 'assets/home/3rdPlace.png';
import TopUsersSkeleton from './skeleton/TopUsersSkeleton';
import defaultUserProfile from 'assets/realMango.png';
import St from './style';
import { fetchUsers } from 'api/axios';
import { useEffect, useState } from 'react';
import { QUERY_KEYS } from 'query/keys';

const TopUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    data: topUsers,
    isLoading: topUsersIsLoading,
    error: topUsersError
  } = useQuery({
    queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.TOPUSERS],
    queryFn: getTopUsers,
    staleTime: 60_000 * 5
  });

  if (topUsersError) {
    console.log('top10 users 가져오기 실패!', topUsersError);
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const fetchedUsers = await fetchUsers();
        if (fetchedUsers) {
          setUsers(fetchedUsers);
        }
        setIsLoading(false);
      } catch (error) {
        setError('users 데이터 fetch 실패!');
        setIsLoading(false);
      }
    };

    getUsers();
  }, []);

  if (error) {
    console.log('users 데이터 가져오기 실패!', error);
  }

  return (
    <St.Container>
      <St.Title>
        <h1>TOP 10</h1>
        <h3>망고의 에코라이프 인플루언서들을 확인하세요!</h3>
      </St.Title>
      {topUsersIsLoading && isLoading && <TopUsersSkeleton />}
      {topUsers?.length === 0 ? (
        <>
          <St.PlaceHolder>TOP10 데이터를 찾을 수 없습니다.</St.PlaceHolder>
        </>
      ) : (
        <St.UserList>
          {topUsers?.map((topUser, index) => {
            const user = users.find((user) => user.uid === topUser.uid);
            return (
              <St.UserInfo key={index}>
                <St.ProfileImage>
                  <img src={user?.profileImg || defaultUserProfile} alt="profile" />
                </St.ProfileImage>
                <St.UserName>
                  {index === 0 && <img src={firstPlace} alt="firstPlace" />}
                  {index === 1 && <img src={secondPlace} alt="secondPlace" />}
                  {index === 2 && <img src={thirdPlace} alt="thirdPlace" />}
                  <span>{user?.displayName}</span>
                </St.UserName>
              </St.UserInfo>
            );
          })}
        </St.UserList>
      )}
    </St.Container>
  );
};

export default TopUsers;
