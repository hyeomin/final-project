import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deletePost } from '../../api/postApi';
import { QUERY_KEYS } from '../../query/keys';

type Props = {
  foundPost: PostType;
};

function EditNDelete({ foundPost }: Props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onEditPostHandler = () => {
    navigate('/write', { state: { foundPost: foundPost } });
  };

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
      navigate('/');
    }
  });

  const onDeletePostHandler = () => {
    const confirm = window.confirm('삭제하시겠습니까?');
    if (!confirm) return;
    deleteMutation.mutate(foundPost.id);
  };

  return (
    <ButtonContainer>
      <button onClick={onEditPostHandler}>수정하기</button>
      <button onClick={onDeletePostHandler}>삭제하기</button>
    </ButtonContainer>
  );
}

export default EditNDelete;

const ButtonContainer = styled.div``;
