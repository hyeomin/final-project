import styled from 'styled-components';
import DetailBody from '../components/detail/DetailBody';
import CS from './CommonStyle';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../query/keys';
import { getPosts } from '../api/homeApi';
import { useState } from 'react';

function Detail() {
  const [page, setPage] = useState(0);

  const { data: posts } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts,
  });
  console.log('post ===>', posts)

  const onClickPrevButton = () => {

  }
  const onClickNextButton = () => {}

  return (
    <CS.FullContainer>
      <PostContainer>
        <CoverImageContainer>
          <div>{/* <img src={} /> */}</div>
          <div>
            <button onClick={onClickPrevButton} type="button">prev</button>
            <button onClick={onClickNextButton} type="button">next</button>
          </div>
        </CoverImageContainer>
        <DetailBody />
      </PostContainer>
    </CS.FullContainer>
  );
}

export default Detail;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  & div {
    background-color: pink;
  }
`;

const CoverImageContainer = styled.div`
  display: flex;
  position: relative;

  background-color: pink;

  & div {
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 100%;

    background-color: lightblue;
  }
`;
