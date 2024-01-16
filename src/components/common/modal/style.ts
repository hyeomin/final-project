import styled from 'styled-components';

const ScDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: saturate(180%) blur(8px);
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  border: none;
`;

const ScDivContainer = styled.div`
  width: 400px;
  height: 200px;
  padding: 20px;
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--white);
  border-radius: 8px;
`;

const ScDivTitleAndContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  gap: 10px;
  & h2 {
    font-weight: 600;
    font-size: 19px;
    padding-bottom: 10px;
  }
  & p {
    font-size: 14px;
    white-space: pre-wrap;
    min-height: 30px;
  }
`;

const ScDivButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ScButtonFirst = styled.button`
  width: calc(50% - 5px);
  height: 40px;
  border: 1px solid var(--deep-blue);
  background-color: var(--white);
  color: var(--deep-blue);
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    border: 1px solid var(--deep-blue);
    box-shadow: rgba(57, 167, 255, 0.4) 0px 0px 0px 3px;
  }
`;
const ScButtonSecond = styled.button`
  width: calc(50% - 5px);
  height: 40px;
  background-color: var(--deep-blue);
  color: var(--white);
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  &:hover {
    border: 1px solid var(--deep-blue);
    box-shadow: rgba(57, 167, 255, 0.4) 0px 0px 0px 3px;
  }
`;

export default { ScDiv, ScDivContainer, ScDivTitleAndContent, ScDivButton, ScButtonFirst, ScButtonSecond };
