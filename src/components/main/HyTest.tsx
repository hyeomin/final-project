import { useQueries, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { downloadImageURL, getTopRankingPosts } from '../../api/homeApi';

function HyTest() {
  //탑랭킹
  const { isLoading: TopRankingIsLoading, data: topRanking } = useQuery({
    queryKey: ['topRanking'],
    queryFn: getTopRankingPosts
  });

  const imageQueries = useQueries({
    queries:
      topRanking?.map((post) => ({
        queryKey: ['imageURL', post.id],
        queryFn: () => downloadImageURL(post.id as string)
      })) || []
  });

  return (
    <div>
      {topRanking?.map((post, index) => {
        const imageQuery = imageQueries[index];
        return (
          <Container key={post.id}>
            <h3>Title: {post.title}</h3>
            {imageQuery.isLoading ? (
              <p>Loading image...</p>
            ) : (
              imageQuery.data && <ImgPreview src={imageQuery.data} alt={post.title} />
            )}
            <button onClick={() => downloadImageURL(post.id!)}>테스트</button>
            <div dangerouslySetInnerHTML={{ __html: post.content as string }} />
          </Container>
        );
      })}
    </div>
  );
}

export default HyTest;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  background-color: pink;
`;

const ImgPreview = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;
