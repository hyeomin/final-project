import { useState } from 'react';
import styled from 'styled-components';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import YoutubeModal from './YoutubeModal';

function YoutubeTest() {
  const [newsUrl, setNewsUrl] = useState('');
  const [videos, setVideos] = useState<string[]>([]); // 비디오 ID
  const [selectedVideo, setSelectedVideo] = useState(''); // 모달에 띄울 비디오 ID

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
  const handleNewsUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const videoId = extractVideoId(newsUrl);
    if (videoId) {
      setVideos([...videos, videoId]);
      setNewsUrl('');
    }
  };

  // Function to open modal with selected video
  const onClickSlideHandler = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  return (
    <NewsRoomContainer>
      <SwiperContainer>
        <Swiper
          spaceBetween={10}
          slidesPerView={4}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {videos.map((videoId, index) => (
            <SwiperSlide key={index} onClick={() => onClickSlideHandler(videoId)}>
              <img src={`https://img.youtube.com/vi/${videoId}/0.jpg`} alt="Video preview" />
            </SwiperSlide>
          ))}
        </Swiper>
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

export default YoutubeTest;

const NewsRoomContainer = styled.div`
  width: 100%;
  background-color: lightblue;
`;

const SwiperContainer = styled.div`
  height: 250px;
  background-color: pink;
`;
