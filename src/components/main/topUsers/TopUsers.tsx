import { useQuery } from '@tanstack/react-query';
import { getTopUsers } from '../../../api/homeApi';
import St from './style';
import UserDetail from '../UserDetail';
import firstPlace from '../../../assets/1stPlace.png';
import secondPlace from '../../../assets/2ndPlace.png';
import thirdPlace from '../../../assets/3rdPlace.png';
import TopUsersSkeleton from './skeleton/TopUsersSkeleton';

const TopUsers = () => {
  const { data: topUsers, isLoading } = useQuery({
    queryKey: ['posts', 'topUsers'],
    queryFn: getTopUsers,
    staleTime: 60_000
  });

  return (
    <St.Container>
      <St.Title>
        <h1>TOP 10</h1>
        <h3>망고의 에코라이프 인플루언서들을 확인하세요!</h3>
      </St.Title>
      {isLoading && <TopUsersSkeleton />}
      <St.UserList>
        {topUsers?.length === 0 ? (
          <div>TOP10 데이터를 찾을 수 없습니다.</div>
        ) : (
          topUsers?.map((user, index) => {
            return (
              <St.UserInfo key={index}>
                <St.ProfileImage>
                  <UserDetail userId={user.uid} type="profileImg" />
                </St.ProfileImage>
                <St.UserName>
                  {index === 0 && <img src={firstPlace} alt="firstPlace" />}
                  {index === 1 && <img src={secondPlace} alt="secondPlace" />}
                  {index === 2 && <img src={thirdPlace} alt="thirdPlace" />}
                  <UserDetail userId={user.uid} type="displayName" />
                </St.UserName>
              </St.UserInfo>
            );
          })
        )}
      </St.UserList>
    </St.Container>
  );
};

export default TopUsers;
