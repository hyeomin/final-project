import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { downloadCoverImageURLs } from '../../api/detailApi';
import swipeLeft from '../../assets/icons/swipeLeft.png';
import swipeRight from '../../assets/icons/swipeRight.png';

import 'swiper/css';
import Loader from '../common/Loader';

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
    //return <div>Loading...</div>;
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading image</div>;
  }

  if (!imageURLList) {
    return <div>Image Loading ...</div>;
  }

  return (
    <CoverContainer>
      {Array.isArray(imageURLList) && imageURLList?.length > 0 ? (
        <>
          <StyledSwiper onSwiper={setSwiperInstance} onSlideChange={handleSlideChange} className="mySwiper">
            {imageURLList.map((image, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <img src={image} alt="Post-Cover" />
                  <Gradient></Gradient>
                  <PostTitle noimage="false">{foundPost.title}</PostTitle>
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
        <NoImage>
          <PostTitle noimage="true">{foundPost.title}</PostTitle>
        </NoImage>
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

interface PostTitleProps {
  noimage: string;
}

const PostTitle = styled.h3<PostTitleProps>`
  /* color: white; */
  color: ${(props) => (props.noimage ? 'black' : 'white')};
  text-align: left;
  position: absolute;
  width: 100%;
  bottom: ${(props) => (props.noimage ? '20px' : '60px')};
  padding: ${(props) => (props.noimage ? '0 20px' : '0 60px')};
  font-size: 40px;
  cursor: initial;
`;

const Gradient = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 200px;
  opacity: 0.6;
  background: linear-gradient(rgba(0, 0, 0, 0) 20%, #000 100%);
`;

const NavigationButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85vw;
  top: 140px;
  position: absolute;
`;

const NoImage = styled.div`
  width: 100%;
  height: 100px;
`;
