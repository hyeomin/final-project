import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { getMyPosts } from '../../api/myPostAPI';
import { AuthContext } from '../../context/AuthContext';
import { QUERY_KEYS } from '../../query/keys';
import PostsSkeleton from './postsSkeleton/PostsSkeleton';
import { PostContainer } from '../../pages/community/components/communityPostList/style';
import PostCard from '../../pages/mypage/components/PostCard/PostCard';

// 내 게시물 가져오기
const MyPosts = () => {
  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;

  //test
  const {
    data: myPosts,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: [QUERY_KEYS.POSTS, 'myPosts'],
    queryFn: getMyPosts,
    enabled: !!authCurrentUser,
    staleTime: 60_000
  });

  if (isLoading) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  if (isError) {
    return <p>오류가 발생했습니다: {error.message}</p>;
  }

  return (
    <>
      {isLoading && <PostsSkeleton />}
      <PostContainer>
        {myPosts?.length! > 0 ? (
          myPosts?.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p style={{ display: 'flex', justifyContent: 'center' }}>내 게시물이 없습니다.</p>
        )}
        {/* {myPosts?.length === 0 ? (
          <p style={{ display: 'flex', justifyContent: 'center' }}>내 게시물이 없습니다.</p>
        ) : (
          myPosts?.map((post) => <PostCard key={post.id} post={post} />)
        )} */}
      </PostContainer>
    </>
  );
};
export default MyPosts;
