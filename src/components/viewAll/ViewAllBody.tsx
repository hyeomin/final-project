import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getAdminPostList, getCategoryPosts } from '../../api/pageListApi';
import { QUERY_KEYS } from '../../query/keys';
import { categoryListState } from '../../recoil/posts';
import PostList from './PostList';
import PostListAdmin from './PostListAdmin';
import St from './style';
import { useNavigate, useSearchParams } from 'react-router-dom';

export type Category = 'knowHow' | 'recommendation' | 'sharing' | 'habit' | 'noCategory' | 'total';
export type SortList = 'popularity' | 'latest';

function ViewAllBody() {
  const [category, setCategory] = useRecoilState<Category>(categoryListState);
  const [sortBy, setSortBy] = useState<SortList>('latest');
  const [searchParams, setSearchParams] = useSearchParams();
  const validCategories: Category[] = ['knowHow', 'recommendation', 'sharing', 'habit', 'noCategory', 'total'];
  const validSortOptions: SortList[] = ['popularity', 'latest'];
  const navigate = useNavigate();

  useEffect(() => {
    // URL 쿼리 파라미터에서 category와 sort 값을 가져옵니다.
    const urlCategory = searchParams.get('category');
    const urlSortBy = searchParams.get('sort');

    //카테고리 : 전체보기~기타
    if (urlCategory && validCategories.includes(urlCategory as Category)) {
      setCategory(urlCategory as Category);
    } else {
      setCategory('total');
    }

    //정렬 : 인기순 /최신순
    if (urlSortBy && validSortOptions.includes(urlSortBy as SortList)) {
      setSortBy(urlSortBy as SortList);
    } else {
      setSortBy('latest');
    }
  }, [searchParams]);

  //쿼리스트링 : 카테고리+정렬
  const updateSortOption = (newCategory: Category, newSortBy: SortList) => {
    setCategory(newCategory);
    setSortBy(newSortBy);

    const newSearchParams = new URLSearchParams();
    newSearchParams.set('category', newCategory);
    newSearchParams.set('sort', newSortBy);
    setSearchParams(newSearchParams);

    navigate(`/viewAll/?${newSearchParams.toString()}`);
  };

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
            <St.Button onClick={() => updateSortOption('total', sortBy)} selected={category === 'total'}>
              전체보기
            </St.Button>
            <St.Button onClick={() => updateSortOption('knowHow', sortBy)} selected={category === 'knowHow'}>
              노하우 공유
            </St.Button>
            <St.Button
              onClick={() => updateSortOption('recommendation', sortBy)}
              selected={category === 'recommendation'}
            >
              제품 추천
            </St.Button>
            <St.Button onClick={() => updateSortOption('sharing', sortBy)} selected={category === 'sharing'}>
              제품 나눔
            </St.Button>
            <St.Button onClick={() => updateSortOption('habit', sortBy)} selected={category === 'habit'}>
              습관 인증
            </St.Button>
            <St.Button onClick={() => updateSortOption('noCategory', sortBy)} selected={category === 'noCategory'}>
              기타
            </St.Button>
          </St.ButtonWrapper>

          <St.SortWrapper>
            <li>
              <a
                onClick={() => updateSortOption(category, 'popularity')}
                className={sortBy === 'popularity' ? 'selected' : ''}
              >
                인기순
              </a>
            </li>

            <li>
              <a onClick={() => updateSortOption(category, 'latest')} className={sortBy === 'latest' ? 'selected' : ''}>
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
