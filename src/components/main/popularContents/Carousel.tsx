import React, { useState } from 'react';
import { GoComment, GoEye, GoHeart, GoHeartFill } from 'react-icons/go';
import styled from 'styled-components';
import defaultCoverImage from '../../../assets/defaultCoverImg.jpeg';
import defaultProfileImage from '../../../assets/defaultImg.jpg';
import { Link } from 'react-router-dom';
import { auth } from '../../../shared/firebase';
import { useQuery } from '@tanstack/react-query';
import { getPopularPosts } from '../../../api/homeApi';
import Loader from '../../common/Loader';
import { useLikeButton } from '../../../hooks/useLikeButton';
import { getAllUsers } from '../../../api/authApi';
import PostContentPreview from '../../common/PostContentPreview';
import PostCard from '../../mypage/PostCard/PostCard';

const Carousel = () => {
  const currentUser = auth.currentUser?.uid;
  const [currentSlide, setCurrentSlide] = useState(0);

  // 인기게시물
  const { data: popularPosts, isLoading } = useQuery({
    queryKey: ['popularPosts'],
    queryFn: getPopularPosts
  });

  // console.log('popularPosts==>', popularPosts);

  // // 유저정보 가져오기(profileImg)
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  });

  // //좋아요
  const onClickLikeButton = useLikeButton();

  if (isLoading) {
    return <Loader />;
  }

  const handlePrev = () => {
    setCurrentSlide((prevIndex) => (prevIndex - 4 < 0 ? 0 : prevIndex - 4));
  };

  const handleNext = () => {
    setCurrentSlide((prevIndex) => (popularPosts && prevIndex + 4 >= popularPosts.length ? prevIndex : prevIndex + 3));
  };
  const slidesToShow = 4;
  const firstSlideIndex = currentSlide;
  const lastSlideIndex = firstSlideIndex + slidesToShow;

  return (
    <Container>
      <PrevButton type="button" onClick={handlePrev}>
        &lt;
      </PrevButton>
      <SlidesWrapper>
        {popularPosts && popularPosts.length === 0 ? (
          <div>인기 게시물 데이터 없습니다.</div>
        ) : (
          popularPosts?.slice(firstSlideIndex, lastSlideIndex).map((post) => {
            return (
              <Link key={post.id} to={`/detail/${post.id}`}>
                <Slide>
                  <CoverImage>
                    {!post ? (
                      <Loader />
                    ) : (
                      <img
                        src={
                          post.coverImages && post.coverImages.length > 0 ? post.coverImages[0].url : defaultCoverImage
                        }
                        alt={post.title}
                      />
                    )}
                  </CoverImage>
                  <SlideHeader>
                    <div>
                      <UserProfileImage>
                        <img
                          src={users?.find((user) => user.uid === post.uid)?.profileImg || defaultProfileImage}
                          alt="user profile image"
                        />
                      </UserProfileImage>
                      <span>{users?.find((user) => user.uid === post.uid)?.displayName}</span>
                    </div>
                    <button type="button" onClick={(e) => onClickLikeButton(e, post.id)}>
                      {currentUser && post.likedUsers?.includes(currentUser) ? <GoHeartFill /> : <GoHeart />}
                    </button>
                  </SlideHeader>
                  <SlideBottom>
                    <SummaryLines>
                      <h1>{post.title}</h1>
                      <div>
                        <PostContentPreview postContent={post.content || ''} />
                      </div>
                    </SummaryLines>
                    <InteractionInfo>
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
                    </InteractionInfo>
                  </SlideBottom>
                </Slide>
              </Link>
            );
          })
        )}
      </SlidesWrapper>
      <NextButton type="button" onClick={handleNext}>
        &gt;
      </NextButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  /* background-color: #f4bdbd; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 77px; */
  padding: 0;
`;

const SlidesWrapper = styled.div`
  display: flex;
  width: 90%;
  height: 406px;
  gap: 10px;
  /* background-color: #b5b5f7; */
`;

const Slide = styled.div`
  position: relative;
  background-color: #d2f9eb;
  width: 220px;
  height: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 13px 20px 20px;
  transition: opacity 0.5s ease;
  overflow: hidden;
  cursor: pointer;
`;

const CoverImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  & img {
    width: 100%;
    height: 100%;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const SlideHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 1;
  & div {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
  }
  & button {
    all: unset;
    font-size: 21px;
    color: #fff;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

const UserProfileImage = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const SlideBottom = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 185px; // Slide width 변경시 함께 변경
`;

const SummaryLines = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  & h1 {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  & div {
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    line-height: 150%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const InteractionInfo = styled.div`
  display: flex;
  gap: 10px;
  & div {
    display: flex;
    align-items: center;
    gap: 2px;
    color: #fff;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
  }
`;

const PrevButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  all: unset;
  margin-right: 10px;
  /* background-color: #addddd; */
  font-size: 50px;
  color: #fbebeb;
  cursor: pointer;
  &:hover {
    color: #ededed;
  }
`;
const NextButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  all: unset;
  margin-left: 10px;
  /* background-color: #addddd; */
  font-size: 50px;
  color: #fbebeb;
  cursor: pointer;
  &:hover {
    color: #ededed;
  }
`;
export default Carousel;
