import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
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
import St from '../popularContents/carousel/style';

const AdminContentsTest = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: adminContents, isLoading } = useQuery({
    queryKey: ['adminContents'],
    queryFn: getAdminPosts
  });
  // console.log('post==>', adminContents);

  const handleSlideChange = (swiper: SwiperClass) => {
    // console.log('swiper===>', swiper);
    // 슬라이드가 변경될 때 onSwiper의 setSwiperInstance가 내부적으로 자동실행되는 것 같아요.
    // 아래 코도 없이도 swiper값이 셋팅 되어있는 것으로 확인이 됩니다!
    // if (swiperInstance !== swiper) {
    //   setSwiperInstance(swiper);
    // }

    setCurrentIndex(swiper.realIndex);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      {adminContents?.length === 0 ? (
        <St.PlaceHolder>관리자 컨텐츠 데이터를 찾을 수 없습니다.</St.PlaceHolder>
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
        <AdminCenterBox
          swiperInstance={swiperInstance}
          currentIndex={currentIndex}
          // setCurrentIndex={setCurrentIndex}
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
