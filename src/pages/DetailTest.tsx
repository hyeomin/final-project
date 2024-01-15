import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPosts } from '../api/homeApi';
import CoverImage from '../components/detail/CoverImage';
import DetailBody from '../components/detail/DetailBody';
import PostShift from '../components/detail/PostShift';
import { QUERY_KEYS } from '../query/keys';

function DetailTest() {
  //인덱스 넘버로 페이지 관리

  const [foundPost, setFoundPost] = useState<PostType | undefined>();
  const { id } = useParams();

  const { data: postList, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts
  });

  useEffect(() => {
    if (postList) {
      const foundPost = postList.find((post) => post.id === id);
      setFoundPost(foundPost);
    }
  }, [postList, id]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
      {foundPost && (
        <>
          <PostShift foundPost={foundPost} postList={postList} id={id} />
          <CoverImage foundPost={foundPost} />
          <DetailBody foundPost={foundPost} />
          <div>코멘트 영역</div>
        </>
      )}
      <DetailEmptyFooter></DetailEmptyFooter>
    </Container>
  );
}

export default DetailTest;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DetailEmptyFooter = styled.div`
  height: 280px;
`;
