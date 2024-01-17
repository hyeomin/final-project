import React from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../../query/keys';
import { downloadImageURL, getAdminContents } from '../../../api/homeApi';
import defaultCover from '../../../assets/defaultCoverImg.jpeg';
import St from './style';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Loader from '../../common/Loader';

const AdminContents = () => {
  const { data: adminContents, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.ADMINPOSTS],
    queryFn: getAdminContents
  });
  // console.log('adminContents===>', adminContents);

  // 이미지URL 불러오기
  const imageQueries = useQueries({
    queries:
      adminContents?.map((post) => ({
        queryKey: ['imageURL', post.id],
        queryFn: () => downloadImageURL(post.id as string)
      })) || []
  });

  // 망고 발행물 로딩
  if (isLoading) {
    //return <div>Loading...</div>;
    return <Loader />;
  }

  if (!adminContents || adminContents.length === 0) {
    return <div>No adminPosts data found</div>;
  }

  return (
    <St.Container>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true,
          type: 'fraction'
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="custom-swiper"
      >
        {adminContents?.map((item, idx) => {
          const imageQuery = imageQueries[idx];
          return (
            <SwiperSlide key={idx}>
              {imageQuery.isLoading ? (
                // <p>Loading image...</p>
                <Loader />
              ) : (
                <img src={imageQuery.data || defaultCover} alt={`Slide ${idx}`} />
              )}
              <St.Button to={`/detail/${item.id}`}>자세히 보기</St.Button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </St.Container>
  );
};

export default AdminContents;
