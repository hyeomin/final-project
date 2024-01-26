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

const UserContents = () => {
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

  return (
    <St.UserContents>
      <St.TitleContainer>
        <h1>인기 게시물</h1>
        <St.SubTitle>
          <p>망고에서 제일 인기 있는 게시물들을 둘러보세요.</p>
          <Link to={'/viewAll'}>
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
{
  /* <St.PostsSlide>
  <St.ThumbnailsBox>
    <Swiper
      spaceBetween={10}
      slidesPerView={4}
      pagination={{
        clickable: true
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="default-swiper"
    >
      {popularPosts?.length === 0 ? (
        <div>인기 게시물 데이터 없습니다.</div>
      ) : (
        popularPosts?.map((item, idx) => {
          return (
            <St.StyledSwiperSlide key={idx} className="default-swiper">
              <St.UserPostCover to={`/detail/${item.id}`}>
                <St.TextAndLikeButton>
                  <St.InfoTop>
                    <St.UserInfo>
                      <div>
                        <img
                          src={users?.find((user) => user.uid === item.uid)?.profileImg || defaultUserImage}
                          alt="user profile image"
                        />
                      </div>
                      <div>{users?.find((user) => user.uid === item.uid)?.displayName}</div>
                    </St.UserInfo>
                    <St.LikeButton type="button" onClick={(e) => onClickLikeButton(e, item.id)}>
                      {currentUser && item.likedUsers?.includes(currentUser) ? <St.HeartFillIcon /> : <St.HeartIcon />}
                    </St.LikeButton>
                  </St.InfoTop>
                  <St.InfoBottom>
                    <St.BottomText>
                      <div>{item.title}</div>
                      <div>
                        <PostContentPreview postContent={item.content || ''} />
                      </div>
                    </St.BottomText>
                    <St.Count>
                      <GoEye />
                      <span>{item.viewCount?.toLocaleString() || 0}</span>
                      <GoHeart />
                      <span>{item.likeCount?.toLocaleString() || 0}</span>
                      <GoComment />
                      <span>{item.commentCount?.toLocaleString() || 0}</span>
                    </St.Count>
                  </St.InfoBottom>
                </St.TextAndLikeButton>
                {!item ? (
                  <Loader />
                ) : (
                  <img
                    src={item.coverImages && item.coverImages.length > 0 ? item.coverImages[0].url : mangoCover}
                    alt={item.title}
                  />
                  // <img src={mangoCover} alt={item.title} />
                )}
              </St.UserPostCover>
            </St.StyledSwiperSlide>
          );
        })
      )}
    </Swiper>
  </St.ThumbnailsBox>
</St.PostsSlide>; */
}

export default UserContents;
