import React, { useState } from 'react';
import { GoComment, GoEye, GoHeart, GoHeartFill } from 'react-icons/go';
import styled, { css } from 'styled-components';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import St from './style';
import { useQuery } from '@tanstack/react-query';
import defaultProfileImage from '../../../../assets/defaultImg.jpg';
import defaultCoverImage from '../../../../assets/defaultCoverImg.jpeg';
import { Link } from 'react-router-dom';
import { auth } from '../../../../shared/firebase';
import { getPopularPosts } from '../../../../api/homeApi';
import { getAllUsers } from '../../../../api/authApi';
import { useLikeButton } from '../../../../hooks/useLikeButton';
import { useCarouselNavigation } from '../../../../hooks/useCarouselNavigation';
import PostContentPreview from '../../../common/PostContentPreview';
import Loader from '../../../common/Loader';

const Carousel = () => {
  const currentUser = auth.currentUser?.uid;

  const { data: popularPosts, isLoading } = useQuery({
    queryKey: ['popularPosts'],
    queryFn: getPopularPosts
  });

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  });

  const onClickLikeButton = useLikeButton();

  const { currentSlide, handlePrev, handleNext } = useCarouselNavigation(popularPosts?.length || 0, 4);

  return (
    <St.Container>
      {currentSlide > 0 && (
        <St.Button type="button" onClick={handlePrev} $buttonType="prev">
          <SlArrowLeft />
        </St.Button>
      )}
      <St.SlideWrapper>
        {isLoading ? (
          <Loader />
        ) : popularPosts && popularPosts.length === 0 ? (
          <div>인기 게시물 데이터 없습니다.</div>
        ) : (
          popularPosts?.slice(currentSlide, currentSlide + 4).map((post) => {
            return (
              <Link key={post.id} to={`/detail/${post.id}`}>
                <St.Slide>
                  <St.CoverImage>
                    {/* TODO 이미지가 늦게 로드되는 문제 해결해야함 */}
                    {/* <img
                      src={
                        post.coverImages && post.coverImages.length > 0 ? post.coverImages[0].url : defaultCoverImage
                      }
                      alt={post.title}
                    /> */}
                    <img src={defaultCoverImage} alt={post.title} />
                  </St.CoverImage>
                  <St.SlideHeader>
                    <div>
                      <St.UserProfileImage>
                        {/* <img
                          src={users?.find((user) => user.uid === post.uid)?.profileImg || defaultProfileImage}
                          alt="user profile image"
                        /> */}
                        <img src={defaultProfileImage} alt="user profile image" />
                      </St.UserProfileImage>
                      <span>{users?.find((user) => user.uid === post.uid)?.displayName}</span>
                    </div>
                    <button type="button" onClick={(e) => onClickLikeButton(e, post.id)}>
                      {currentUser && post.likedUsers?.includes(currentUser) ? <St.HeartFillIcon /> : <St.HeartIcon />}
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
            );
          })
        )}
      </St.SlideWrapper>
      {popularPosts && currentSlide < popularPosts.length - 4 && (
        <St.Button type="button" onClick={handleNext} $buttonType="next">
          <SlArrowRight />
        </St.Button>
      )}
    </St.Container>
  );
};

export default Carousel;
