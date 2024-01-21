import React from 'react';
import { useQuery } from '@tanstack/react-query';
import defaultCover from '../../../assets/defaultCoverImg.jpeg';
import St from './style';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAdminPosts } from '../../../api/homeApi';
import Loader from '../../common/Loader';

const AdminContents = () => {
  const { data: adminContents, isLoading } = useQuery({
    queryKey: ['adminContents'],
    queryFn: getAdminPosts
  });

  if (isLoading) {
    return <Loader />;
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
        {adminContents?.length === 0 ? (
          <div>관리자 컨텐츠 데이터를 찾을 수 없습니다.</div>
        ) : (
          adminContents?.map((item, idx) => {
            return (
              <SwiperSlide key={idx}>
                {/* item.coverImages로 변경하기 */}
                {!item ? <Loader /> : <img src={defaultCover} alt={`Slide ${idx}`} />}
                <St.Button to={`/detail/${item.id}`}>자세히 보기</St.Button>
              </SwiperSlide>
            );
          })
        )}
      </Swiper>
    </St.Container>
  );
};

export default AdminContents;
