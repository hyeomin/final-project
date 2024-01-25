import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { updatePost } from '../../../api/postApi';
import { useModal } from '../../../hooks/useModal';
import { QUERY_KEYS } from '../../../query/keys';
import { initialPostInputState, isEditingPostState, postInputState } from '../../../recoil/posts';
import { stripHtml } from '../../../util/extractContentText';
import { CustomButton } from './styles';

function EditUploadButton() {
  const modal = useModal();

  const [postInput, setPostInput] = useRecoilState(postInputState);
  const { title, content } = postInput;

  const isEditingPost = useRecoilValue(isEditingPostState);
  const { foundPost } = isEditingPost;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const editingPost = {
    ...postInput,
    updatedAt: Date.now()
  };

  const updatePostMutation = useMutation({
    mutationFn: () => updatePost({ editingPost, postId: foundPost!.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
      // 내용 원상복구
      setPostInput(initialPostInputState);
      navigate(`/detail/${foundPost?.id}`);
    }
  });

  const onUpdatePostHandler = () => {
    if (!foundPost) {
      const onClickConfirm = () => {
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '수정할 데이터가 없습니다.',
        message: '',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickConfirm
      };
      modal.open(openModalParams);
    }

    // 유효성 검사 (content에서 텍스트만 발라냄)
    if (title.length === 0 || stripHtml(content).trim().length === 0) {
      const onClickSave = () => {
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '제목과 내용 입력은 필수입니다.',
        message: '',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
    } else {
      const onClickCancel = () => {
        modal.close();
      };

      const onClickSave = () => {
        updatePostMutation.mutate();
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '수정 하시겠습니까?',
        message: '',
        leftButtonLabel: '취소',
        onClickLeftButton: onClickCancel,
        rightButtonLabel: '수정',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
    }
  };

  return (
    <CustomButton $variant="done" onClick={onUpdatePostHandler}>
      수정
    </CustomButton>
  );
}

export default EditUploadButton;
