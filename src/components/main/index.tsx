import St from './style';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import usePostsQuery from '../../query/usePostsQuery';
import { getAdminPosts, getTopRankingPosts } from '../../api/posts';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './swiperStyle.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Post } from '../../types';

function Main() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value);

  const { addMutate } = usePostsQuery();

  //망고 발행물
  const { isLoading: MangoIsLoading, data: createdByMango } = useQuery({
    queryKey: ['adminContents'],
    queryFn: getAdminPosts
  });

  //탑랭킹
  const { isLoading: TopRankingIsLoading, data: topRanking } = useQuery({
    queryKey: ['topRanking'],
    queryFn: getTopRankingPosts
  });

  // 망고 발행물 로딩
  if (MangoIsLoading) {
    return <div>Loading...</div>;
  }

  if (!createdByMango || createdByMango.length === 0) {
    return <div>No data found</div>;
  }
  // console.log('createdByMango ====>', createdByMango);

  // 탑랭킹 로딩
  if (TopRankingIsLoading) {
    return <div>Loading...</div>;
  }

  if (!topRanking || topRanking.length === 0) {
    return <div>No data found</div>;
  }
  // console.log('topRanking ====>', topRanking);

  const onSubmitAddBtnClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost: Post = {
      title,
      content,
      coverUrl: '',
      createdAt: Date.now(),
      uid: 'test user',
      category: 'admin',
      likeCount: 31,
      role: 'user',
      profileImg: null
    };
    addMutate(newPost, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['posts'],
          refetchType: 'active'
        });
      }
    });
  };

  const onClickMovToDetail = (id: string) => {
    navigate(`/detail/${id}`);
  };

  const onClickViewAllButton = () => {
    navigate('/viewAll');
  };

  return (
    <St.Container>
      <form onSubmit={onSubmitAddBtnClick}>
        <input placeholder="dummy 추가용" value={title} onChange={onChangeTitle} type="text" />
        <input placeholder="dummy 추가용" value={content} onChange={onChangeContent} type="text" />
        <button type="submit">추가</button>
      </form>

      <St.AdminContentsSection>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="swiper"
        >
          {createdByMango?.map((item, idx) => {
            return (
              <SwiperSlide key={idx} onClick={() => onClickMovToDetail(item.id!)}>
                <img src={item.coverUrl!} alt={`Slide ${idx}`} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </St.AdminContentsSection>
      <St.TopRankingPosts>
        <St.Title>
          <h1>인기 게시물</h1>
          <button type="button" onClick={onClickViewAllButton}>
            전체보기
          </button>
        </St.Title>
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
                1080: {
                  slidesPerView: 4,
                  spaceBetween: 10
                }
              }}
              className="slides"
            >
              {topRanking.map((item, idx) => (
                <SwiperSlide key={idx} onClick={() => onClickMovToDetail(item.id!)}>
                  <img src={item.coverUrl!} alt={`Slide ${idx}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </St.ThumbnailsBox>
        </St.PostsSlide>
      </St.TopRankingPosts>
    </St.Container>
  );
}

export default Main;
