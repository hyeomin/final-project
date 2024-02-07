import { useQuery } from '@tanstack/react-query';
import { getPopularPosts } from 'api/homeApi';
import defaultUserProfile from 'assets/realMango.png';
import PostContentPreview from 'components/PostContentPreview';
import { AuthContext } from 'context/AuthContext';
import { useCarouselNavigation } from 'hooks/useCarouselNavigation';
import { useLikeButton } from 'hooks/useLikeButton';
import { useContext, useEffect, useState } from 'react';
import { GoComment, GoEye, GoHeart } from 'react-icons/go';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { getThumbnailSource } from 'util/getThumbnailSource';
import CarouselSkeleton from './skeleton/CarouselSkeleton';
import St from './style';
import { QUERY_KEYS } from 'query/keys';
import { getAllUsers } from 'api/authApi';

const Carousel = () => {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const currentUserId = currentUser?.uid;

  const {
    data: popularPosts,
    isLoading: popularPostsIsLoading,
    error: popularPostsError
  } = useQuery({
    queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.POPULAR],
    queryFn: getPopularPosts,
    staleTime: 60_000 * 5
  });
  if (popularPostsError) {
    console.log('인기 게시물 가져오기 실패!', popularPostsError);
  }

  const {
    data: users,
    isLoading: userIsLoading,
    error: usersError
  } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getAllUsers,
    staleTime: 60_000 * 5
  });

  if (usersError) {
    console.log('users 데이터 가져오기 실패!', usersError);
  }

  const onClickLikeButton = useLikeButton();

  let swiperCnt = 7;
  const { currentSlide, handlePrev, handleNext } = useCarouselNavigation(popularPosts?.length || 0, swiperCnt);

  const [slidesPerView, setSlidesPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 431) {
        setSlidesPerView(1);
      } else {
        setSlidesPerView(4);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <St.Container>
      {currentSlide > 0 && (
        <St.Button type="button" onClick={handlePrev} $buttonType="prev">
          <SlArrowLeft />
        </St.Button>
      )}
      {popularPostsIsLoading && userIsLoading ? (
        <CarouselSkeleton />
      ) : (
        <St.SlideWrapper>
          <Swiper
            pagination={{
              clickable: true
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            onSlideChange={() => {}}
            onSwiper={(swiper: SwiperClass) => {}}
            navigation={true}
            slidesPerView={slidesPerView}
          >
            {popularPosts && popularPosts.length === 0 ? (
              <St.PlaceHolder>인기 게시물 데이터 없습니다.</St.PlaceHolder>
            ) : (
              popularPosts?.slice(currentSlide, currentSlide + swiperCnt).map((post, idx) => {
                const user = users?.find((user) => user.uid === post.uid);
                return (
                  <SwiperSlide key={idx}>
                    <Link key={post.id} to={`/detail/${post.id}`}>
                      <St.Slide>
                        <St.CoverImage>
                          <img src={getThumbnailSource(post.coverImages)} alt={post.title} />
                        </St.CoverImage>
                        <St.SlideHeader>
                          <div>
                            <St.UserProfileImage>
                              <img src={user?.profileImg || defaultUserProfile} alt="profile" />
                            </St.UserProfileImage>
                            <St.UserProfileName>
                              <span>{user?.displayName}</span>
                            </St.UserProfileName>
                          </div>
                          <button type="button" onClick={(e) => onClickLikeButton(e, post.id)}>
                            {currentUserId && post.likedUsers?.includes(currentUserId) ? (
                              <St.HeartFillIcon />
                            ) : (
                              <St.HeartIcon />
                            )}
                          </button>
                        </St.SlideHeader>
                        <St.SlideBottom>
                          <St.TitleAndContent>
                            <h1>{post.title}</h1>
                            <div>
                              <PostContentPreview postContent={post.content || ''} />
                            </div>
                          </St.TitleAndContent>
                          <St.InteractionInfo>
                            <div>
                              <GoEye />
                              <span>{post.viewCount?.toLocaleString() || 0}</span>
                            </div>
                            <div>
                              <GoHeart />
                              <span>{post.likeCount?.toLocaleString() || 0}</span>
                            </div>
                            <div>
                              <GoComment />
                              <span>{post.commentCount?.toLocaleString() || 0}</span>
                            </div>
                          </St.InteractionInfo>
                        </St.SlideBottom>
                      </St.Slide>
                    </Link>
                  </SwiperSlide>
                );
              })
            )}
          </Swiper>
        </St.SlideWrapper>
      )}

      {popularPosts && currentSlide < popularPosts.length - swiperCnt && (
        <St.Button type="button" onClick={handleNext} $buttonType="next">
          <SlArrowRight />
        </St.Button>
      )}
    </St.Container>
  );
};

export default Carousel;
