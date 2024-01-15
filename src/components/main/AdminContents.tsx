import React from 'react';
import { auth } from '../../shared/firebase';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../query/keys';
import { getAdminHomeContents } from '../../api/homeApi';
import { Link } from 'react-router-dom';
import St from './style';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const AdminContents = () => {
  const currentUser = auth.currentUser?.uid;

  const { data: adminContents, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.ADMINPOSTS],
    queryFn: getAdminHomeContents
  });
  // console.log('adminContents===>', adminContents);

  // 망고 발행물 로딩
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!adminContents || adminContents.length === 0) {
    return <div>No adminPosts data found</div>;
  }

  return (
    <section>
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
          {adminContents?.map((item, idx) => {
            return (
              <SwiperSlide key={idx}>
                <Link to={`/detail/${item.id}`}>
                  <img src={''} alt={`Slide ${idx}`} />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </St.AdminContentsSection>
    </section>
  );
};

export default AdminContents;
