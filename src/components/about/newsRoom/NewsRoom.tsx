import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { google } from 'googleapis';
import { useState } from 'react';
import styled from 'styled-components';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NewsType, addNews, getNews } from '../../../api/newsApi';
import { QUERY_KEYS } from '../../../query/keys';
import theme from '../../../styles/theme';
import YoutubeModal from './YoutubeModal';

function NewsRoom() {
  const [newsUrl, setNewsUrl] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(''); // 모달에 띄울 비디오 ID

  const { data: newsList } = useQuery({ queryKey: [QUERY_KEYS.NEWS], queryFn: getNews });

  const queryClient = useQueryClient();

  const addNewsMutaton = useMutation({
    mutationFn: (newNews: Omit<NewsType, 'id'>) => addNews({ newNews }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NEWS] });
    }
  });

  // Function to parse YouTube URL and extract video ID
  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return null;
    }
  };

  // Function to handle form submission
  const handleNewsUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const videoId = extractVideoId(newsUrl);

    if (videoId) {
      try {
        const youtube = google.youtube({
          version: 'v3',
          auth: process.env.REACT_APP_YOUTUBE_API_KEY
        });
        const response = await youtube.videos.list({
          part: ['snippet'],
          id: [videoId]
        });

        if (response && response.data.items) {
          const videoDetails = response.data.items[0].snippet;

          if (videoDetails) {
            const newNews: Omit<NewsType, 'id'> = {
              youtubeId: videoId,
              title: videoDetails.title || '',
              date: videoDetails.publishedAt || ''
            };
            addNewsMutaton.mutate(newNews);
          }
        }
      } catch (error) {
        console.log('비디오 처리 에러', error);
      }
    }
  };

  // Function to open modal with selected video
  const onClickSlideHandler = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  return (
    <NewsRoomContainer>
      <h3>NEWS ROOM</h3>
      <SwiperContainer>
        <StyledSwiper
          spaceBetween={20}
          slidesPerView={3}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {newsList &&
            newsList.map((news, idx) => {
              return (
                <SwiperSlide>
                  <img src={`https://img.youtube.com/vi/${news.youtubeId}/0.jpg`} alt="youtube-thumbnail" />
                  <div>
                    <span>{news.title}</span>
                    <span>{news.date}</span>
                  </div>
                </SwiperSlide>
              );
            })}
        </StyledSwiper>
      </SwiperContainer>
      <form onSubmit={handleNewsUpload}>
        <input value={newsUrl} onChange={(e) => setNewsUrl(e.target.value)} />
        <button type="submit">뉴스 등록하기</button>
      </form>
      {selectedVideo && <YoutubeModal videoId={selectedVideo} onClose={() => setSelectedVideo('')} />}
      {/* Render modal when a video is selected */}
    </NewsRoomContainer>
  );
}

export default NewsRoom;

const NewsRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 600px;
  background-color: lightblue;
  padding: 60px 130px;

  & h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 340px;
    height: 40px;
    border-radius: 20px 20px 0px 0px;
    background-color: #666;
    color: white;
    font-family: ${theme.font.agroBold};
    font-size: 28px;
  }
`;

const SwiperContainer = styled.div`
  height: 250px;
  /* background-color: #666; */
  background-color: pink;
  width: 100%;
  padding-bottom: 150px;
`;

const StyledSwiper = styled(Swiper)`
  height: 100%;
  width: 100%;
`;
