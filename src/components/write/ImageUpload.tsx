import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import DragNDrop from '../../assets/icons/dragndrop.png';
import { coverImageState } from '../../recoil/posts';
import theme from '../../styles/theme';

function ImageUpload() {
  const [coverImageList, setCoverImageList] = useRecoilState(coverImageState);

  const onAddImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = event.target.files;

    if (selectedImages) {
      const filesArray = Array.from(selectedImages);
      const updatedImageList = [...coverImageList, ...filesArray];
      setCoverImageList(updatedImageList);
    }
  };

  const onDeletePreview = (id: number) => {
    const listAfterDelete = coverImageList.filter((_, index) => index !== id);
    setCoverImageList(listAfterDelete);
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    console.log(9);
    fileInputRef.current?.click();
  };

  return (
    <UploadContainer>
      <DragNDropContainer onClick={handleButtonClick}>
        <input type="file" multiple onChange={onAddImageHandler} style={{ display: 'none' }} ref={fileInputRef} />
        <img src={DragNDrop} alt="cloud-icon" />
        <UploadTextBox>
          <p>Drag & drop to load</p>
          <span>or browse</span>
        </UploadTextBox>
        <span>Maximum file size is 100MB</span>
      </DragNDropContainer>
      {/* <button onClick={handleButtonClick}>커버 이미지 업로드</button> */}
      <PreviewContainer>
        {coverImageList.map((file, id) => {
          const imageUrl = URL.createObjectURL(file);
          return (
            <div key={id}>
              <PreviewImage src={imageUrl} alt={`${file.name}-${id}`} />
              <button onClick={() => onDeletePreview(id)}>삭제</button>
            </div>
          );
        })}
      </PreviewContainer>
    </UploadContainer>
  );
}

export default ImageUpload;

const UploadContainer = styled.div`
  border: 1px solid lightgray;
`;

const DragNDropContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 350px;
  border-radius: 10px;
  border: 1px dashed #ffa114;
  margin: 40px;
  color: #888;
  font-size: 14px;
  cursor: pointer;

  & img {
    width: 80px;
  }
`;

const UploadTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  row-gap: 5px;
  margin-bottom: 20px;

  & span {
    color: ${theme.color.mangoMain};
    font-weight: lighter;
    font-size: 12px;
  }
`;

const PreviewContainer = styled.section`
  display: flex;
  column-gap: 20px;
`;

const PreviewImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
`;
