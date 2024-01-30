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
  background-color: #fff;
  border-radius: 8px;

  @media screen and (max-width: 376px) {
    width: 300px;
    height: 180px;
  }
  @media screen and (min-width: 376px) and (max-width: 620px) {
    width: 300px;
    height: 180px;
  }
`;

const ScDivTitleAndContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  gap: 3px;
  color: #222;
  & h2 {
    font-weight: 600;
    font-size: 22px;
    padding-bottom: 10px;

    @media screen and (max-width: 376px) {
      font-weight: 600;
      font-size: 20px;
    }
    @media screen and (min-width: 376px) and (max-width: 620px) {
      font-weight: 600;
      font-size: 20px;
    }
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
  width: 100px;
  height: 40px;
  border: 1px solid #ddd;
  background-color: #ddd;
  color: #fff;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    border: 1px solid #ddd;
    box-shadow: rgba(221, 221, 221, 0.4) 0px 0px 0px 3px;
  }
`;
const ScButtonSecond = styled.button`
  width: 100px;
  height: 40px;
  background-color: #ffa114;
  color: #fff;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;

  &:hover {
    border: 1px solid #ffa114;
    box-shadow: rgba(255, 161, 20, 0.4) 0px 0px 0px 3px;
  }
`;

export default { ScDiv, ScDivContainer, ScDivTitleAndContent, ScDivButton, ScButtonFirst, ScButtonSecond };
