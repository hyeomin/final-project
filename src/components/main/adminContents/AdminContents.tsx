import React from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import defaultCover from '../../../assets/defaultCoverImg.jpeg';
import St from './style';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAdminContents } from '../../../api/homeApi';
import mangoCover from '../../../assets/tentative-cover-image.jpg';
import { QUERY_KEYS } from '../../../query/keys';
import Loader from '../../common/Loader';

const AdminContents = () => {
  const { data: adminContents, isLoading } = useQuery({
    queryKey: ['adminContents'],
    queryFn: getAdminContents
  });

  // 망고 발행물 로딩
  if (isLoading) {
    return <Loader />;
  }

  if (!adminContents || adminContents.length === 0) {
    return <div>관리자 컨텐츠 데이터를 찾을 수 없습니다.</div>;
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
          return (
            <SwiperSlide key={idx}>
              {/* item.coverUrl로 변경하기 */}
              {!item ? <Loader /> : <img src={defaultCover} alt={`Slide ${idx}`} />}
              <St.Button to={`/detail/${item.id}`}>자세히 보기</St.Button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </St.Container>
  );
};

export default AdminContents;
