import styled from "styled-components";

const Container = styled.div`
  /* background-color: brown;  */
  display: flex; //FullContainer의 속성을 조절해야 가운데로 올듯
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  height: 100%;
`;

const AdminSection = styled.section`
  background-color: #f5e1ab;
  position: relative;
  width: 85%;
  height: 400px;
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
const TopRankingPosts = styled.section`
  background-color: #f5e1ab;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;
  height: 250px;
  margin-bottom: 10px;
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1200px;
  /* background-color: red; */
  width: 100%;
  padding: 0 10px;
  margin-bottom: 50px;
  gap: 75%; // gap말고 다른 스타일 속성 사용해야할듯
`;
const Nav = styled.nav`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  & button {
    padding: 5px 20px;
  }
`;
const PostsSlide = styled.div`
  background-color: aqua;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  & div {
    position: absolute;
    display: flex;
    width: 100%;
    gap: 86%;
  }
`;
const ThumbnailsBox = styled.ul`
  display: flex;
  background-color: aquamarine;
  justify-content: center;
  width: 100%;
  gap: 10px;
  & li {
    width: 110px;
    height: 110px;
    background-color: beige;
    & img {
      width: 100%;
      height: 100%;
    }
  }
`;

export default {
  Container,
  AdminSection,
  PrevNextBottons,
  TopRankingPosts,
  Title,
  Nav,
  PostsSlide,
  ThumbnailsBox,
};

