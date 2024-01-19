import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { PostType } from '../../types/PostType';

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
    } else {
      // 첫 페이지일 경우 얼럿
      alert('이미 첫 번째 게시물입니다.');
    }
  };

  //next 버튼
  const onClickNextButton = () => {
    if (postList && postIndexNumber < postList.length - 1) {
      const nextPostId = postList[postIndexNumber + 1].id;
      navigate(`/detail/${nextPostId}`);
      setPostIndexNumber(postIndexNumber + 1);
    } else {
      // 마지막 페이지일 경우 얼럿
      alert('마지막 게시물입니다.');
    }
  };

  return (
    <ButtonContainer>
      <button onClick={onClickPrevButton} type="button">
        {'< 이전 게시물'}
      </button>
      <button onClick={onClickNextButton} type="button">
        {'다음 게시물  >'}
      </button>
    </ButtonContainer>
  );
}

export default PostShift;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 40px 0;

  & button {
    padding: 15px 30px;
    border-radius: 10px;
    border: none;
    /* border: 1px solid ${theme.color.mangoYellow}; */
    background-color: ${theme.color.mangoLight};
    font-size: 14px;

    &:hover {
      background-color: ${theme.color.mangoYellow};
    }
  }
`;
