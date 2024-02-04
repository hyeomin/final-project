import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { getMyPosts } from '../../../api/myPostAPI';
import { AuthContext } from '../../../context/AuthContext';
import { QUERY_KEYS } from '../../../query/keys';
import { PostContainer } from '../../community/components/communityPostList/style';
import PostCard from './PostCard/PostCard';

// 내 게시물 가져오기
const MyPosts = () => {
  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;

  //test
  const { data: myPosts } = useQuery({
    queryKey: [QUERY_KEYS.POSTS, 'myPosts'],
    queryFn: getMyPosts,
    enabled: !!authCurrentUser,
    staleTime: 60_000
  });

  return (
    <PostContainer>
      {myPosts?.length! > 0 ? (
        myPosts?.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p style={{ display: 'flex', justifyContent: 'center' }}>내 게시물이 없습니다.</p>
      )}
    </PostContainer>
  );
};
export default MyPosts;
