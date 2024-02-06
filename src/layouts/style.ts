import styled from 'styled-components';

type LayoutProps = {
  $isModalOpen: boolean;
};

const LayoutContainer = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  background-color: ${(props) => (props.$isModalOpen ? 'rgba(0, 0, 0, 0.02)' : 'white')};
  backdrop-filter: ${(props) => (props.$isModalOpen ? 'saturate(180%) blur(8px)' : 'none')};
  overflow: ${(props) => (props.$isModalOpen ? 'hidden' : 'unset')};
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px auto 0 auto;

  //모바일 세로
  @media screen and (max-width: 431px) {
    max-width: 100%;
    min-width: 0;
    margin: 70px 20px auto 20px;
  }
`;

export default { LayoutContainer, MainWrapper };
