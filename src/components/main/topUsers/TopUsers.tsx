import { useQuery } from '@tanstack/react-query';
import { getTopUsers } from '../../../api/homeApi';
import St from './style';
import TopUserDetail from './TopUserDetail';

const TopUsers = () => {
  console.log('TopUsers 렌더링!');

  const { data: topUsers } = useQuery({
    queryKey: ['topUsers'],
    queryFn: getTopUsers
  });

  return (
    <St.Container>
      <St.Title>
        <h1>TOP 10</h1>
        <h3>망고의 에코라이프 인플루언서들을 확인하세요!</h3>
      </St.Title>
      <St.UserList>
        {topUsers?.length === 0 ? (
          <div>TOP10 데이터를 찾을 수 없습니다.</div>
        ) : (
          topUsers?.map((user, index) => {
            return (
              <St.UserInfo key={index}>
                <TopUserDetail userId={user.uid} index={index} />
              </St.UserInfo>
            );
          })
        )}
      </St.UserList>
    </St.Container>
  );
};

export default TopUsers;
