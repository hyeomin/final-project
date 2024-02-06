import styled from 'styled-components';
import theme from 'types/styles/theme';

const ToggleContainer = styled.div`
  display: flex;
  justify-content: end;
  font-size: 14px;
  position: absolute;
  top: 65px;
  right: 60px;
  z-index: 100;
  @media screen and (max-width: 431px) {
    top: 58px;
    right: 30px;
  }
`;

const ToggleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  width: 320px;
  height: 320px;
  border-radius: 20px;
  background-color: ${theme.color.veryLightGray};

  @media screen and (max-width: 431px) {
    width: 270px;
    height: 270px;
  }
`;

const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 90px;
  height: 90px;
  position: relative;
  overflow: hidden;

  & img {
    /* object-fit: contain; */
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

interface AuthButtonProps {
  $bgcolor: string;
  $bdrcolor: string;
}

const AuthButton = styled.button<AuthButtonProps>`
  text-align: center;
  padding: 10px 5px;
  width: 120px;
  border-radius: 10px;
  background-color: ${(props) => props.$bgcolor};
  border: 1px solid ${(props) => props.$bdrcolor};
  cursor: pointer;

  @media screen and (max-width: 431px) {
    width: 100px;
  }
`;

export default { ToggleContainer, ToggleBox, ProfileImageContainer, ButtonContainer, AuthButton };
