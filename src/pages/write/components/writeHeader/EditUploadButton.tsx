import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { updatePost } from '../../../../api/postApi';
import { useModal } from '../../../../hooks/useModal';
import { QUERY_KEYS } from '../../../../query/keys';
import { initialPostInputState, postInputState } from '../../../../recoil/posts';
import { stripHtml } from '../../../../util/extractContentText';
import { CustomButton } from './styles';

type Props = {
  postId: string;
};

function EditUploadButton({ postId }: Props) {
  const modal = useModal();

  const [postInput, setPostInput] = useRecoilState(postInputState);
  const { title, content } = postInput;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const editingPost = {
    ...postInput,
    updatedAt: Date.now()
  };

  const updatePostMutation = useMutation({
    mutationFn: () => updatePost({ editingPost, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
      // 내용 원상복구
      setPostInput(initialPostInputState);
      // 임시저장 삭제
      sessionStorage.removeItem('savedData');
      navigate(`/detail/${postId}`);
    },
    onError: (error) => {
      console.log('게시글 수정 실패', error);
    }
  });

  const onUpdatePostHandler = () => {
    if (!postId) {
      const onClickConfirm = () => {
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '[알림]',
        message: '게시물을 찾을 수 없습니다.',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickConfirm
      };
      modal.open(openModalParams);
      return;
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
