import React from 'react';
import usePostsQuery from '../../../query/usePostsQuery';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../../query/keys';
import { getAllUsers } from '../../../api/authApi';
import { downloadImageURL, getTopRankingPosts } from '../../../api/homeApi';
import { auth } from '../../../shared/firebase';
import { Link } from 'react-router-dom';
import St from './style';
import defaultCover from '../../../assets/defaultCoverImg.jpeg';
import defatutUserImage from '../../../assets/defaultImg.jpg';
import eye from '../../../assets/icons/eye.png';
import heart from '../../../assets/icons/heart.png';
import comment from '../../../assets/icons/comment.png';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../swiperStyle.css';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper } from 'swiper/react';

const UserContents = () => {
  const currentUser = auth.currentUser?.uid;
  const queryClient = useQueryClient();

  // 유저 컨텐츠(인기순, 8개)
  const { data: userContents, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getTopRankingPosts
  });
  // console.log('userContents===>', userContents);

  // 유저정보 가져오기(profileImg)
  const { data: users } = useQuery({
    queryKey: [QUERY_KEYS.USERPOSTS],
    queryFn: getAllUsers
  });
  // console.log('유저 목록===>', users);

  // 이미지URL 불러오기
  const imageQueries = useQueries({
    queries:
      userContents?.map((post) => ({
        queryKey: ['imageURL', post.id],
        queryFn: () => downloadImageURL(post.id as string)
      })) || []
  });

  const { updateMutate } = usePostsQuery();

  // 탑랭킹 로딩
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userContents || userContents.length === 0) {
    return <div>No userPosts data found</div>;
  }

  // 좋아요 버튼
  const onClickLikeButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string | undefined) => {
    e.preventDefault();
    if (id) {
      const postToUpdate: PostType = { id };
      updateMutate(postToUpdate, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.POSTS]
          });
        }
      });
    }
  };

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
            className="slides"
          >
            {userContents?.map((item, idx) => {
              const imageQuery = imageQueries[idx];
              return (
                <St.StyledSwiperSlide key={idx}>
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
                          <span>
                            <img src={eye} alt="eyeImg" /> {item.viewCount?.toLocaleString() || 0}
                          </span>
                          <span>
                            <img src={heart} alt="heartImg" /> {item.likeCount?.toLocaleString() || 0}
                          </span>
                          <span>
                            <img src={comment} alt="commentImg" /> {item.commentCount?.toLocaleString() || 0}
                          </span>
                        </St.Count>
                      </St.InfoBottom>
                    </St.TextAndLikeButton>
                    {imageQuery.isLoading ? (
                      <p>Loading image...</p>
                    ) : (
                      <img src={imageQuery.data || defaultCover} alt={item.title} />
                    )}
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
