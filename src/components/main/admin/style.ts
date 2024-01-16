import styled from 'styled-components';

const Container = styled.section`
  /* background-color: #f5e1ab; */
  position: relative;
  width: 100vw;
  height: 350px;
  margin-bottom: 10px;
  & img {
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
  PrevNextBottons
};
