import { useQuery } from '@tanstack/react-query';
import { getLikePosts } from '../../api/myPostAPI';

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { PostContainer } from '../community/communityPostList/style';
import PostCard from './PostCard/PostCard';

// interface MyProfileProps {
//   getLikePosts: () => Promise<PostType[] | undefined>;
// }

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

  if (isLoading) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  if (isError) {
    return <p>오류가 발생했습니다: {error.message}</p>;
  }

  return (
    <PostContainer>
      {likePosts?.length! > 0 ? (
        likePosts?.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })
      ) : (
        <p style={{ display: 'flex', justifyContent: 'center' }}>좋아요 누른 게시물이 없습니다.</p>
      )}
    </PostContainer>
  );
};

export default LikesPosts;
