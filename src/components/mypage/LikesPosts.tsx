import { useQueries, useQuery } from '@tanstack/react-query';
import { GoComment, GoEye, GoHeart } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../api/authApi';
import { downloadImageURL, getAdminContents, getPopularContents } from '../../api/homeApi';
import { getLikePosts } from '../../api/myPostAPI';
import Cs from '../viewAll/style';

import PostCard from './PostCard/PostCard';
import { QUERY_KEYS } from '../../query/keys';


const LikesPosts = () => {
  const { data: likePosts } = useQuery({
    queryKey: ['posts', { likedPosts: true }],
    queryFn: getLikePosts
  });
  console.log('이거이거이거 ===>', likePosts);

  const postQueries = useQueries({
    queries: [
      {
        queryKey: ['adminContents'],
        queryFn: getAdminContents
      },
      {
        queryKey: [QUERY_KEYS.USERPOSTS],
        queryFn: getPopularContents
      }
    ]
  });

  //필터된 posts 목록 (망고관리자 게시물은 임시로 둔다.)
  // const createdByMango = postQueries[0].data || [];
  const myPosts = postQueries[1].data || [];

  // 이미지URL 불러오기
  const imageQueries = useQueries({
    queries:
      likePosts?.map((post) => ({
        queryKey: ['imageURL', post.id],
        queryFn: () => downloadImageURL(post.id as string)
      })) || []
  });

  function removeImageTags(htmlContent: string) {
    return htmlContent.replace(/<img[^>]*>|<p[^>]*>(?:\s*<br[^>]*>\s*|)\s*<\/p>/g, '');
  }

  return (
    <Cs.Contents>
      {likePosts?.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </Cs.Contents>
  );
};

export default LikesPosts;
