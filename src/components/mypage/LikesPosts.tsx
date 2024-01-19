import { useQueries, useQuery } from '@tanstack/react-query';
import { GoComment, GoEye, GoHeart } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../api/authApi';
import { downloadImageURL, getAdminContents, getUserContents } from '../../api/homeApi';
import { getLikePosts } from '../../api/myPostAPI';
import Cs from '../viewAll/style';
import PostCard from './PostCard/PostCard';

const LikesPosts = () => {
  const { data: likePosts } = useQuery({
    queryKey: ['posts', { likedPosts: true }],
    queryFn: getLikePosts
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
