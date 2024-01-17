import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { downloadCoverImageURLs } from '../../api/detailApi';

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
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading image</div>;
  }

  if (!imageURLList) {
    return <div>Image Loading ...</div>;
  }

  return (
    <CoverContainer>
      <PostTitle>{foundPost.title}</PostTitle>
      {Array.isArray(imageURLList) && imageURLList?.length > 0 ? (
        <SiwperContainer>
          {imageURLList.map((image, idx) => {
            return (
              <Swiper slidesPerView={1} navigation={true} modules={[Navigation]}>
                <SwiperSlide>
                  <PostCoverImage key={idx} src={image} alt="Post Cover" />
                </SwiperSlide>
              </Swiper>
            );
          })}
        </SiwperContainer>
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
  width: 100%;
  position: relative;
  background-color: white;
`;

const SiwperContainer = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
`;

const PostCoverImage = styled.img`
  object-fit: cover;

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
  height: 140px;
`;
