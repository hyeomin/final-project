import React from 'react';
import styled from 'styled-components';
import AddCommentForm from './AddComment';
import CommentList from './CommentList';


type Props = {
  post: PostType;
};
const Comment = ({ post }: Props) => {


  return (
    <Container>
      <AddCommentForm post={post} />
      <CommentList post={post} />
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 20px;
  border: 1px solid black;
`;

export default Comment;
