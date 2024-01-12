import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { downloadCoverImageURLs } from '../../api/detailApi';

type Props = {
  post: PostType;
};

function CoverImage({ post }: Props) {
  const {
    data: imageURLList,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['imageURL', post.id],
    queryFn: () => downloadCoverImageURLs(post?.id!),
    enabled: !!post?.id
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

  console.log('이미지 리스트', imageURLList);

  return (
    <CoverImageContainer>
      <PostTitle>{post.title}</PostTitle>
      {imageURLList && imageURLList?.length > 0 ? (
        imageURLList.map((image) => {
          return <PostCoverImage src={image} alt="Post Cover" />;
        })
      ) : (
        <div>
          <span>NO IMAGE AVAILABLE</span>
        </div>
      )}
    </CoverImageContainer>
  );
}

export default CoverImage;

const CoverImageContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 450px;
  position: relative;
  background-color: lightgray;

  & div {
    display: flex;
    justify-content: space-between;
    position: absolute;
    background-color: lightblue;
  }
`;

const PostCoverImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: auto;
`;

const PostTitle = styled.h3`
  position: absolute;
  left: 300px;
  bottom: 80px;
  font-size: 40px;
  z-index: auto;
`;
