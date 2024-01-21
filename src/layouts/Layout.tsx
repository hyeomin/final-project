import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import NavBar from './NavBar';

function Layout({ children }: PropsWithChildren) {
  return (
    <LayoutContainer>
      <div>
        <NavBar />
        <MainWrapper>{children}</MainWrapper>
      </div>
      <Footer />
    </LayoutContainer>
  );
}

export default Layout;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* min-height: 100vh; */
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  /* width: 1000px; */
  margin: auto;
`;
