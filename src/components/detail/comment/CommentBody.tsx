import { FoundDetailPostProps } from '../../../types/PostType';
import AddCommentForm from './addComment/AddComment';
import CommentList from './commentList/CommentList';
import St from './style';

const CommentBody = ({ foundDetailPost }: FoundDetailPostProps) => {
  return (
    <St.Container>
      <AddCommentForm foundDetailPost={foundDetailPost} />
      <CommentList foundDetailPost={foundDetailPost} />
    </St.Container>
  );
};

export default CommentBody;
