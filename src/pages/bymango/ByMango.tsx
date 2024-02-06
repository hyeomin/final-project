import { useState } from 'react';
import { getAdminPostList } from '../../api/pageListApi';
import { QUERY_KEYS } from '../../query/keys';
import { SortList } from '../../types/PostListType';
import PostListAdmin from './components/byMangoPostList/ByMangoPostList';
import St from './style';
import TopButton from '../about/components/TopButton';

function ByMango() {
  const [sortBy, setSortBy] = useState<SortList>('latest');

  return (
    <St.ByMangoContainer>
      <St.ByMangoTitle>
        <St.TextWithMangoFont>Mango</St.TextWithMangoFont>
        <St.TextWithoutMangoFont>콘텐츠</St.TextWithoutMangoFont>
      </St.ByMangoTitle>
      <St.ByMangoSubtitle>망고 관리자들이 소개합니다! 재미있고 도움되는 친환경 이야기</St.ByMangoSubtitle>
      <St.PostListWrapper>
        <PostListAdmin queryKey={[QUERY_KEYS.POSTS, QUERY_KEYS.ADMIN]} queryFn={getAdminPostList} sortBy={sortBy} />
      </St.PostListWrapper>
      <TopButton $position={220} />
    </St.ByMangoContainer>
  );
}

export default ByMango;
