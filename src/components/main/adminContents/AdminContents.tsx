import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAdminPosts } from '../../../api/homeApi';
import defaultIllustration from '../../../assets/home/AdminPostIllustration.png';
import Loader from '../../common/Loader';
import St from './style';

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
                {!item ? <Loader /> : <img src={defaultIllustration} alt={`Slide ${idx}`} />}
                <Button to={`/detail/${item.id}`}>자세히 보기</Button>
              </SwiperSlide>
            );
          })
        )}
      </Swiper>
    </St.Container>
  );
};

export default AdminContents;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: 1000px;
  position: absolute;
  top: 0;
  background-color: pink;
  opacity: 30%;
`;

const Button = styled(Link)``;
