import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { foundPostState, postState } from '../../../recoil/posts';
import { CustomButton } from '../SubmitButton';

function EditUploadButton() {
  const [post, setPost] = useRecoilState(postState);

  const [foundPost, setFoundPost] = useRecoilState<PostType | undefined>(foundPostState);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const editingPost = {
    ...post,
    updatedAt: Date.now()
  };

  const onUpdatePostHandler = () => {};

  return (
    <CustomButton variant="done" onClick={onUpdatePostHandler}>
      수정
    </CustomButton>
  );
}

export default EditUploadButton;
