import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GoComment, GoEye, GoHeart } from 'react-icons/go';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper } from 'swiper/react';
import { getAllUsers } from '../../../api/authApi';
import { getPopularPosts } from '../../../api/homeApi';

import { useLikeButton } from '../../../hooks/useLikeButton';
import { auth } from '../../../shared/firebase';
import Loader from '../../common/Loader';
import PostContentPreview from '../../common/PostContentPreview';
import '../swiperStyle.css';
import St from './style';
import Carousel from './carousel/Carousel';
import { QUERY_KEYS } from '../../../query/keys';
import { getAdminPostList } from '../../../api/pageListApi';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

const PopularContents = () => {
  console.log('PopularContents 렌더링!');
  // hover 시 prefetch 함수
  const queryClient = useQueryClient();
  const handleHover = async () => {
    queryClient.prefetchInfiniteQuery({
      queryKey: [QUERY_KEYS.ADMIN],
      queryFn: getAdminPostList,
      initialPageParam: undefined as undefined | QueryDocumentSnapshot<DocumentData, DocumentData>,
      staleTime: 60000
    });
  };

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <St.UserContents>
      <St.TitleContainer>
        <h1>인기 게시물</h1>
        <St.SubTitle>
          <p>망고에서 제일 인기 있는 게시물들을 둘러보세요.</p>
          <Link to={'/viewAll'} onClick={handleLinkClick}>
            <button type="button" onMouseEnter={handleHover}>
              {'전체보기 >'}
            </button>
          </Link>
        </St.SubTitle>
      </St.TitleContainer>
      <Carousel />
    </St.UserContents>
  );
};

export default PopularContents;
