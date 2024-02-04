import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GoPencil, GoTrash } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { deletePost } from '../../../api/postApi';
import { useModal } from '../../../hooks/useModal';
import { QUERY_KEYS } from '../../../query/keys';
import { modalState } from '../../../recoil/modals';
import { categoryListState, isEditingPostState, pathHistoryState, postInputState } from '../../../recoil/posts';
import { FoundDetailPostProps } from '../../../types/PostType';
import { Category } from '../../viewAll/ViewAllBody';
import St from './style';

function EditNDeleteToggle({ foundDetailPost }: FoundDetailPostProps) {
  const modal = useModal();
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const setPostInput = useSetRecoilState(postInputState);
  const setIsEditingPost = useSetRecoilState(isEditingPostState);
  const pathHistory = useRecoilValue(pathHistoryState);
  //const [category, setCategory] = useRecoilState<Category>(categoryListState);

  const category = useRecoilValue<Category>(categoryListState);
  console.log('category', category);
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

    //카테고리 업데이트 위함
    // queryClient.invalidateQueries({ queryKey: [category] });

    navigate('/write', { state: { foundDetailPost } });
  };

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
      // queryClient.invalidateQueries({ queryKey: [category] });

      // 뒤로가기 했을 때 /write면 홈으로 가게
      if (pathHistory[pathHistory.length - 2] === '/write') {
        navigate('/');
      } else navigate(-1);
    }
  });

  const onDeletePostHandler = () => {
    const onClickCancel = () => {
      setIsModalOpen((prev) => ({ ...prev, isModalOpen01: false }));
      modal.close();
    };

    const onClickDelete = () => {
      if (foundDetailPost) {
        deleteMutation.mutate(foundDetailPost.id);
      }
      setIsModalOpen((prev) => ({ ...prev, isModalOpen01: false }));
      modal.close();
    };

    const openModalParams: Parameters<typeof modal.open>[0] = {
      title: '삭제 하시겠습니까?',
      message: '',
      leftButtonLabel: '취소',
      onClickLeftButton: onClickCancel,
      rightButtonLabel: '삭제',
      onClickRightButton: onClickDelete
    };
    modal.open(openModalParams);
    setIsModalOpen((prev) => ({ ...prev, isModalOpen01: true }));
  };

  return (
    <St.ToggleContainer>
      <St.ToggleContentContainer>
        <St.EditNDeleteSpan onClick={onEditPostHandler}>
          수정하기
          <div>
            <GoPencil />
          </div>
        </St.EditNDeleteSpan>
        <St.EditNDeleteSpan onClick={onDeletePostHandler}>
          삭제하기
          <div>
            <GoTrash />
          </div>
        </St.EditNDeleteSpan>
      </St.ToggleContentContainer>
    </St.ToggleContainer>
  );
}

export default EditNDeleteToggle;
