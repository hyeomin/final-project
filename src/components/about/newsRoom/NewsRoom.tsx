import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getUser } from '../../../api/authApi';
import { getNews } from '../../../api/newsApi';
import { AuthContext } from '../../../context/AuthContext';
import { QUERY_KEYS } from '../../../query/keys';
import { roleState } from '../../../recoil/users';
import theme from '../../../styles/theme';
import { UserType } from '../../../types/UserType';
import NewsUpload from './NewsUpload';
import YoutubeModal from './YoutubeModal';

function NewsRoom() {
  const [newsUrl, setNewsUrl] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(''); // 모달에 띄울 비디오 ID

  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;
  const role = useRecoilValue(roleState);
  console.log('role-->', role);

  // role이 비어있는 경우 다시 넣기
  const { data: user, refetch } = useQuery<UserType | undefined>({
    queryKey: [QUERY_KEYS.USERS, authCurrentUser?.uid],
    queryFn: () => (authCurrentUser ? getUser(authCurrentUser?.uid) : undefined),
    enabled: role === ''
  });

  const { data: videos } = useQuery({ queryKey: [QUERY_KEYS.NEWS], queryFn: getNews });

  // Function to open modal with selected video
  const onClickSlideHandler = (videoId: string) => {
    setSelectedVideo(videoId);
  };

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
        <StyledSwiper
          spaceBetween={20}
          slidesPerView={3}
          pagination={{
            clickable: true
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {videos &&
            videos.map((video, index) => (
              <SwiperSlide key={index} onClick={() => onClickSlideHandler(video.youtubeId)}>
                <SingleSlide>
                  <img src={video.thumbnailUrl} alt="video preview" />
                  <NewsInfo>
                    <span>{video.tags[0]}</span>
                    <strong>{video.title}</strong>
                    <span>{video.publishedAt}</span>
                  </NewsInfo>
                </SingleSlide>
              </SwiperSlide>
            ))}
        </StyledSwiper>
        {role && role === 'admin' && <NewsUpload newsUrl={newsUrl} setNewsUrl={setNewsUrl} />}
      </SwiperContainer>

      {/* <NewsUpload /> */}
      {selectedVideo && <YoutubeModal videoId={selectedVideo} onClose={() => setSelectedVideo('')} />}
    </NewsRoomContainer>
  );
}

export default NewsRoom;

const NewsRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* place-items: center; */
  align-items: center;
  /* justify-content: center; */
  width: 100%;

  background-color: lightblue;
`;

const TabTitle = styled.div`
  width: 340px;
  border-radius: 20px 20px 0px 0px;
  background-color: #666;

  & h3 {
    text-align: center;
    display: flex;
    justify-content: center;
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
  /* height: 250px; */
  padding: 60px 120px;
  width: 100%;
  height: 800px;
  padding: 60px 180px;
  background-color: #666;
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
  height: 400px;
`;

const SingleSlide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: #fff;
  box-shadow: -2px 0px 6px 0px rgba(0, 0, 0, 0.15), 2px 4px 6px 0px rgba(0, 0, 0, 0.15);
  background-color: white;
  padding: 8px;

  & img {
    width: 100%;
    height: 62%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const NewsInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  flex: 1;
  /* row-gap: 18px; */

  & span {
    font-size: 15px;
    color: ${theme.color.gray};
  }

  & strong {
    font-size: 18px;
    font-weight: 500;
  }
`;
