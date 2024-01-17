import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { GoTrash } from 'react-icons/go';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { downloadCoverImageURLs } from '../../api/detailApi';
import DragNDrop from '../../assets/icons/dragndrop.png';
import { IsEditingProps } from '../../pages/Write';
import { coverImageState } from '../../recoil/posts';
import theme from '../../styles/theme';

export type ImageItem = {
  url: string;
  isNew: boolean;
  isDeleted?: boolean;
  file?: File;
};

function ImageUpload({ foundPost, isEditing }: IsEditingProps) {
  const [coverImages, setCoverImages] = useRecoilState(coverImageState);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    data: imageURLList,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['imageURL', foundPost?.id],
    queryFn: () => downloadCoverImageURLs(foundPost?.id!),
    enabled: !!foundPost?.id
  });

  useEffect(() => {
    if (imageURLList) {
      const images = imageURLList.map((url) => ({ url, isNew: false }));
      setCoverImages(images);
    }
  }, [imageURLList, setCoverImages]);

  const onAddImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = event.target.files;

    if (selectedImages) {
      for (let i = 0; i < selectedImages?.length; i++) {
        if (selectedImages[i].size > 100 * 1024 * 1024) {
          alert('최대 100MB까지 업로드 가능합니다');
          return;
        }
      }

      const filesArray = Array.from(selectedImages).map((file) => ({
        url: URL.createObjectURL(file),
        isNew: true,
        file: file
      }));
      const updatedImageList = [...coverImages, ...filesArray];
      setCoverImages(updatedImageList);
    }
  };

  const onDeleteImageHandler = (index: number) => {
    // Mark the image as deleted in the state
    const updatedImages = coverImages.map((img, idx) => {
      if (idx === index) {
        return { ...img, isDeleted: true };
      }
      return img;
    });
    setCoverImages(updatedImages);
  };

  const handleButtonClick = () => {
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
      <PreviewTitle>미리보기</PreviewTitle>
      <PreviewContainer>
        {coverImages.map(
          (image, index) =>
            !image.isDeleted && (
              <SinglePreview key={index}>
                <img src={image.url} alt={`Cover ${index}`} />
                <SinglePreviewInfo>
                  <div>
                    <p>{image.file?.name}</p>
                    <span>Finished</span>
                  </div>
                  <button onClick={() => onDeleteImageHandler(index)}>
                    <GoTrash />
                  </button>
                </SinglePreviewInfo>
              </SinglePreview>
            )
        )}
      </PreviewContainer>
    </UploadContainer>
  );
}

export default ImageUpload;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  border: 1px solid lightgray;
  padding: 40px;
`;

const DragNDropContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 250px;
  border-radius: 10px;
  border: 1px dashed #ffa114;
  color: #888;
  font-size: 14px;
  cursor: pointer;

  & img {
    width: 80px;
    object-fit: contain;
    color: pink;
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

const PreviewTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const PreviewContainer = styled.section`
  display: flex;
  column-gap: 40px;
`;

const SinglePreview = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  position: relative;

  & img {
    width: 260px;
    height: 160px;
    object-fit: contain;
    border-radius: 10px;
    overflow: hidden;
    background-color: #d9d9d9;
  }

  & div {
    display: flex;
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

    & span {
      color: ${theme.color.lightgray};
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
