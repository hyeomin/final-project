import { useQuery } from '@tanstack/react-query';
import { getTopUsers } from '../../../../api/homeApi';
import firstPlace from '../../../../assets/home/1stPlace.png';
import secondPlace from '../../../../assets/home/2ndPlace.png';
import thirdPlace from '../../../../assets/home/3rdPlace.png';
import UserDetail from '../../../../components/UserDetail';
import TopUsersSkeleton from './skeleton/TopUsersSkeleton';
import St from './style';

const TopUsers = () => {
  const {
    data: topUsers,
    isLoading,
    error
  } = useQuery({
    queryKey: ['posts', 'topUsers'],
    queryFn: getTopUsers,
    staleTime: 60_000
  });

  if (error) {
    console.log('top10 users 가져오기 실패!', error);
  }

  return (
    <St.Container>
      <St.Title>
        <h1>TOP 10</h1>
        <h3>망고의 에코라이프 인플루언서들을 확인하세요!</h3>
      </St.Title>
      {/* <TopUsersSkeleton /> */}
      {isLoading && <TopUsersSkeleton />}
      {topUsers?.length === 0 ? (
        <>
          <St.PlaceHolder>TOP10 데이터를 찾을 수 없습니다.</St.PlaceHolder>
        </>
      ) : (
        <St.UserList>
          {topUsers?.map((user, index) => {
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
          })}
        </St.UserList>
      )}
    </St.Container>
  );
};

export default TopUsers;
