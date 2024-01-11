import styled from 'styled-components';

type Props = {
  post: PostType;
};
function DetailBody({ post }: Props) {
  return (
    <div>
      <div>
        <h3>{post?.title}</h3>
      </div>
      <div>
        <div dangerouslySetInnerHTML={{ __html: post?.content as string }} />
      </div>
    </div>
  );
}

export default DetailBody;
