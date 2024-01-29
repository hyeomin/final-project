import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { getAdminPosts, getPosts } from '../../../api/homeApi';
import defaultIllustration from '../../../assets/home/AdminPostIllustration.png';
import Loader from '../../common/Loader';
import AdminCenterBox from './AdminCenterBox';
import St from '../popularContents/carousel/style';
import { PostType } from '../../../types/PostType';

const AdminContentsTest = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: adminContents, isLoading } = useQuery({
    queryKey: ['adminContents'],
    queryFn: getAdminPosts
  });

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentIndex(swiper.realIndex);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      {adminContents?.length === 0 ? (
        <St.PlaceHolder>관리자 콘텐츠 데이터를 찾을 수 없습니다.</St.PlaceHolder>
      ) : (
        <Swiper
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          modules={[Autoplay]}
          className="custom-swiper"
        >
          {adminContents &&
            adminContents.map((item, idx) => {
              return (
                <SwiperSlide key={idx}>
                  {item ? (
                    <img
                      src={(item.coverImages[1] && item.coverImages[1].url) || defaultIllustration}
                      alt={`Slide ${idx}`}
                    />
                  ) : (
                    <Loader />
                  )}
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
      {/* 헤더 중앙에 놓인 박스, 버튼, 텍스트 등이 다 들어가있음 */}
      {adminContents && adminContents?.length > 0 && (
        <AdminCenterBox swiperInstance={swiperInstance} currentIndex={currentIndex} adminContents={adminContents} />
      )}
    </Container>
  );
};

export default AdminContentsTest;

const Container = styled.div`
  width: 100%;
  height: 450px;
  margin-bottom: 10px;
  position: relative;
`;
