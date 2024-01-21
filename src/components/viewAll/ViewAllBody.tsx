import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getAdminPostList, getCategoryPosts } from '../../api/pageListApi';
import { QUERY_KEYS } from '../../query/keys';
import { categoryListState } from '../../recoil/posts';
import PostList from './PostList';
import PostListAdmin from './PostListAdmin';
import St from './style';

export type Category = 'knowHow' | 'recommendation' | 'sharing' | 'habit' | 'noCategory' | 'total';
export type SortList = 'popularity' | 'latest';

function ViewAllBody() {
  const [category, setCategory] = useRecoilState<Category>(categoryListState);
  const [sortBy, setSortBy] = useState<SortList>('latest');

  useEffect(() => {
    setCategory('total');
    setSortBy('latest');
  }, []);

  return (
    <St.ViewAllContainer>
      <St.MangoDiv>
        <St.MangoWord>Mango</St.MangoWord>
        <St.MangoOutWord>의 컨텐츠</St.MangoOutWord>
      </St.MangoDiv>
      <St.MangoSUbWord>누구나, 어디서나 쉽게 따라할 수 있는 습관을 만들어 나가요.</St.MangoSUbWord>

      <St.MainSubWrapper>
        <PostListAdmin queryKey={[QUERY_KEYS.ADMIN]} queryFn={getAdminPostList('admin')} sortBy={sortBy} />
      </St.MainSubWrapper>

      <St.AdminPostSpace></St.AdminPostSpace>

      <St.MainSubWrapper>
        <St.CategoryWrapper>
          <St.ButtonWrapper>
            <St.Button onClick={() => setCategory('total')} selected={category === 'total'}>
              전체보기
            </St.Button>
            <St.Button onClick={() => setCategory('knowHow')} selected={category === 'knowHow'}>
              노하우 공유
            </St.Button>
            <St.Button onClick={() => setCategory('recommendation')} selected={category === 'recommendation'}>
              제품 추천
            </St.Button>
            <St.Button onClick={() => setCategory('sharing')} selected={category === 'sharing'}>
              제품 나눔
            </St.Button>
            <St.Button onClick={() => setCategory('habit')} selected={category === 'habit'}>
              습관 인증
            </St.Button>
            <St.Button onClick={() => setCategory('noCategory')} selected={category === 'noCategory'}>
              기타
            </St.Button>
          </St.ButtonWrapper>

          <St.SortWrapper>
            <li>
              <a onClick={() => setSortBy('popularity')} className={sortBy === 'popularity' ? 'selected' : ''}>
                인기순
              </a>
            </li>

            <li>
              <a onClick={() => setSortBy('latest')} className={sortBy === 'latest' ? 'selected' : ''}>
                최신순
              </a>
            </li>
          </St.SortWrapper>
        </St.CategoryWrapper>
        <PostList queryKey={[category]} queryFn={getCategoryPosts(category)} sortBy={sortBy} />
      </St.MainSubWrapper>
    </St.ViewAllContainer>
  );
}
export default ViewAllBody;
