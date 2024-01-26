import { useQueries, useQuery } from '@tanstack/react-query';
import { getAdminPosts, getPopularPosts } from '../../api/homeApi';
import { getLikePosts } from '../../api/myPostAPI';
import Cs from '../viewAll/style';

import { QUERY_KEYS } from '../../query/keys';
import PostCard from './PostCard/PostCard';

const LikesPosts = () => {
  const { data: likePosts } = useQuery({
    queryKey: ['posts', { likedPosts: true }],
    queryFn: getLikePosts
  });

  const postQueries = useQueries({
    queries: [
      {
        queryKey: ['adminContents'],
        queryFn: getAdminPosts
      },
      {
        queryKey: [QUERY_KEYS.USERPOSTS],
        queryFn: getPopularPosts
      }
    ]
  });

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
