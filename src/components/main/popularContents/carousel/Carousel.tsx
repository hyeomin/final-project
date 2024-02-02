import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { GoComment, GoEye, GoHeart } from 'react-icons/go';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../../../../api/authApi';
import { getPopularPosts } from '../../../../api/homeApi';
import defaultProfileImage from '../../../../assets/defaultImg.jpg';
import mangoDefaultCover from '../../../../assets/mangoDefaultCover.png';
import { AuthContext } from '../../../../context/AuthContext';
import { useCarouselNavigation } from '../../../../hooks/useCarouselNavigation';
import { useLikeButton } from '../../../../hooks/useLikeButton';
import Loader from '../../../common/Loader';
import PostContentPreview from '../../../common/PostContentPreview';
import St from './style';
import UserDetail from '../../UserDetail';
import CarouselSkeleton from './skeleton/CarouselSkeleton';
import { auth } from '../../../../shared/firebase';

import { Swiper, SwiperClass, SwiperSlide, useSwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const Carousel = () => {
  const currentUserId = auth.currentUser?.uid;

  const { data: popularPosts, isLoading } = useQuery({
    queryKey: ['posts', 'popular'],
    queryFn: getPopularPosts,
    staleTime: 5 * 6 * 1000
    // staleTime: Infinity
  });

  // console.log('인기게시물==>', popularPosts);
  const onClickLikeButton = useLikeButton();

  let swiperCnt = 5;
  const { currentSlide, handlePrev, handleNext } = useCarouselNavigation(popularPosts?.length || 0, swiperCnt);
  //const swiperSlide = useSwiperSlide();

  return (
    <St.Container>
      {currentSlide > 0 && (
        <St.Button type="button" onClick={handlePrev} $buttonType="prev">
          <SlArrowLeft />
        </St.Button>
      )}

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
            spaceBetween: 20,
            slidesPerView: 4
          },
          900: {
            spaceBetween: 20,
            slidesPerView: 3
          },
          650: {
            spaceBetween: 10,
            slidesPerView: 2
          },
          431: {
            spaceBetween: 10,
            slidesPerView: 3
          }
        }}
      >
        {/* <St.SlideWrapper> */}
        {popularPosts && popularPosts.length === 0 ? (
          <St.PlaceHolder>인기 게시물 데이터 없습니다.</St.PlaceHolder>
        ) : (
          popularPosts?.slice(currentSlide, currentSlide + swiperCnt).map((post, idx) => {
            return (
              <Link key={post.id} to={`/detail/${post.id}`}>
                {/* <CarouselSkeleton /> */}

                <SwiperSlide key={idx}>
                  <St.Slide>
                    <St.CoverImage>
                      <img
                        src={
                          post.coverImages && post.coverImages.length > 0 ? post.coverImages[0].url : mangoDefaultCover
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
                </SwiperSlide>
              </Link>
            );
          })
        )}
        {/* </St.SlideWrapper> */}
      </Swiper>

      {popularPosts && currentSlide < popularPosts.length - swiperCnt && (
        <St.Button type="button" onClick={handleNext} $buttonType="next">
          <SlArrowRight />
        </St.Button>
      )}
    </St.Container>
  );
};

export default Carousel;
