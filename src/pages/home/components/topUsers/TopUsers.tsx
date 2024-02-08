import { useQuery } from '@tanstack/react-query';
import { getTopUsers } from 'api/homeApi';
import firstPlace from 'assets/home/1stPlace.png';
import secondPlace from 'assets/home/2ndPlace.png';
import thirdPlace from 'assets/home/3rdPlace.png';
import TopUsersSkeleton from './skeleton/TopUsersSkeleton';
import defaultUserProfile from 'assets/realMango.png';
import St from './style';
import { QUERY_KEYS } from 'query/keys';
import { getAllUsers } from 'api/authApi';

const TopUsers = () => {
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

  const {
    data: users,
    isLoading: userIsLoading,
    error: usersError
  } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getAllUsers,
    staleTime: 60_000 * 5
  });

  if (usersError) {
    console.log('users 데이터 가져오기 실패!', usersError);
  }

  return (
    <St.Container>
      <St.Title>
        <h1>TOP 10</h1>
        <h2>망고의 에코라이프 인플루언서들을 확인하세요!</h2>
      </St.Title>
      {topUsersIsLoading && userIsLoading && <TopUsersSkeleton />}
      {topUsers?.length === 0 ? (
        <>
          <St.PlaceHolder>TOP10 데이터를 찾을 수 없습니다.</St.PlaceHolder>
        </>
      ) : (
        <St.UserList>
          {topUsers?.map((topUser, index) => {
            const user = users?.find((user) => user.uid === topUser.uid);
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
