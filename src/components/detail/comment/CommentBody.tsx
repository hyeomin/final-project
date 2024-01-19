import styled from 'styled-components';
import { FoundDetailPostProps } from '../../../types/PostType';
import AddCommentForm from './AddComment';
import CommentList from './CommentList';

const CommentBody = ({ foundDetailPost }: FoundDetailPostProps) => {
  return (
    <Container>
      <AddCommentForm foundDetailPost={foundDetailPost} />
      <CommentList foundDetailPost={foundDetailPost} />
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

export default CommentBody;
