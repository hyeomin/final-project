import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { coverImageState } from '../../recoil/posts';

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
    <div>
      <input type="file" multiple onChange={onAddImageHandler} style={{ display: 'none' }} ref={fileInputRef} />
      <button onClick={handleButtonClick}>커버 이미지 업로드</button>
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
    </div>
  );
}

export default ImageUpload;

const PreviewContainer = styled.section`
  display: flex;
  column-gap: 20px;
`;

const PreviewImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
`;
