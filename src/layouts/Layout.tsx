import { PropsWithChildren } from 'react';
import Footer from './Footer';
import NavBar from './NavBar';

function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
