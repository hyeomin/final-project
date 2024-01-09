import St from './style';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getAdminHomeContents, getPosts, getTopRankingPosts } from '../../api/homeApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './swiperStyle.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { storage } from '../../shared/firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { QUERY_KEYS } from '../../query/keys';

function Main() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //전체게시물
  // const { data: posts } = useQuery({
  //   queryKey: [QUERY_KEYS.POSTS],
  //   queryFn: getPosts
  // });
  
  //망고
  const { isLoading: MangoIsLoading, data: createdByMango } = useQuery({
    queryKey: ['adminContents'],
    queryFn: getAdminHomeContents
  });

  //탑랭킹
  const { isLoading: TopRankingIsLoading, data: topRanking } = useQuery({
    queryKey: ['topRanking'],
    queryFn: getTopRankingPosts
  });
  console.log('topRanking',topRanking)


  // 망고 발행물 로딩
  if (MangoIsLoading) {
    return <div>Loading...</div>;
  }

  if (!createdByMango || createdByMango.length === 0) {
    return <div>No data found</div>;
  }

  // 탑랭킹 로딩
  if (TopRankingIsLoading) {
    return <div>Loading...</div>;
  }

  if (!topRanking || topRanking.length === 0) {
    return <div>No data found</div>;
  }


// 이미지 URL 가져오기
// const getImageUrl = async (postId: string) => {
//   const imageRef = ref(storage, `posts/${postId}`);
//   try {
//     return await getDownloadURL(imageRef);
//   } catch (error) {
//     console.error('Error', error);
//     return ''; 
//   }
// };


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
              {topRanking.map((item, idx) => (
                <SwiperSlide key={idx} onClick={() => onClickMovToDetail(item.id!)}>
                  <img src={''} alt={`Slide ${idx}`} />
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
