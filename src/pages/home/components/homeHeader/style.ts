import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.section`
  /* position: relative; */
  /* width: 100vw; */
  width: 100%;
  height: 450px;
  margin-bottom: 10px;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 170px;
  height: 45px;
  border-radius: 10px;
  background-color: #11111174;
  border: none;
  font-size: 17px;
  font-weight: 400;
  cursor: pointer;
  bottom: 150px;
  left: 215px;
  &:hover {
    background-color: #00000099;
  }
`;

export default {
  Container,
  Button
};
