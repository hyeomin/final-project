import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { getNews } from '../../../api/newsApi';
import swipeLeft from '../../../assets/about/swipe-left-white.png';
import swipeRight from '../../../assets/about/swipe-right-white.png';
import useRoleCheck from '../../../hooks/useRoleCheck';
import { QUERY_KEYS } from '../../../query/keys';
import theme from '../../../styles/theme';
import NewsUpload from './NewsUpload';
import YoutubeModal from './YoutubeModal';

import useSwiperNavigation from '../../../hooks/useSwiperNavigation';

function NewsRoom() {
  const [newsUrl, setNewsUrl] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(''); // 모달에 띄울 비디오 ID

  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // role 비어있을 경우 다시 받아오기
  const role = useRoleCheck();

  const { data: newsPosts } = useQuery({ queryKey: [QUERY_KEYS.NEWS], queryFn: getNews, staleTime: 60_000 });

  // 클릭한 비디오로 모달창 띄우기
  const onClickSlideHandler = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  // 커스텀 Swiper handler
  const { goNext, goPrev } = useSwiperNavigation({
    swiperInstance,
    currentIndex,
    setCurrentIndex,
    maxIndex: newsPosts ? newsPosts.length - 1 : 0
  });

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentIndex(swiper.activeIndex);
  };

  console.log('currentIndex', currentIndex);
  console.log('currentIndex length', newsPosts?.length);

  return (
    <NewsRoomContainer>
      <TabTitle>
        <h3>NEWS ROOM</h3>
      </TabTitle>
      <SwiperContainer>
        <NewsRoomTitle>
          <h4>뉴스룸</h4>
          <span>환경과 관련된 뉴스를 확인하세요!</span>
        </NewsRoomTitle>
        {newsPosts && (
          <>
            <StyledSwiper
              onSwiper={setSwiperInstance}
              onSlideChange={handleSlideChange}
              spaceBetween={20}
              slidesPerView={4}
              pagination={{
                clickable: true
              }}
            >
              {newsPosts.map((news, index) => (
                <SwiperSlide key={index} onClick={() => onClickSlideHandler(news.youtubeId)}>
                  <SingleSlide>
                    <img src={news.thumbnailUrl} alt="video preview" />
                    <NewsInfo>
                      <span>{news.tags[0]}</span>
                      <strong>{news.title}</strong>
                      <span>{news.publishedAt}</span>
                    </NewsInfo>
                  </SingleSlide>
                </SwiperSlide>
              ))}
            </StyledSwiper>
            <NavigationButtonContainer>
              <div onClick={goPrev}>{currentIndex > 0 && <img src={swipeLeft} alt="Previous" />}</div>
              <div onClick={goNext}>
                {currentIndex < Math.floor(newsPosts.length / 4) && <img src={swipeRight} alt="Next" />}
              </div>
            </NavigationButtonContainer>
          </>
        )}
        {/* 어드민만 등록하기 인풋 보이게 */}
        {role && role === 'admin' && <NewsUpload newsUrl={newsUrl} setNewsUrl={setNewsUrl} />}
      </SwiperContainer>
      {selectedVideo && <YoutubeModal videoId={selectedVideo} onClose={() => setSelectedVideo('')} />}
    </NewsRoomContainer>
  );
}

export default NewsRoom;

const NewsRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TabTitle = styled.div`
  width: 340px;
  border-radius: 20px 20px 0px 0px;
  background-color: #666;

  & h3 {
    text-align: center;
    line-height: 100%;
    color: white;
    font-family: ${theme.font.agroBold};
    font-size: 24px;
    padding: 10px;
  }
`;

const SwiperContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 50px;
  width: 100%;
  height: 690px;
  padding: 60px 180px;
  background-color: #666;
  position: relative;
`;

const NewsRoomTitle = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  color: white;

  & h4 {
    font-size: 26px;
    font-weight: 700;
  }

  & span {
    font-size: 18px;
  }
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 300px;
`;

const SingleSlide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: -2px 0px 6px 0px rgba(0, 0, 0, 0.15), 2px 4px 6px 0px rgba(0, 0, 0, 0.15);
  background-color: white;
  padding: 5px;

  & img {
    width: 100%;
    height: 170px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const NewsInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-between;
  padding: 12px;
  flex: 1;

  & span {
    font-size: 15px;
    color: ${theme.color.gray};
  }

  & strong {
    font-size: 16px;
    font-weight: 500;
    color: black;
    text-align: left;
  }
`;

const NavigationButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 82vw;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;

  & div {
    cursor: pointer;
  }

  & img {
    width: 25px;
  }
`;
