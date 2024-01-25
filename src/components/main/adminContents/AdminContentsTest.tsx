import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { getAdminPosts } from '../../../api/homeApi';
import defaultIllustration from '../../../assets/home/AdminPostIllustration.png';
import Loader from '../../common/Loader';
import AdminCenterBox from './AdminCenterBox';

const AdminContentsTest = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: adminContents, isLoading } = useQuery({
    queryKey: ['adminContents'],
    queryFn: getAdminPosts
  });

  const handleSlideChange = (swiper: SwiperClass) => {
    if (swiperInstance !== swiper) {
      setSwiperInstance(swiper);
    }
    setCurrentIndex(swiper.realIndex);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      {adminContents?.length === 0 ? (
        <div>관리자 컨텐츠 데이터를 찾을 수 없습니다.</div>
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
          {adminContents?.map((item, idx) => {
            return (
              <SwiperSlide key={idx}>
                {/* item.coverImages로 변경하기 */}
                {item ? <img src={defaultIllustration} alt={`Slide ${idx}`} /> : <Loader />}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      {/* 헤더 중앙에 놓인 박스, 버튼, 텍스트 등이 다 들어가있음 */}
      {adminContents && adminContents?.length > 0 && (
        <AdminCenterBox
          swiperInstance={swiperInstance}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          adminContents={adminContents}
        />
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
