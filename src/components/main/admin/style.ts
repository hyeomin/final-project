import styled from 'styled-components';
import theme from '../../../styles/theme';

const Container = styled.div`
  /* background-color: #fcad92;  */
  display: flex; //FullContainer의 속성을 조절해야 가운데로 올듯
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* max-width: 1440px; */
  width: 100%;
  /* height: 100%; */
`;

const AdminContentsSection = styled.section`
  background-color: #f5e1ab;
  position: relative;
  width: 100vw;
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

export default {
  Container,
  AdminContentsSection,
  PrevNextBottons
};
