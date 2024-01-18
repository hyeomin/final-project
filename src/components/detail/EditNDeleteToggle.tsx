import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GoPencil, GoTrash } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deletePost } from '../../api/postApi';
import editNdeleteToggleBox from '../../assets/editndeletetoggle.png';
import { useModal } from '../../hooks/useModal';
import { FoundPostProps } from '../../pages/Detail';
import { QUERY_KEYS } from '../../query/keys';
import theme from '../../styles/theme';

function EditNDeleteToggle({ foundPost }: FoundPostProps) {
  const modal = useModal();
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
    const onClickCancel = () => {
      modal.close();
    };

    const onClickSave = () => {
      deleteMutation.mutate(foundPost.id);
      modal.close();
    };

    const openModalParams: Parameters<typeof modal.open>[0] = {
      title: '삭제 하시겠습니까?',
      message: '',
      leftButtonLabel: '취소',
      onClickLeftButton: onClickCancel,
      rightButtonLabel: '삭제',
      onClickRightButton: onClickSave
    };
    modal.open(openModalParams);

    // const confirm = window.confirm('삭제하시겠습니까?');
    // if (!confirm) return;
    // if (foundPost) {
    //   deleteMutation.mutate(foundPost.id);
    // }
  };

  return (
    <ToggleContainer>
      <ToggleContentContainer>
        <EditNDeleteSpan onClick={onEditPostHandler}>
          수정하기
          <div>
            <GoPencil />
          </div>
        </EditNDeleteSpan>
        <EditNDeleteSpan onClick={onDeletePostHandler}>
          삭제하기
          <div>
            <GoTrash />
          </div>
        </EditNDeleteSpan>
      </ToggleContentContainer>
    </ToggleContainer>
  );
}

export default EditNDeleteToggle;

const ToggleContainer = styled.div`
  background-image: url(${editNdeleteToggleBox});
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: transparent;

  position: absolute;
  top: 30px;
  width: 130px;
  height: 100px;
`;

const ToggleContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  padding: 25px;
  row-gap: 10px;
  font-size: 14px;
`;

const EditNDeleteSpan = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: black;
  font-weight: lighter;

  &:hover {
    color: ${theme.color.mangoMain};
    cursor: pointer;
  }
`;
