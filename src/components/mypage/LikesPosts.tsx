import { useQueries, useQuery } from '@tanstack/react-query';
import { getAdminPosts, getPopularPosts } from '../../api/homeApi';
import { getLikePosts } from '../../api/myPostAPI';
import Cs from '../viewAll/style';

import { QUERY_KEYS } from '../../query/keys';
import PostCard from './PostCard/PostCard';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { PostType } from '../../types/PostType';

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
    <Cs.Contents>
      {likePosts?.length! > 0 ? (
        likePosts?.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })
      ) : (
        <p style={{ display: 'flex', justifyContent: 'center' }}>좋아요 누른 게시물이 없습니다.</p>
      )}
    </Cs.Contents>
  );
};

export default LikesPosts;
