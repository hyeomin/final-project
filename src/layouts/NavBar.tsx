import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

function NavBar() {
  return (
    <NavContainer>
      <LeftNav className="left-side">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">Community</NavLink>
        <NavLink to="/about">About</NavLink>
      </LeftNav>
      <RightNav className="right-side">
        <NavLink to="/auth">Login</NavLink>
        <NavLink to="/write">Write</NavLink>
        <NavLink to="/about">My Page</NavLink>
      </RightNav>
    </NavContainer>
  );
}

export default NavBar;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 10px 30px;
`;

const LeftNav = styled.div`
  display: flex;
  column-gap: 10px;
`;

const RightNav = styled.div`
  display: flex;
  column-gap: 10px;
`;
