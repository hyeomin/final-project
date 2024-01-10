import React from 'react';
import styled from 'styled-components';
import { auth } from '../../shared/firebase';
type Props = {
  post: PostType;
};
const Comment = ({ post }: Props) => {
  console.log('현재 포스트 정보', post);


  return (
    <Container>
      여기는 코멘트 Area 입니다.
      <div>

        <form>
          <input type="text" />
          <button>등록하기</button>
        </form>
      </div>
    </Container>
  );
};
const Container = styled.section`
  padding: 20px;
  margin: 20px;
  border: 1px solid black;
`;

export default Comment;
