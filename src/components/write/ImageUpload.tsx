import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
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
      <PreviewContainer>
        {coverImages.map(
          (image, index) =>
            !image.isDeleted && (
              <SinglePreview key={index}>
                <img src={image.url} alt={`Cover ${index}`} />
                <button onClick={() => onDeleteImageHandler(index)}>X</button>
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
  column-gap: 40px;
`;

const SinglePreview = styled.div`
  position: relative;

  & img {
    width: 200px;
    object-fit: contain;
  }

  & button {
    width: 25px;
    height: 25px;
    border: none;
    border-radius: 50%;
    position: absolute;
    top: -10px;
    right: -10px;
    cursor: pointer;
  }
`;
