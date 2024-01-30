import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { GoComment, GoEye, GoHeart } from 'react-icons/go';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../../../../api/authApi';
import { getPopularPosts } from '../../../../api/homeApi';
import defaultProfileImage from '../../../../assets/defaultImg.jpg';
import mangoDefaultCover from '../../../../assets/mangoDefaultCover.png';
import UserDetail from './UserDetail';
import { AuthContext } from '../../../../context/AuthContext';
import { useCarouselNavigation } from '../../../../hooks/useCarouselNavigation';
import { useLikeButton } from '../../../../hooks/useLikeButton';
import Loader from '../../../common/Loader';
import PostContentPreview from '../../../common/PostContentPreview';
import St from './style';

const Carousel = () => {
  const authContext = useContext(AuthContext);
  const currentUserId = authContext?.currentUser?.uid;

  const { data: popularPosts, isLoading } = useQuery({
    queryKey: ['popularPosts'],
    queryFn: getPopularPosts
    // staleTime: Infinity
  });

  console.log('인기게시물==>', popularPosts);
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
          <St.PlaceHolder>인기 게시물 데이터 없습니다.</St.PlaceHolder>
        ) : (
          popularPosts?.slice(currentSlide, currentSlide + 4).map((post) => {
            return (
              <Link key={post.id} to={`/detail/${post.id}`}>
                <St.Slide>
                  <St.CoverImage>
                    {/* TODO: 이미지가 늦게 로드되는 문제 해결해야함 */}
                    <img
                      src={
                        post.coverImages && post.coverImages.length > 0 ? post.coverImages[0].url : mangoDefaultCover
                      }
                      alt={post.title}
                    />
                    <img src={mangoDefaultCover} alt={post.title} />
                  </St.CoverImage>
                  <St.SlideHeader>
                    <UserDetail userId={post.uid} />
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
