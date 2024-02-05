import { useQuery } from '@tanstack/react-query';
import { getLikePosts } from '../../../api/myPostAPI';

import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { PostContainer } from '../../community/components/communityPostList/style';
import PostCard from './PostCard/PostCard';
import PostCardSkeleton from './PostCard/PostCardSkeleton/PostCardSkeleton';
import PostsSkeleton from '../../../components/mypage/postsSkeleton/PostsSkeleton';

const LikesPosts = () => {
  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;

  const {
    data: likePosts,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['posts', { likedPosts: true }],
    queryFn: getLikePosts,
    staleTime: 60_000
  });

  return (
    <>
      {isLoading && <PostsSkeleton />}
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
