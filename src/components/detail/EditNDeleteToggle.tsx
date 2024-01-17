import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GoPencil, GoTrash } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deletePost } from '../../api/postApi';
import editNdeleteToggleBox from '../../assets/editndeletetoggle.png';
import { FoundPostProps } from '../../pages/Detail';
import { QUERY_KEYS } from '../../query/keys';

function EditNDeleteToggle({ foundPost }: FoundPostProps) {
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
    if (foundPost) {
      deleteMutation.mutate(foundPost.id);
    }
  };

  return (
    <ToggleContainer>
      {/* <img src={editNdeleteToggleBox} alt="toggle-box" /> */}
      <ToggleContentContainer>
        <span onClick={onEditPostHandler}>
          수정하기
          <div>
            <GoPencil />
          </div>
        </span>
        <span onClick={onDeletePostHandler}>
          삭제하기
          <div>
            <GoTrash />
          </div>
        </span>
      </ToggleContentContainer>
    </ToggleContainer>
  );
}

export default EditNDeleteToggle;

const ToggleContainer = styled.div`
  background-image: url(${editNdeleteToggleBox});
  background-size: 100%;
  background-color: transparent;

  position: absolute;
  top: 50px;
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

  /* background-color: pink; */

  & span {
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: black;
    font-weight: lighter;
  }
`;