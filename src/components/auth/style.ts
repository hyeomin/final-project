import styled from 'styled-components';

const authWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div``;
const profileImg = styled.img`
  width: 50px;
  height: 50px;
`;

const WarningMsg = styled.p`
  color: red;
`;

export default { InputContainer, profileImg, authWrapper, WarningMsg };
