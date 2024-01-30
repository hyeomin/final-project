import { useQueries, useQuery } from '@tanstack/react-query';
import { getAdminPosts, getPopularPosts } from '../../api/homeApi';
import { getAllPosts } from '../../api/myPostAPI';
import Cs from '../viewAll/style';

import { QUERY_KEYS } from '../../query/keys';
import PostCard from './PostCard/PostCard';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const LikesPosts = () => {
  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;

  // const { data: likePosts } = useQuery({
  //   queryKey: ['posts', { likedPosts: true }],
  //   queryFn: getLikePosts
  // });

  //test
  const { data: likePosts } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getAllPosts,
    enabled: !!authCurrentUser,
    select: (data) => {
      // console.log('ddd', data);
      return data?.filter((post) => post.likedUsers.includes(authCurrentUser!.uid));
    }
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
