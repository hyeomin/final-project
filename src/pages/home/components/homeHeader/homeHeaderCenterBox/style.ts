import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'styles/theme';

const HeaderMain = styled.section`
  width: 1200px;
  height: 100%;
  margin: 20px auto 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  padding: 90px 150px;

  display: flex;
  align-items: end;

  @media screen and (max-width: 431px) {
    height: 300px;
    width: 100%;
    padding: 40px 30px;
    /* top: 10%;
    left: 10%; */
  }
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  & div {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    & h1 {
      font-size: 36px;
      font-weight: 700;

      @media screen and (max-width: 431px) {
        font-size: 20px;
        font-weight: 700;
      }
    }

    & h2 {
      font-size: 24px;

      @media screen and (max-width: 431px) {
        font-weight: 20px;
      }
    }
  }

  & p {
    font-size: 22px;
    line-height: normal;
    font-weight: 700;
    color: ${theme.color.mangoMain};

    @media screen and (max-width: 431px) {
      font-size: 15px;
    }
  }
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  row-gap: 40px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  align-items: center;
  flex-shrink: 1;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 40px;
  @media screen and (max-width: 431px) {
    row-gap: 20px;
  }
`;

const DetailLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  width: 170px;
  height: 45px;
  border-radius: 10px;
  background-color: #11111174;
  border: none;
  /* background-color: ${theme.color.mangoMain}
  opacity: 80%; */

  p {
    color: white;
  }

  &:hover {
    cursor: pointer;
    background-color: #00000099;
  }
  @media screen and (max-width: 431px) {
    width: 120px;
    font-size: 12px;
  }
`;

const NavButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 25px;

  color: white;
  border: none;
  background-color: #11111174;

  &:hover {
    cursor: pointer;
    background-color: #00000099;
  }

  @media screen and (max-width: 431px) {
    width: 20px;
    height: 20px;
    font-size: 20px;
  }
`;

export default {
  HeaderMain,
  HeaderText,
  HeaderInfo,
  ButtonContainer,
  FlexBox,
  DetailLink,
  NavButtonContainer,
  NavButton
};
