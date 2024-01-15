import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { downloadCoverImageURLs } from '../../api/detailApi';

type Props = {
  foundPost: PostType;
};

function CoverImage({ foundPost }: Props) {
  const {
    data: imageURLList,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['imageURL', foundPost.id],
    queryFn: () => downloadCoverImageURLs(foundPost?.id!),
    enabled: !!foundPost?.id
  });

  //커버이미지 로딩 ==> 추후 스피너 적용
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading image</div>;
  }

  if (imageURLList && imageURLList.length === 0) {
  }

  return (
    <CoverContainer style={{ width: '100vw' }}>
      <PostTitle>{foundPost.title}</PostTitle>
      {imageURLList && imageURLList?.length > 0 ? (
        imageURLList.map((image) => {
          return (
            <CoverImageContainer>
              <PostCoverImage src={image} alt="Post Cover" />
            </CoverImageContainer>
          );
        })
      ) : (
        <NoImage></NoImage>
      )}
    </CoverContainer>
  );
}

export default CoverImage;

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  width: 100vw;
  position: relative;
  background-color: white;
`;

const CoverImageContainer = styled.div`
  height: 400px;
  width: 100%;
`;

const PostCoverImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: auto;
`;

const PostTitle = styled.h3`
  position: absolute;
  left: 300px;
  bottom: 60px;
  font-size: 40px;
  z-index: auto;
`;

const NoImage = styled.div`
  width: 100%;
  height: 240px;
`;
