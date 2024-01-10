import { useQueries, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../query/keys';
import { downloadImageURL, getPosts } from '../../api/homeApi';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function DetailBody() {
  const { id } = useParams();

  const { data: post } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts,
    select: (data) => {
      const post = data.find((post) => post.id === id);
      return post;
    }
  });


  return (
    <div>
      <div>
        <h3>{post?.title}</h3>
      </div>
      <ContentArea>
      <div dangerouslySetInnerHTML={{ __html: post?.content as string }} />
      </ContentArea>
    </div>
  );
}

const ContentArea = styled.div`
  
`

export default DetailBody;
