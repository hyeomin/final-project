import { useQuery } from '@tanstack/react-query';
import { GoComment, GoEye, GoHeart } from 'react-icons/go';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { getPopularPosts } from 'api/homeApi';
import mangoDefaultCover from 'assets/mangoDefaultCover.png';
import PostContentPreview from 'components/PostContentPreview';
import UserDetail from 'components/UserDetail';
import { useCarouselNavigation } from 'hooks/useCarouselNavigation';
import { useLikeButton } from 'hooks/useLikeButton';
import { auth } from 'shared/firebase';
import St from './style';

import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import CarouselSkeleton from './skeleton/CarouselSkeleton';

const Carousel = () => {
  const currentUserId = auth.currentUser?.uid;

  const {
    data: popularPosts,
    isLoading,
    error
  } = useQuery({
    queryKey: ['posts', 'popular'],
    queryFn: getPopularPosts,
    staleTime: 60_000
  });
  if (error) {
    console.log('인기 게시물 가져오기 실패!', error);
  }

  const onClickLikeButton = useLikeButton();

  let swiperCnt = 7;
  const { currentSlide, handlePrev, handleNext } = useCarouselNavigation(popularPosts?.length || 0, swiperCnt);

  return (
    <St.Container>
      {/* <CarouselSkeleton /> */}
      {currentSlide > 0 && (
        <St.Button type="button" onClick={handlePrev} $buttonType="prev">
          <SlArrowLeft />
        </St.Button>
      )}
      {isLoading ? (
        <CarouselSkeleton />
      ) : (
        <St.SlideWrapper>
          <Swiper
            pagination={{
              clickable: true
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            //swiper가 initialization 되자마자 사라지는 부분으로 swiper instance를 받는 callback함수
            //onSwiper={setSwiperInstance}
            //  onSlideChange={handleSlideChange}

            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper: SwiperClass) => console.log(swiper)}
            navigation={true}
            breakpoints={{
              1200: {
                spaceBetween: 10,
                slidesPerView: 4
              },
              900: {
                spaceBetween: 10,
                slidesPerView: 3
              },
              650: {
                spaceBetween: 10,
                slidesPerView: 2
              },
              431: {
                spaceBetween: 10,
                slidesPerView: 2
              }
            }}
          >
            {popularPosts && popularPosts.length === 0 ? (
              <St.PlaceHolder>인기 게시물 데이터 없습니다.</St.PlaceHolder>
            ) : (
              popularPosts?.slice(currentSlide, currentSlide + swiperCnt).map((post, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <Link key={post.id} to={`/detail/${post.id}`}>
                      <St.Slide>
                        <St.CoverImage>
                          <img
                            src={
                              post.coverImages && post.coverImages.length > 0
                                ? post.coverImages[0].url
                                : mangoDefaultCover
                            }
                            alt={post.title}
                          />
                        </St.CoverImage>
                        <St.SlideHeader>
                          <div>
                            <St.UserProfileImage>
                              <UserDetail userId={post.uid} type="profileImg" />
                            </St.UserProfileImage>
                            <St.UserProfileName>
                              <UserDetail userId={post.uid} type="displayName" />
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
