import { PropsWithChildren } from 'react';
import { useRecoilValue } from 'recoil';
import { modalState } from 'recoil/modals';
import Footer from './footer/Footer';
import NavBar from './navbar/NavBar';

import St from './style';

function Layout({ children }: PropsWithChildren) {
  const {
    isModalOpen01,
    isModalOpen02,
    isModalOpen03,
    isModalOpen04,
    isModalOpen05,
    isModalOpen06,
    isModalOpen07,
    isModalOpen08,
    isModalOpen09
  } = useRecoilValue(modalState);

  return (
    <St.LayoutContainer
      $isModalOpen={
        isModalOpen01 ||
        isModalOpen02 ||
        isModalOpen03 ||
        isModalOpen04 ||
        isModalOpen05 ||
        isModalOpen06 ||
        isModalOpen07 ||
        isModalOpen08 ||
        isModalOpen09
      }
    >
      <div>
        <NavBar />
        <St.MainWrapper>{children}</St.MainWrapper>
      </div>
      <Footer />
    </St.LayoutContainer>
  );
}

export default Layout;
