import styled from 'styled-components';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import NewsUpload from './NewsUpload';

function NewsRoom() {
  return (
    <NewsRoomContainer>
      <SwiperContainer>
        <Swiper
          spaceBetween={10}
          slidesPerView={4}
          pagination={{
            clickable: true
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
        </Swiper>
      </SwiperContainer>
      <NewsUpload />
    </NewsRoomContainer>
  );
}

export default NewsRoom;

const NewsRoomContainer = styled.div`
  width: 100%;

  background-color: lightblue;
`;

const SwiperContainer = styled.div`
  height: 250px;

  background-color: pink;
`;
