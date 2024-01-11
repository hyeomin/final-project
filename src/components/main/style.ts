import styled from 'styled-components';
import { GoHeart } from 'react-icons/go';
import { GoHeartFill } from 'react-icons/go';

const Container = styled.div`
  /* background-color: #fcad92;  */
  display: flex; //FullContainer의 속성을 조절해야 가운데로 올듯
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1200px;
  height: 100%;
`;

const AdminContentsSection = styled.section`
  background-color: #f5e1ab;
  position: relative;
  width: 85%;
  height: 350px;
  margin-bottom: 10px;
  & img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;
const PrevNextBottons = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 87%; // gap말고 다른 스타일 속성 사용해야할듯
`;
const userPostsPosts = styled.section`
  /* background-color: #f5e1ab; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;
  height: 50%;
  margin-bottom: 10px;
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  /* background-color: red; */
  width: 100%;
  padding: 20px 0 0 10px;
  margin-bottom: 10px;
  & h1 {
    font-size: 30px;
  }
  & button {
    margin-top: 15px;
    border: none;
    background-color: transparent;
    font-weight: 700;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

const PostsSlide = styled.div`
  /* background-color: aqua; */
  display: flex;
  align-items: center;
  width: 100%;
`;
const ThumbnailsBox = styled.div`
  display: flex;
  /* background-color: aquamarine; */
  justify-content: center;
  width: 100%;
  height: 300px;
`;

const LikeButton = styled.button`
  border: none;
  background: none;
`;
const HeartIcon = styled(GoHeart)`
  background-color: blue;
  color: white;
  font-size: 26px;
  cursor: pointer;
`;

const HeartFillIcon = styled(GoHeartFill)`
  background-color: blue;
  color: red;
  font-size: 26px;
  cursor: pointer;
`;

export default {
  Container,
  AdminContentsSection,
  PrevNextBottons,
  userPostsPosts,
  Title,
  // Nav,
  PostsSlide,
  ThumbnailsBox,
  LikeButton,
  HeartIcon,
  HeartFillIcon
};
