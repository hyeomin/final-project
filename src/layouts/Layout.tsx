import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import NavBar from './NavBar';

function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <NavBar />
      <MainWrapper>{children}</MainWrapper>
      <Footer />
    </div>
  );
}

export default Layout;

const MainWrapper = styled.div`
  width: 1000px;
  margin: 30px auto;
`;
