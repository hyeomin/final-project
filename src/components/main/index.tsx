import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { downloadImageURL, getAdminHomeContents, getTopRankingPosts } from '../../api/homeApi';
import St from './style';
import './swiperStyle.css';

function Main() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const postQueries = useQueries({
    queries: [
      {
        queryKey: ['adminContents'],
        queryFn: getAdminHomeContents
      },
      {
        queryKey: ['topRanking'],
        queryFn: getTopRankingPosts
      }
    ]
  });

  //필터된 posts 목록 (망고관리자 게시물은 임시로 둔다.)
  const createdByMango = postQueries[0].data || [];
  const topRanking = postQueries[1].data || [];

  // 이미지URL 불러오기
  const imageQueries = useQueries({
    queries:
      topRanking?.map((post) => ({
        queryKey: ['imageURL', post.id],
        queryFn: () => downloadImageURL(post.id as string)
      })) || []
  });


  const isLoadingAdminContents = postQueries[0].isLoading;
  const isLoadingTopRanking = postQueries[1].isLoading;

  // 망고 발행물 로딩
  if (isLoadingAdminContents) {
    return <div>Loading...</div>;
  }

  if (!createdByMango || createdByMango.length === 0) {
    return <div>No data found</div>;
  }

  // // 탑랭킹 로딩
  if (isLoadingTopRanking) {
    return <div>Loading...</div>;
  }

  if (!topRanking || topRanking.length === 0) {
    return <div>No data found</div>;
  }

  // 각각 게시물 클릭시 detail로 이동
  const onClickMovToDetail = (id: string) => {
    navigate(`/detail/${id}`);
  };

  const onClickViewAllButton = () => {
    navigate('/viewAll');
  };

  return (
    <St.Container>
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
                <img src={''} alt={`Slide ${idx}`} />
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
              {topRanking!.map((item, idx) => {
                const imageQuery = imageQueries[idx];
                return (
                  <SwiperSlide key={idx} onClick={() => onClickMovToDetail(item.id!)}>
                    {imageQuery.isLoading ? (
                      <p>Loading image...</p>
                    ) : (
                      imageQuery.data && <img src={imageQuery.data} alt={item.title} />
                    )}
                  </SwiperSlide>
                );
              })}

              {topRanking!.map((item, idx) => {
                const imageQuery = imageQueries[idx];
                return (
                  <SwiperSlide key={idx} onClick={() => onClickMovToDetail(item.id!)}>
                    {imageQuery.isLoading ? (
                      <p>Loading image...</p>
                    ) : (
                      imageQuery.data && <img src={imageQuery.data} alt={item.title} />
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </St.ThumbnailsBox>
        </St.PostsSlide>
      </St.TopRankingPosts>
    </St.Container>
  );
}

export default Main;
