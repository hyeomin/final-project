import styled from 'styled-components';
import editNdeleteToggleBox from 'assets/editndeletetoggle.png';
import theme from 'types/styles/theme';

const ToggleContainer = styled.div`
  background-image: url(${editNdeleteToggleBox});
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: transparent;

  position: absolute;
  top: 30px;
  width: 130px;
  height: 100px;
`;

const ToggleContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  padding: 25px;
  row-gap: 10px;
  font-size: 14px;
`;

const EditNDeleteSpan = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: black;
  font-weight: lighter;

  &:hover {
    color: ${theme.color.mangoMain};
    cursor: pointer;
  }
`;

export default { ToggleContainer, ToggleContentContainer, EditNDeleteSpan };
