import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { GoTrash } from 'react-icons/go';
import { useRecoilState } from 'recoil';
import { deleteImage, uploadSingleImage } from '../../../api/postApi';
import DragNDrop from '../../../assets/icons/dragndrop.png';
import { postInputState } from '../../../recoil/posts';
import St from './style';

function ImageUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [postInput, setPostInput] = useRecoilState(postInputState);
  const { coverImages } = postInput;

  const queryClient = useQueryClient();

  // 이미지 올리는 query
  const addImageMutation = useMutation({
    mutationFn: (file: File) => uploadSingleImage({ coverImage: file }),
    onSuccess: (downloadedImage) => {
      if (downloadedImage) {
        // 정상적으로 url을 반환 받았는지 확인
        queryClient.invalidateQueries();
        setPostInput({
          ...postInput,
          coverImages: [...coverImages, downloadedImage]
        });
      } else {
        console.error('Failed to get the image URL');
      }
    }
  });

  // 드래그앤드롭 핸들링
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const selectedImageFiles = event.dataTransfer.files;
    processImages(selectedImageFiles);
  };

  // input 태그를 통해 선택된 이미지를 coverImages 배열 안에 file 타입으로 넣기
  const onAddImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImageFiles = event.target.files;
    if (selectedImageFiles) {
      processImages(selectedImageFiles);
    }
  };

  // 사용자가 업로드한 이미지 유효성 검사
  const processImages = async (selectedImageFiles: FileList) => {
    // 업로드 가능한 이미지 개수 제한
    const totalImages = selectedImageFiles.length + (coverImages ? coverImages.length : 0);
    if (totalImages > 3) {
      alert('최대 업로드 가능한 개수는 3개입니다.');
      return;
    }
    // 업로드 가능한 이미지 파일 크기 하나씩 확인하면서 제한
    for (let i = 0; i < selectedImageFiles?.length; i++) {
      if (selectedImageFiles[i].size <= 100 * 1024 * 1024) {
        // mutation 매개변수 넘겨주기
        addImageMutation.mutate(selectedImageFiles[i]);
      } else {
        alert('File size exceeds limit');
      }
    }
  };

  // 박스 전체 눌러도 이미지 선택할 수 있게
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const deletePostMutation = useMutation({
    mutationFn: (url: string) => deleteImage(url),
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  // 이미지 삭제
  const onDeleteImageHandler = (url: string) => {
    alert('삭제하시겠습니까?');
    const deleteImages = coverImages.filter((image) => image.url !== url);
    setPostInput({
      ...postInput,
      coverImages: deleteImages
    });
    deletePostMutation.mutate(url);
  };

  return (
    <St.UploadContainer>
      <St.DragNDropContainer onClick={handleButtonClick} onDragOver={handleDragOver} onDrop={handleDrop}>
        <input type="file" multiple onChange={onAddImageHandler} style={{ display: 'none' }} ref={fileInputRef} />
        <img src={DragNDrop} alt="cloud-icon" />
        <button>Upload</button>
        <St.UploadTextBox>
          <p>Drag & drop to load</p>
          <span>Maximum file size is 100MB</span>
        </St.UploadTextBox>
      </St.DragNDropContainer>
      <St.PreviewTitle>커버 이미지 미리보기</St.PreviewTitle>
      <St.PreviewContainer>
        {coverImages &&
          coverImages.map((image) => {
            return (
              <St.SinglePreview key={image.url}>
                <img src={image.url} alt={'cover'} />
                <St.SinglePreviewInfo>
                  <div>
                    <p>{image.name}</p>
                    <span>Finished</span>
                  </div>
                  <button onClick={() => onDeleteImageHandler(image.url)}>
                    <GoTrash />
                  </button>
                </St.SinglePreviewInfo>
              </St.SinglePreview>
            );
          })}
      </St.PreviewContainer>
    </St.UploadContainer>
  );
}

export default ImageUpload;
