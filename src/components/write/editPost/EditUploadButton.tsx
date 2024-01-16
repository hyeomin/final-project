import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { updatePost } from '../../../api/postApi';
import { QUERY_KEYS } from '../../../query/keys';
import { coverImageState, foundPostState, postState } from '../../../recoil/posts';
import { CustomButton } from '../SubmitButton';

function EditUploadButton() {
  const [post, setPost] = useRecoilState(postState);
  const { title } = post;

  const [foundPost, setFoundPost] = useRecoilState<PostType | undefined>(foundPostState);
  const [coverImages, setCoverImages] = useRecoilState(coverImageState);
  const [imageFileforUpload, setImageFileforUpload] = useState<File[]>([]);
  const [imageUrltoDelete, setImageUrltoDelete] = useState<string[]>([]);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const editingPost = {
    ...post,
    updatedAt: Date.now()
  };

  const updatePostMutation = useMutation({
    mutationFn: () => updatePost({ editingPost, postId: foundPost!.id, imageFileforUpload, imageUrltoDelete }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
      // 내용 원상복구
      setPost({
        title: '',
        content: '',
        category: 'noCategory',
        hashtags: []
      });
      setCoverImages([]);
      setFoundPost(undefined);
      navigate(`/detail/${foundPost?.id}`);
    }
  });

  const onUpdatePostHandler = () => {
    if (!foundPost) {
      window.alert('Post data not found');
      return;
    }

    if (title.length === 0) {
      window.alert('제목 입력은 필수입니다.');
      return;
    } else {
      const confirmation = window.confirm('수정하시겠습니까?');
      if (!confirmation) return;
    }
    // 새로운 이미지 업데이트
    const newImages = coverImages
      .filter((image) => image.isNew && image.file && !image.isDeleted)
      .map((image) => image.file) as File[];
    setImageFileforUpload(newImages);

    // 기존 업로드 되어 이미지 중 삭제된 것 정리
    const imageUrltoDelete = coverImages
      .filter((image) => !image.isNew && !image.file && image.isDeleted)
      .map((image) => image.url) as string[];
    setImageUrltoDelete(imageUrltoDelete);

    updatePostMutation.mutate();
  };

  return (
    <CustomButton variant="done" onClick={onUpdatePostHandler}>
      수정
    </CustomButton>
  );
}

export default EditUploadButton;
