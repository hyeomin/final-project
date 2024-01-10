import { useQueries, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../query/keys';
import { downloadImageURL, getPosts } from '../../api/homeApi';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  post: PostType
}
function DetailBody({post}: Props) {
  return (
    <div>
      <div><h3>{post?.title}</h3></div>
      <ContentArea> <div dangerouslySetInnerHTML={{ __html: post?.content as string }} /></ContentArea>
    </div>
  );
}

const ContentArea = styled.div`
  background-color: red;
  width: 100%;

  & div {
    //이게 아닌가봄
  }
`;

export default DetailBody;
