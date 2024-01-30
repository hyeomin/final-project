import { useQuery } from '@tanstack/react-query';
import { getMyPosts } from '../../api/myPostAPI';
import { auth } from '../../shared/firebase';
import Cs from '../viewAll/style';
import PostCard from '../mypage/PostCard/PostCard';
import HabitCalendar from './HabitCalendar/HabitCalendar';
// 내 게시물 가져오기
const MyPosts = () => {
  const { data: myPosts } = useQuery({
    queryKey: ['posts', { isMyPosts: true }],
    queryFn: getMyPosts,
    enabled: !!auth.currentUser
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
