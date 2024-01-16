import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { addPost } from '../../api/postApi';
import { QUERY_KEYS } from '../../query/keys';
import { coverImageState, postState } from '../../recoil/posts';
import { roleState } from '../../recoil/users';
import { auth } from '../../shared/firebase';
import theme from '../../styles/theme';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'save' | 'done';
}

function SubmitButton() {
  const [post, setPost] = useRecoilState(postState);
  const { title } = post;

  const [coverImageList, setCoverImageList] = useRecoilState(coverImageState);
  const [imageFileforUpload, setImageFileforUpload] = useState<File[]>([]);
  const [role, setRole] = useRecoilState(roleState);

  const navigate = useNavigate();

  const newPost = {
    ...post,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    uid: auth.currentUser?.uid,
    likeCount: 0,
    likedUsers: [],
    role
  };

  // 게시물 추가
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: () => addPost({ newPost, imageFileforUpload }),
    onSuccess: (postId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });

      // 내용 원상복구
      setPost({
        title: '',
        content: '',
        category: 'noCategory',
        hashtags: []
      });
      setCoverImageList([]);
      navigate(`/detail/${postId}`);
    }
  });

  const onSubmitPostHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (title.length === 0) {
      window.alert('제목 입력은 필수입니다.');
      return;
    } else {
      const confirmation = window.confirm('등록하시겠습니까?');
      if (!confirmation) return;
    }
    const newImages = coverImageList.filter((image) => image.file).map((image) => image.file) as File[];
    setImageFileforUpload(newImages);

    addMutation.mutate();
  };

  return (
    <CustomButton variant="done" onClick={onSubmitPostHandler}>
      완료
    </CustomButton>
  );
}

export default SubmitButton;

export const CustomButton = styled.button<CustomButtonProps>`
  color: white;
  background-color: ${theme.color.mangoMain};
  border: none;
  border-radius: 5px;
  padding: 10px 15px;

  ${({ variant }) =>
    variant === 'save' &&
    `
    color: black;
    background-color: white;
  `}
`;
