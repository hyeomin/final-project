import React from 'react';
import { auth } from '../../../shared/firebase';
import { useQueries, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../../query/keys';
import { downloadImageURL, getAdminHomeContents } from '../../../api/homeApi';
import { Link } from 'react-router-dom';
import St from './style';
import defaultCover from '../../../assets/defaultCoverImg.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import styled from 'styled-components';

const AdminContents = () => {
  const { data: adminContents, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.ADMINPOSTS],
    queryFn: getAdminHomeContents
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
    return <div>Loading...</div>;
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
                <p>Loading image...</p>
              ) : (
                <img src={imageQuery.data || defaultCover} alt={`Slide ${idx}`} />
              )}
              <Button to={`/detail/${item.id}`}>자세히 보기</Button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </St.Container>
  );
};

const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 120px; //170px
  height: 45px;
  border-radius: 10px;
  background-color: #11111174;
  border: none;
  font-size: 17px; //20px 너무큼
  font-weight: 400;
  cursor: pointer;
  bottom: 150px;
  left: 240px;
  &:hover {
    background-color: #00000099;
  }
`;

export default AdminContents;
