import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { downloadCoverImageURLs } from '../../api/detailApi';
import swipeLeft from '../../assets/icons/swipeLeft.png';
import swipeRight from '../../assets/icons/swipeRight.png';

import 'swiper/css';

type Props = {
  foundPost: PostType;
};

function DetailHeader({ foundPost }: Props) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // New state for current index

  const {
    data: imageURLList,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['imageURL', foundPost.id],
    queryFn: () => downloadCoverImageURLs(foundPost?.id!),
    enabled: !!foundPost?.id
  });

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentIndex(swiper.activeIndex);
  };

  const goNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  //커버이미지 로딩 ==> 추후 스피너 적용
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading image</div>;
  }

  if (!imageURLList) {
    return <div>Image Loading ...</div>;
  }

  return (
    <CoverContainer>
      <PostTitle>{foundPost.title}</PostTitle>

      {Array.isArray(imageURLList) && imageURLList?.length > 0 ? (
        <>
          <StyledSwiper onSwiper={setSwiperInstance} onSlideChange={handleSlideChange} className="mySwiper">
            {imageURLList.map((image, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <img src={image} alt="Post Cover" />
                </SwiperSlide>
              );
            })}
          </StyledSwiper>
          <NavigationButtonContainer>
            <div onClick={goPrev}>{currentIndex > 0 && <img src={swipeLeft} alt="Previous" />}</div>
            <div onClick={goNext}>{currentIndex < imageURLList.length - 1 && <img src={swipeRight} alt="Next" />}</div>
          </NavigationButtonContainer>
        </>
      ) : (
        <NoImage></NoImage>
      )}
    </CoverContainer>
  );
}

export default DetailHeader;

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  background-color: white;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 400px;
  overflow: hidden;

  & img {
    object-fit: cover;
  }
`;

const NavigationButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85vw;
  top: 140px;
  position: absolute;

  & div {
  }
`;

const PostTitle = styled.h3`
  position: absolute;
  left: 300px;
  bottom: 60px;
  font-size: 40px;
  z-index: auto;
`;

const NoImage = styled.div`
  width: 100%;
  height: 140px;
`;
