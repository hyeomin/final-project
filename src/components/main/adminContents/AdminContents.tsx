import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
    <Container>
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
              <StyledSwiperSlide key={idx} className="mySwiper">
                <div>
                  요기
                  <Button to={`/detail/${item.id}`}>자세히 보기</Button>
                </div>
                {/* item.coverImages로 변경하기 */}
                {/* {!item ? <Loader /> : <img src={defaultIllustration} alt={`Slide ${idx}`} />} */}
              </StyledSwiperSlide>
            );
          })
        )}
      </Swiper>
    </Container>
  );
};

export default AdminContents;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  & img {
    width: 100%;
    height: 100%;
  }

  & div {
    width: 1000px;
    background-color: red;
  }
`;

const Button = styled(Link)`
  position: absolute;
`;

const Container = styled.div`
  width: 100%;
  height: 450px;
  margin-bottom: 10px;
`;
