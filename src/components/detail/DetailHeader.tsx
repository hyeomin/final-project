import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { downloadCoverImageURLs } from '../../api/detailApi';
import Loader from '../common/Loader';

type Props = {
  foundPost: PostType;
};

function DetailHeader({ foundPost }: Props) {
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
    //return <div>Loading...</div>;
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading image</div>;
  }

  if (!imageURLList) {
    return <div>Image Loading ...</div>;
  }

  return (
    <CoverContainer style={{ width: '100vw' }}>
      <PostTitle>{foundPost.title}</PostTitle>
      {Array.isArray(imageURLList) && imageURLList?.length > 0 ? (
        imageURLList.map((image) => {
          return <PostCoverImage src={image} alt="Post Cover" />;
        })
      ) : (
        <NoImage></NoImage>
      )}
    </CoverContainer>
  );
}

export default DetailHeader;

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  position: relative;
  background-color: white;
`;

const PostCoverImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 400px;
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
