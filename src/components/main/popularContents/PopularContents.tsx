import React from 'react';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { GoComment, GoEye, GoHeart } from 'react-icons/go';
import { auth } from '../../../shared/firebase';
import { getAllUsers } from '../../../api/authApi';
import { downloadImageURL, getPopularContents } from '../../../api/homeApi';
import { QUERY_KEYS } from '../../../query/keys';
import St from './style';
import Loader from '../../common/Loader';
import defaultCover from '../../../assets/defaultCoverImg.jpeg';
import defatutUserImage from '../../../assets/defaultImg.jpg';
import { Swiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../swiperStyle.css';
import { useLikeButton } from '../../../hooks/useLikeButton';

const UserContents = () => {
  const currentUser = auth.currentUser?.uid;

  // 인기게시물
  const { data: userContents, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPopularContents
  });

  // 유저정보 가져오기(profileImg)
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  });

  //좋아요
  const onClickLikeButton = useLikeButton();

  // 탑랭킹 로딩
  if (isLoading) {
    return <Loader />;
  }

  if (!userContents || userContents.length === 0) {
    return <div>인기 게시물 데이터를 찾을 수 없습니다.</div>;
  }

  const removeImageTags = (htmlContent: string) => {
    return htmlContent.replace(/<img[^>]*>|<p[^>]*>(?:\s*<br[^>]*>\s*|)\s*<\/p>/g, '');
  };

  const reduceContent = (postContent: string, cnt: number) => {
    return postContent?.length > cnt ? postContent.slice(0, cnt - 1) + '...' : postContent;
  };

  return (
    <St.UserContents>
      <St.TitleContainer>
        <h1>인기 게시물</h1>
        <St.SubTitle>
          <p>망고에서 제일 인기 있는 게시물들을 둘러보세요.</p>
          <Link to={'/viewAll'}>
            <button type="button">{'전체보기 >'}</button>
          </Link>
        </St.SubTitle>
      </St.TitleContainer>
      <St.PostsSlide>
        <St.ThumbnailsBox>
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            pagination={{
              clickable: true
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 1
              },
              600: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              800: {
                slidesPerView: 3,
                spaceBetween: 10
              },
              1000: {
                slidesPerView: 4,
                spaceBetween: 10
              }
            }}
            className="default-swiper"
          >
            {userContents?.map((item, idx) => {
              return (
                <St.StyledSwiperSlide key={idx} className="default-swiper">
                  <St.UserPostCover to={`/detail/${item.id}`}>
                    <St.TextAndLikeButton>
                      <St.InfoTop>
                        <St.UserInfo>
                          <div>
                            <img
                              src={users?.find((user) => user.uid === item.uid)?.profileImg || defatutUserImage}
                              alt="user profile image"
                            />
                          </div>
                          <div>{users?.find((user) => user.uid === item.uid)?.displayName}</div>
                        </St.UserInfo>
                        <St.LikeButton type="button" onClick={(e) => onClickLikeButton(e, item.id)}>
                          {item.likedUsers?.includes(currentUser!) ? <St.HeartFillIcon /> : <St.HeartIcon />}
                        </St.LikeButton>
                      </St.InfoTop>
                      <St.InfoBottom>
                        <St.BottomText>
                          <div>{item.title}</div>
                          <div>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: reduceContent(removeImageTags(item.content || ''), 20)
                              }}
                            />
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
                    {/* item.coverUrl로 변경하기 */}
                    {!item ? <Loader /> : <img src={defaultCover} alt={item.title} />}
                  </St.UserPostCover>
                </St.StyledSwiperSlide>
              );
            })}
          </Swiper>
        </St.ThumbnailsBox>
      </St.PostsSlide>
    </St.UserContents>
  );
};

export default UserContents;
