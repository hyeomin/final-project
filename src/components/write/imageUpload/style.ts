import styled from 'styled-components';
import theme from '../../../styles/theme';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 40px;
`;

const DragNDropContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 280px;
  border-radius: 10px;
  border: 1px dashed #ffa114;

  & img {
    width: 80px;
    object-fit: contain;
  }

  & button {
    background-color: ${theme.color.mangoMain};
    border-radius: 30px;
    border: none;
    width: 120px;
    height: 30px;
    font-size: 14px;
    color: white;
    margin-bottom: 20px;
    cursor: pointer;
  }
`;

const UploadTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
  margin-bottom: 20px;
  font-size: 12px;

  & p {
    font-weight: lighter;
    color: ${theme.color.gray};
  }
`;

const PreviewTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const PreviewContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 40px;
`;

const SinglePreview = styled.div`
  display: grid;
  row-gap: 10px;
  position: relative;

  & img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    /* border-radius: 10px; */
    overflow: hidden;
    background-color: ${theme.color.lightgray};
  }
`;

const SinglePreviewInfo = styled.div`
  display: flex;
  justify-content: center;

  & div {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    flex: 1;

    p {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
    }

    & span {
      color: ${theme.color.gray};
      font-size: 15px;
    }
  }

  & button {
    font-size: 14px;
    width: 30px;
    border: none;
    background: none;
    cursor: pointer;
  }
`;

export default {
  DragNDropContainer,
  PreviewContainer,
  PreviewTitle,
  SinglePreview,
  SinglePreviewInfo,
  UploadContainer,
  UploadTextBox
};
