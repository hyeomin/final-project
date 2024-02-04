import styled from 'styled-components';
import theme from '../../../styles/theme';

const ModalBackdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  @media screen and (max-width: 431px) {
    padding: 20px;
  }
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 600px;
  height: auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  border-radius: 20px;
  overflow: hidden;

  @media screen and (max-width: 431px) {
    width: 100%;
    height: auto;
  }
`;

const GuideImage = styled.img`
  object-fit: fill;
  border-radius: 10px;
`;

const NavigationButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const NavButton = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;

  & span {
    display: flex;
    align-items: end;
    font-size: 50px;
    color: ${theme.color.gray};
    opacity: 80%;
  }

  @media screen and (max-width: 431px) {
    width: 30px;
    height: 30px;
    & span {
      font-size: 25px;
    }
  }
`;

const PageCount = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
  font-weight: 400;
`;

export default { ModalBackdrop, ModalContent, GuideImage, NavigationButtonContainer, NavButton, PageCount };
