import styled from 'styled-components';
import AddCommentForm from './AddComment';
import CommentList from './CommentList';

type Props = {
  foundPost: PostType;
};

const CommentBody = ({ foundPost }: Props) => {
  return (
    <Container>
      <AddCommentForm foundPost={foundPost} />
      <CommentList foundPost={foundPost} />
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
