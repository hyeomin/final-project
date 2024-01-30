import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Footer from './footer/Footer';
import NavBar from './navbar/NavBar';
import { useRecoilValue } from 'recoil';
import { modalState } from '../recoil/modals';

function Layout({ children }: PropsWithChildren) {
  const {
    isModalOpen01,
    isModalOpen02,
    isModalOpen03,
    isModalOpen04,
    isModalOpen05,
    isModalOpen06,
    isModalOpen07,
    isModalOpen08
  } = useRecoilValue(modalState);

  console.log(
    isModalOpen01,
    isModalOpen02,
    isModalOpen03,
    isModalOpen04,
    isModalOpen05,
    isModalOpen06,
    isModalOpen07,
    isModalOpen08
  );
  return (
    <LayoutContainer
      $isModalOpen={
        isModalOpen01 ||
        isModalOpen02 ||
        isModalOpen03 ||
        isModalOpen04 ||
        isModalOpen05 ||
        isModalOpen06 ||
        isModalOpen07 ||
        isModalOpen08
      }
    >
      <div>
        <NavBar />
        <MainWrapper>{children}</MainWrapper>
      </div>
      <Footer />
    </LayoutContainer>
  );
}

export default Layout;

type LayoutProps = {
  $isModalOpen: boolean;
};

const LayoutContainer = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) => (props.$isModalOpen ? 'rgba(0, 0, 0, 0.02)' : 'white')};
  backdrop-filter: ${(props) => (props.$isModalOpen ? 'saturate(180%) blur(8px)' : 'none')};
  // overflow: ${(props) => (props.$isModalOpen ? 'hidden' : 'unset')};
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px auto 0 auto;
`;
