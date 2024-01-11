import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { addPost } from '../../api/postApi';
import { contentState, coverImageState, hashtagState, titleState } from '../../recoil/posts';
import theme from '../../styles/theme';
import { PostType2 } from '../../types/Posts';

type Props = {
  newPost: Omit<PostType2, 'id'>;
};

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'save' | 'done';
}

function SubmitButton({ newPost }: Props) {
  const [coverImageList, setCoverImageList] = useRecoilState(coverImageState);
  const [title, setTitle] = useRecoilState(titleState);
  const [content, setContent] = useRecoilState(contentState);
  const [hashtags, setHashtags] = useRecoilState(hashtagState);

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: () => addPost({ newPost, coverImageList }),
    onSuccess: (postId) => {
      queryClient.invalidateQueries({ queryKey: ['addPost'] });
      setTitle('');
      setContent('');
      setHashtags([]);
      navigate(`/detail/${postId}`);
    }
  });

  const onSubmitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (title.length === 0) {
      window.alert('제목 입력은 필수입니다.');
      return;
    } else {
      const confirmation = window.confirm('등록하시겠습니까?');
      if (!confirmation) return;
    }
    addMutation.mutate();
  };

  return (
    <ButtonContainer>
      <CustomButton variant="save">임시 저장</CustomButton>
      <CustomButton variant="done" onClick={onSubmitHandler}>
        완료
      </CustomButton>
    </ButtonContainer>
  );
}

export default SubmitButton;

const ButtonContainer = styled.div`
  display: flex;
  column-gap: 10px;
`;

const CustomButton = styled.button<CustomButtonProps>`
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
