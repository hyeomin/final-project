import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../../api/authApi';
import { getTopUsers } from '../../../api/homeApi';
import firstPlace from '../../../assets/1stPlace.png';
import secondPlace from '../../../assets/2ndPlace.png';
import thirdPlace from '../../../assets/3rdPlace.png';
import defaultImage from '../../../assets/defaultImg.jpg';
import St from './style';

const TopUsers = () => {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  });

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
          topUsers?.map((user, idx) => {
            return (
              <St.UserInfo key={idx}>
                <St.ProfileImage>
                  {/* <img src={defaultImage} alt="profile" /> */}
                  <img src={users?.find((u) => u.uid === user.uid)?.profileImg || defaultImage} alt="profile" />
                </St.ProfileImage>
                <St.UserName>
                  {idx === 0 && <img src={firstPlace} alt="firstPlace" />}
                  {idx === 1 && <img src={secondPlace} alt="secondPlace" />}
                  {idx === 2 && <img src={thirdPlace} alt="thirdPlace" />}
                  <p>{users?.find((u) => u.uid === user.uid)?.displayName}</p>
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
