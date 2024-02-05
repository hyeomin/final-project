import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { addPost } from '../../../../api/postApi';
import { useModal } from '../../../../hooks/useModal';
import useRoleCheck from '../../../../hooks/useRoleCheck';
import { QUERY_KEYS } from '../../../../query/keys';
import { modalState } from '../../../../recoil/modals';
import {
  imageUploadingStatusState,
  initialPostInputState,
  isEditingPostState,
  postInputState
} from '../../../../recoil/posts';
import { auth } from '../../../../shared/firebase';
import { PostType } from '../../../../types/PostType';
import { stripHtml } from '../../../../util/extractContentText';
import { CustomButton } from './styles';

function SubmitButton() {
  const modal = useModal();
  const setIsModalOpen = useSetRecoilState(modalState);
  const setisEditingPost = useSetRecoilState(isEditingPostState);
  const [postInput, setPostInput] = useRecoilState(postInputState);
  const { title, content, coverImages } = postInput;

  // 이미지 업로드 상태 관리
  const imageUploadingStatus = useRecoilValue(imageUploadingStatusState);

  const role = useRoleCheck();

  const navigate = useNavigate();

  // 게시물 추가
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: (newPost: Omit<PostType, 'id'>) => addPost(newPost),
    onSuccess: (postId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });

      if (postId) {
        // 내용 원상복구
        setPostInput(initialPostInputState);
        // 전역상태 원상복구
        setisEditingPost({
          foundPost: null,
          isEditing: false
        });
        sessionStorage.removeItem('savedData');
        navigate(`/detail/${postId}`);
      }
    },
    onError: (error) => {
      console.log('게시글 등록 실패', error);
    }
  });

  const onSubmitPostHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (title.length === 0 || stripHtml(content, true).trim().length === 0) {
      const onClickConfirm = () => {
        setIsModalOpen((prev) => ({ ...prev, isModalOpen01: false }));
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '제목과 내용 입력은 필수입니다.',
        message: '',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickConfirm
      };
      modal.open(openModalParams);
      setIsModalOpen((prev) => ({ ...prev, isModalOpen01: true }));
    } else if (coverImages.length > 0 && imageUploadingStatus === 'Loading...') {
      const onClickConfirm = () => {
        setIsModalOpen((prev) => ({ ...prev, isModalOpen03: false }));
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '아직 이미지가 업로드 중입니다.',
        message: '',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickConfirm
      };
      modal.open(openModalParams);
      setIsModalOpen((prev) => ({ ...prev, isModalOpen03: true }));
    } else {
      const onClickCancel = () => {
        setIsModalOpen((prev) => ({ ...prev, isModalOpen02: false }));
        modal.close();
      };
      // 업로드 Mutation
      const onClickSave = () => {
        if (auth.currentUser) {
          // 작업 중인 포스트 정보
          const newPost: Omit<PostType, 'id'> = {
            ...postInput,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            uid: auth.currentUser.uid,
            likeCount: 0,
            likedUsers: [],
            role
          };
          addMutation.mutate(newPost);
        }

        setIsModalOpen((prev) => ({ ...prev, isModalOpen02: false }));
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '등록하시겠습니까?',
        message: '',
        leftButtonLabel: '취소',
        onClickLeftButton: onClickCancel,
        rightButtonLabel: '확인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
      setIsModalOpen((prev) => ({ ...prev, isModalOpen02: true }));
    }
  };

  return (
    <CustomButton $variant="done" onClick={onSubmitPostHandler}>
      완료
    </CustomButton>
  );
}

export default SubmitButton;
