import { useQuery } from '@tanstack/react-query';
import { getLikePosts } from '../../../api/myPostAPI';

import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { PostContainer } from '../../community/components/communityPostList/style';
import PostCard from './PostCard/PostCard';
import PostsSkeleton from '../../../components/mypage/postsSkeleton/PostsSkeleton';

const LikesPosts = () => {
  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;

  const {
    data: likePosts,
    isLoading,
    error
  } = useQuery({
    queryKey: ['posts', { likedPosts: true }],
    queryFn: getLikePosts,
    staleTime: 60_000
  });

  if (error) {
    console.log('데이터를 불러오지 못했습니다', error);
  }

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
