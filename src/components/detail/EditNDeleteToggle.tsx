import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GoPencil, GoTrash } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deletePost } from '../../api/postApi';
import editNdeleteToggleBox from '../../assets/editndeletetoggle.png';
import { useModal } from '../../hooks/useModal';
// import { foundDetailPostProps } from '../../pages/Detail';
import { useSetRecoilState } from 'recoil';
import { QUERY_KEYS } from '../../query/keys';
import { isEditingPostState, postInputState } from '../../recoil/posts';
import theme from '../../styles/theme';
import { FoundDetailPostProps } from '../../types/PostType';

function EditNDeleteToggle({ foundDetailPost }: FoundDetailPostProps) {
  const modal = useModal();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const setPostInput = useSetRecoilState(postInputState);
  const setIsEditingPost = useSetRecoilState(isEditingPostState);

  const onEditPostHandler = () => {
    setPostInput({
      title: foundDetailPost.title,
      content: foundDetailPost.content,
      category: foundDetailPost.category,
      hashtags: foundDetailPost.hashtags,
      coverImages: foundDetailPost.coverImages
    });
    setIsEditingPost({
      foundPost: foundDetailPost,
      isEditing: true
    });
    navigate('/write', { state: { foundDetailPost } });
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
      deleteMutation.mutate(foundDetailPost.id);
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
    // if (foundDetailPost) {
    //   deleteMutation.mutate(foundDetailPost.id);
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
