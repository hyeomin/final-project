import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Footer from './footer/Footer';
import NavBar from './navbar/NavBar';

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
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px auto 0 auto;
`;
