import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostType } from '../../../types/PostType';
import St from './style';

type Props = {
  postList: PostType[] | undefined;
  postId: string | undefined;
};

function PostShift({ postList, postId }: Props) {
  const [postIndexNumber, setPostIndexNumber] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const postIndex = postList?.findIndex((post) => post.id === postId);
    if (postIndex) setPostIndexNumber(postIndex); // 현재 post의 인덱스 설정
  }, [postList, postId]);

  //prev 버튼
  const onClickPrevButton = () => {
    if (postList && postIndexNumber > 0) {
      const prevPostId = postList[postIndexNumber - 1].id;
      navigate(`/detail/${prevPostId}`);
      setPostIndexNumber(postIndexNumber - 1);
    }
  };

  //next 버튼
  const onClickNextButton = () => {
    if (postList && postIndexNumber < postList.length - 1) {
      const nextPostId = postList[postIndexNumber + 1].id;
      navigate(`/detail/${nextPostId}`);
      setPostIndexNumber(postIndexNumber + 1);
    }
  };

  return (
    <St.ButtonContainer>
      <button onClick={onClickPrevButton} type="button" disabled={postIndexNumber <= 0}>
        {'< 이전 게시물'}
      </button>
      <button onClick={onClickNextButton} type="button" disabled={!postList || postIndexNumber >= postList.length - 1}>
        {'다음 게시물  >'}
      </button>
    </St.ButtonContainer>
  );
}

export default PostShift;
