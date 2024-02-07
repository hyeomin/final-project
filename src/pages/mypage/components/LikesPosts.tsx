import { useQuery } from '@tanstack/react-query';
import { getLikePosts } from 'api/myPostAPI';
import PostsSkeleton from 'components/mypage/postsSkeleton/PostsSkeleton';
import { AuthContext } from 'context/AuthContext';
import { PostContainer } from 'pages/community/components/communityPostList/style';
import { QUERY_KEYS } from 'query/keys';
import { useContext } from 'react';
import PostCard from './PostCard/PostCard';

const LikesPosts = () => {
  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;

  const {
    data: likePosts,
    isLoading,
    error
  } = useQuery({
    queryKey: [QUERY_KEYS.POSTS, { likedPosts: true }],
    queryFn: getLikePosts,
    staleTime: 60_000
  });

  if (error) {
    console.error('데이터를 불러오지 못했습니다', error);
  }

  return (
    <>
      <PostContainer>
        {likePosts?.length === 0 ? (
          <p style={{ display: 'flex', justifyContent: 'center' }}>좋아요 누른 게시물이 없습니다.</p>
        ) : (
          likePosts?.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })
        )}
      </PostContainer>
    </>
  );
};

export default LikesPosts;
