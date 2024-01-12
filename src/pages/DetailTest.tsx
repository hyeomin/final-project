import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPosts } from '../api/homeApi';
import { QUERY_KEYS } from '../query/keys';

function DetailTest() {
  const [foundPost, setFoundPost] = useState<PostType | undefined>();
  const { id } = useParams();

  const { data: postList } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts
  });

  useEffect(() => {
    if (postList) {
      const foundPost = postList.find((post) => post.id === id);
      setFoundPost(foundPost);
    }
  }, [postList, id]);

  return <div>DetailTest</div>;
}

export default DetailTest;
