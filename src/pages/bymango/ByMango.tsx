import { useState } from 'react';
import { getAdminPostList } from '../../api/pageListApi';
import { QUERY_KEYS } from '../../query/keys';
import { SortList } from '../../types/PostListType';
import PostListAdmin from './components/byMangoPostList/ByMangoPostList';
import St from './style';

function MangoContents() {
  const [sortBy, setSortBy] = useState<SortList>('latest');

  return (
    <St.ByMangoContainer>
      <St.ByMangoTitle>
        <St.TextWithMangoFont>Mango</St.TextWithMangoFont>
        <St.TextWithoutMangoFont>콘텐츠</St.TextWithoutMangoFont>
      </St.ByMangoTitle>
      <St.ByMangoSubtitle>누구나, 어디서나 쉽게 따라할 수 있는 습관을 만들어 나가요.</St.ByMangoSubtitle>
      <St.PostListWrapper>
        <PostListAdmin queryKey={[QUERY_KEYS.POSTS, QUERY_KEYS.ADMIN]} queryFn={getAdminPostList} sortBy={sortBy} />
      </St.PostListWrapper>
    </St.ByMangoContainer>
  );
}

export default MangoContents;
