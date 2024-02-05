import styled from 'styled-components';
import theme from '../../../../styles/theme';

const BodyContainer = styled.div`
  width: 100%;
  margin: 40px 0;

  @media screen and (max-width: 431px) {
    padding: 40px 20px;
  }
`;

const BodyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostInfo = styled.div`
  display: flex;
  column-gap: 20px;
  font-size: 18px;
  font-weight: bold;

  & img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }

  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 15px;
  }
  @media screen and (max-width: 431px) {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50px;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      row-gap: 8px;
      font-size: 14px;
    }
  }
`;

const DateSpan = styled.span`
  color: ${theme.color.gray};
  font-size: 14px;
  font-weight: 300;
  @media screen and (max-width: 431px) {
    font-size: 13px;
  }
`;

const EditNDeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  position: relative;
  color: ${theme.color.lightgray};

  & button {
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    border: none;
    background-color: transparent;
  }
`;

const ContentBody = styled.div`
  color: ${theme.color.darkgray};
  padding: 40px 0;
  border-bottom: 1px solid ${theme.color.lightgray};
  line-height: 200%;
  overflow: hidden;
  h1 {
    display: block;
    font-size: 2em;
    margin: 0.67em 0;
    font-weight: bold;
  }
  h2 {
    display: block;
    font-size: 1.5em;
    margin: 0.83em 0;

    font-weight: bold;
  }
  h3 {
    display: block;
    font-size: 1.17em;
    margin: 1em 0;
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  strong {
    font-weight: bold;
  }

  //모바일 (세로)
  @media screen and (max-width: 431px) {
    img {
      width: 350px;
      height: 100%;
      object-fit: cover;
    }
    width: 100%;
    line-height: 185%;
    font-size: 14px;
  }
`;

const AdditionalInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  column-gap: 30px;
  font-size: 18px;
  color: #222222;
  padding: 15px 0;
  @media screen and (max-width: 431px) {
    img {
      width: 15px;
      height: 15px;
      object-fit: cover;
    }
    align-items: center;
    width: 100%;
    height: 40px;
    line-height: 185%;
    font-size: 14px;
  }
`;

const DetailInfo = styled.div`
  display: flex;
  column-gap: 12px;
  align-items: center;

  & div {
    display: flex;
    align-items: center;
    column-gap: 7px;
  }
`;

const ShareInfo = styled.div`
  display: flex;
  column-gap: 8px;

  & button {
    border: none;
    width: 33px;
    height: 33px;
    background-color: transparent;
    font-weight: 900x;
    font-size: 18px;

    & img {
      width: 100%;
      object-fit: contain;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export default {
  BodyContainer,
  BodyHeader,
  PostInfo,
  DateSpan,
  EditNDeleteContainer,
  ContentBody,
  AdditionalInfoContainer,
  DetailInfo,
  ShareInfo
};
