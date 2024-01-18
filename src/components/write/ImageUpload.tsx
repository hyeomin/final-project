import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { GoTrash } from 'react-icons/go';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { downloadCoverImageURLs } from '../../api/detailApi';
import DragNDrop from '../../assets/icons/dragndrop.png';
import { IsEditingPostProps } from '../../pages/Write';
import { coverImageState } from '../../recoil/posts';
import theme from '../../styles/theme';

export type ImageItem = {
  url: string;
  isNew: boolean;
  isDeleted?: boolean;
  file?: File;
};

function ImageUpload({ foundPost, isEditingPost }: IsEditingPostProps) {
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

  // isEditing 이고, foundPost도 있고, imageURLList 잘 불러와졌을 때만 imageURLList.map이 실행되게
  useEffect(() => {
    if (isEditingPost && foundPost && Array.isArray(imageURLList)) {
      const images = imageURLList.map((url) => ({ url, isNew: false }));
      setCoverImages(images);
    }
  }, [imageURLList, setCoverImages, isEditingPost, foundPost]);

  // Drag and Drop 핸들러들
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const selectedImages = event.dataTransfer.files;
    processImages(selectedImages);
  };

  // input 태그를 통해 선택된 이미지를 coverImages 배열 안에 file 타입으로 넣기
  const onAddImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = event.target.files;
    if (selectedImages) {
      processImages(selectedImages);
    }
  };

  const processImages = (selectedImages: FileList) => {
    // 업로드 가능한 이미지 개수 제한
    const totalImages = coverImages.length + selectedImages.length;
    if (totalImages > 3) {
      alert('최대 업로드 가능한 개수는 3개입니다.');
      return;
    }
    // 업로드 가능한 이미지 파일 크기 하나씩 확인하면서 제한
    for (let i = 0; i < selectedImages?.length; i++) {
      if (selectedImages[i].size > 100 * 1024 * 1024) {
        alert('최대 100MB까지 업로드 가능합니다');
        return;
      }
    }
    // 업로드된 이미지 firebase에 넘기기 적합한 구조로 배열 생성
    const filesArray = Array.from(selectedImages).map((file) => ({
      url: URL.createObjectURL(file),
      isNew: true,
      file: file
    }));
    // 수정 중이었다면, 다운로드 된 기존 이미지에 배열 추가
    const updatedImageList = [...coverImages, ...filesArray];
    setCoverImages(updatedImageList);
  };

  // 바로 파이어베이스 삭제 안하고, isDelete=true 속성 줬다가,
  // 나중에 올리기 전에 필터링 하거나 이미 올라가있는 경우 파이어베이스에서 삭제
  const onDeleteImageHandler = (index: number) => {
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
      <DragNDropContainer onClick={handleButtonClick} onDragOver={handleDragOver} onDrop={handleDrop}>
        <input type="file" multiple onChange={onAddImageHandler} style={{ display: 'none' }} ref={fileInputRef} />
        <img src={DragNDrop} alt="cloud-icon" />
        <button>Upload</button>
        <UploadTextBox>
          <p>Drag & drop to load</p>
          <span>Maximum file size is 100MB</span>
        </UploadTextBox>
      </DragNDropContainer>
      <PreviewTitle>커버 이미지 미리보기</PreviewTitle>
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
  cursor: pointer;

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

  & span {
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
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  position: relative;

  & img {
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

    p {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
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
