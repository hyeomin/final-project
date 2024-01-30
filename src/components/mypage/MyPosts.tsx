import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../../api/myPostAPI';
import { auth } from '../../shared/firebase';
import Cs from '../viewAll/style';
import PostCard from '../mypage/PostCard/PostCard';
import HabitCalendar from './HabitCalendar/HabitCalendar';
import { QUERY_KEYS } from '../../query/keys';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

// 내 게시물 가져오기
const MyPosts = () => {
  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;

  //   const { data: myPosts } = useQuery({
  //     queryKey: ['posts', { isMyPosts: true }],
  //     queryFn: getMyPosts,
  //     enabled: !!auth.currentUser
  //   });

  //test
  const { data: myPosts } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getAllPosts,
    enabled: !!authCurrentUser,

    select: (data) => {
      console.log('data', myPosts);
      return data?.filter((post) => post.uid === authCurrentUser?.uid!);
    }
  });

  return (
    <Cs.Contents>
      {myPosts?.length! > 0 ? (
        myPosts?.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p style={{ display: 'flex', justifyContent: 'center' }}>내 게시물이 없습니다.</p>
      )}
    </Cs.Contents>
  );
};
export default MyPosts;
