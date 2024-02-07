import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from 'api/axios';
import { getPopularPosts } from 'api/homeApi';
import defaultUserProfile from 'assets/realMango.png';
import PostContentPreview from 'components/PostContentPreview';
import { AuthContext } from 'context/AuthContext';
import { useLikeButton } from 'hooks/useLikeButton';
import useSwiperNavigation from 'hooks/useSwiperNavigation';
import { useContext, useEffect, useState } from 'react';
import { GoComment, GoEye, GoHeart } from 'react-icons/go';
import { Link } from 'react-router-dom';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { getThumbnailSource } from 'util/getThumbnailSource';
import CarouselSkeleton from './skeleton/CarouselSkeleton';

import swipeLeft from 'assets/icons/swipeLeft.png';
import swipeRight from 'assets/icons/swipeRight.png';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';
import St from './style';

const Carousel = () => {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const currentUserId = currentUser?.uid;

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    data: popularPosts,
    isLoading: popularPostsIsLoading,
    error: popularPostsError
  } = useQuery({
    queryKey: ['posts', 'popular'],
    queryFn: getPopularPosts,
    staleTime: 60_000
  });
  if (popularPostsError) {
    console.log('인기 게시물 가져오기 실패!', popularPostsError);
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const fetchedUsers = await fetchUsers();
        if (fetchedUsers) {
          setUsers(fetchedUsers);
        }
        setIsLoading(false);
      } catch (error) {
        setError('users 데이터 fetch 실패!');
        setIsLoading(false);
      }
    };

    getUsers();
  }, []);

  if (error) {
    console.log('users 데이터 가져오기 실패!', error);
  }

  // swiper 관련 ----
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);

  // 커스텀 Swiper handler
  const { goNext, goPrev } = useSwiperNavigation({
    swiperInstance,
    currentIndex,
    setCurrentIndex,
    maxIndex: popularPosts ? popularPosts.length - 1 : 0
  });

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentIndex(swiper.realIndex);
  };
  // ---- swiper 관련

  const onClickLikeButton = useLikeButton();

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
      {popularPostsIsLoading && isLoading ? (
        <CarouselSkeleton />
      ) : (
        <St.SlideWrapper>
          <Swiper
            pagination={{
              clickable: true
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            // onSlideChange={() => {}}
            // onSwiper={(swiper: SwiperClass) => {}}
            onSwiper={setSwiperInstance}
            onSlideChange={handleSlideChange}
            navigation={true}
            slidesPerView={slidesPerView}
          >
            {popularPosts && popularPosts.length === 0 ? (
              <St.PlaceHolder>인기 게시물 데이터 없습니다.</St.PlaceHolder>
            ) : (
              popularPosts?.map((post, idx) => {
                const user = users.find((user) => user.uid === post.uid);
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
      {popularPosts && (
        <NavigationButtonContainer>
          <div onClick={goPrev}>{currentIndex > 0 && <img src={swipeLeft} alt="Previous" />}</div>
          <div onClick={goNext}>
            {currentIndex < Math.floor(popularPosts.length - slidesPerView) && <img src={swipeRight} alt="Next" />}
          </div>
        </NavigationButtonContainer>
      )}
    </St.Container>
  );
};

export default Carousel;

const NavigationButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;

  & div {
    cursor: pointer;
  }

  & img {
    width: 60px;
  }

  @media screen and (max-width: 431px) {
    width: 85vw;

    & img {
      width: 40px;
    }
  }
`;
