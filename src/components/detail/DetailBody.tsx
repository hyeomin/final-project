type Props = {
  post: PostType;
};
function DetailBody({ post }: Props) {
  return (
    <div>
      <div>
        <h3>{post?.title}</h3>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post?.content as string }} />
    </div>
  );
}

export default DetailBody;
