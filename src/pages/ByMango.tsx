import { useState } from 'react';
import styled from 'styled-components';
import { getAdminPostList } from '../api/pageListApi';
import PostListAdmin from '../components/viewAll/PostListAdmin';
import { QUERY_KEYS } from '../query/keys';
import theme from '../styles/theme';
import { SortList } from '../types/PostListType';

function MangoContents() {
  const [sortBy, setSortBy] = useState<SortList>('latest');

  return (
    <ByMangoContainer>
      <ByMangoTitle>
        <TextWithMangoFont>Mango</TextWithMangoFont>
        <TextWithoutMangoFont>콘텐츠</TextWithoutMangoFont>
      </ByMangoTitle>
      <ByMangoSubtitle>누구나, 어디서나 쉽게 따라할 수 있는 습관을 만들어 나가요.</ByMangoSubtitle>
      <PostListWrapper>
        <PostListAdmin queryKey={[QUERY_KEYS.POSTS, QUERY_KEYS.ADMIN]} queryFn={getAdminPostList} sortBy={sortBy} />
      </PostListWrapper>
    </ByMangoContainer>
  );
}

export default MangoContents;

const ByMangoContainer = styled.div`
  width: 1000px;
  /* min-height: 1544px; */

  //모바일 세로
  @media screen and (max-width: 431px) {
    width: 100%;
    margin-top: 30px;
  }
`;

const ByMangoTitle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
  column-gap: 10px;

  //모바일 세로
  @media screen and (max-width: 431px) {
    margin-top: 0;
  }
`;

const TextWithMangoFont = styled.h2`
  color: ${theme.color.mangoMain};
  font-family: ${theme.font.mango};
  font-size: 38px;
  font-weight: 400;
  //모바일 세로
  @media screen and (max-width: 431px) {
    font-size: 28px;
  }
`;

const TextWithoutMangoFont = styled.h2`
  /* color: #000; */
  font-size: 38px;
  font-weight: 700;
  //모바일 세로
  @media screen and (max-width: 431px) {
    font-size: 28px;
  }
`;

const ByMangoSubtitle = styled.p`
  text-align: left;
  font-size: 17px;
  font-weight: 500;
  margin-top: 10px;

  //모바일 세로
  @media screen and (max-width: 431px) {
    display: none;
  }
`;

const PostListWrapper = styled.div`
  width: 100%;
  margin-bottom: 150px; //58에서 변경

  //모바일 세로
  @media screen and (max-width: 431px) {
    margin: auto;
  }
`;
