import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { getUser } from '../../../api/authApi';
import { addPost } from '../../../api/postApi';
import { AuthContext } from '../../../context/AuthContext';
import { useModal } from '../../../hooks/useModal';
import { QUERY_KEYS } from '../../../query/keys';
import { isEditingPostState, postInputState } from '../../../recoil/posts';
import { roleState } from '../../../recoil/users';
import { auth } from '../../../shared/firebase';
import { PostType } from '../../../types/PostType';
import { UserType } from '../../../types/UserType';
import { stripHtml } from '../../../util/extractContentText';
import { CustomButton } from './styles';
import { modalState } from '../../../recoil/modals';

function SubmitButton() {
  const modal = useModal();
  const setIsModalOpen = useSetRecoilState(modalState);
  const setisEditingPost = useSetRecoilState(isEditingPostState);
  const [postInput, setPostInput] = useRecoilState(postInputState);
  const { title, content } = postInput;

  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;
  const [role, setRole] = useRecoilState(roleState);

  // role이 비어있는 경우 다시 넣기
  const { data: user, refetch } = useQuery<UserType | undefined>({
    queryKey: [QUERY_KEYS.USERS, authCurrentUser?.uid],
    queryFn: () => (authCurrentUser ? getUser(authCurrentUser?.uid) : undefined),
    enabled: role === ''
  });

  useEffect(() => {
    if (role === '') {
      refetch();
    }
    // const user = userList && userList.find((user) => user.uid === auth.currentUser?.uid);
    if (user) {
      setRole(user.role);
    }
  }, [role, refetch, setRole, user]);

  const navigate = useNavigate();

  // 작업 중인 포스트 정보
  const newPost: Omit<PostType, 'id'> = {
    ...postInput,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    uid: auth.currentUser!.uid,
    likeCount: 0,
    likedUsers: [],
    role
  };

  // 게시물 추가
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: () => addPost({ newPost }),
    onSuccess: (postId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });

      if (postId) {
        // 내용 원상복구
        setPostInput({
          title: '',
          content: '',
          category: 'noCategory',
          hashtags: [],
          coverImages: []
        });
        // 전역상태 원상복구
        setisEditingPost({
          foundPost: null,
          isEditing: false
        });
        navigate(`/detail/${postId}`);
      }
    }
  });

  const onSubmitPostHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (title.length === 0 || stripHtml(content).trim().length === 0) {
      const onClickSave = () => {
        setIsModalOpen((prev) => ({ ...prev, isModalOpen01: false }));
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
      setIsModalOpen((prev) => ({ ...prev, isModalOpen01: true }));
    } else {
      const onClickCancel = () => {
        setIsModalOpen((prev) => ({ ...prev, isModalOpen02: false }));
        modal.close();
      };

      const onClickSave = () => {
        addMutation.mutate(); //
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
