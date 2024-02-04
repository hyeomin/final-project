import { useState } from 'react';
import { getAdminPostList } from '../../api/pageListApi';
import { QUERY_KEYS } from '../../query/keys';
import PostListAdmin from '../viewAll/PostListAdmin';
import { SortList } from '../viewAll/ViewAllBody';
import St from './styles';

function MangoBody() {
  const [sortBy, setSortBy] = useState<SortList>('latest');

  return (
    <div>
      <St.ViewAllContainer>
        <St.MangoDiv>
          <St.MangoWord>Mango</St.MangoWord>
          <St.MangoOutWord>콘텐츠</St.MangoOutWord>
        </St.MangoDiv>
        <St.MangoSUbWord>누구나, 어디서나 쉽게 따라할 수 있는 습관을 만들어 나가요.</St.MangoSUbWord>

        <St.MainSubWrapper>
          <PostListAdmin queryKey={[QUERY_KEYS.POSTS, QUERY_KEYS.ADMIN]} queryFn={getAdminPostList} sortBy={sortBy} />
        </St.MainSubWrapper>
      </St.ViewAllContainer>
    </div>
  );
}

export default MangoBody;
