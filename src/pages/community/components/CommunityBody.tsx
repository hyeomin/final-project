import { useQueryClient } from '@tanstack/react-query';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getCategoryPosts } from 'api/pageListApi';
import { QUERY_KEYS } from 'query/keys';
import { categoryListState } from 'recoil/posts';
import TopButton from 'pages/about/components/TopButton';
import CommunityPostList from './communityPostList/CommunityPostList';
import St from './style';

export type Category = 'knowHow' | 'recommendation' | 'sharing' | 'habit' | 'noCategory' | 'total';
export type SortList = 'popularity' | 'latest';

function CommunityBody() {
  const [category, setCategory] = useRecoilState<Category>(categoryListState);
  const [sortBy, setSortBy] = useState<SortList>('latest');
  const [searchParams, setSearchParams] = useSearchParams();
  const validCategories: Category[] = ['knowHow', 'recommendation', 'sharing', 'habit', 'noCategory', 'total'];
  const validSortOptions: SortList[] = ['popularity', 'latest'];
  const navigate = useNavigate();

  const updateStateFromUrl = () => {
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
  };

  useEffect(() => {
    updateStateFromUrl();
  }, [searchParams]);

  //쿼리스트링 : 카테고리+정렬
  const updateSortOption = (newCategory: Category, newSortBy: SortList) => {
    setCategory(newCategory);
    setSortBy(newSortBy);

    const newSearchParams = new URLSearchParams();
    newSearchParams.set('category', newCategory);
    newSearchParams.set('sort', newSortBy);
    setSearchParams(newSearchParams);

    navigate(`/community/?${newSearchParams.toString()}`);
  };

  //prefetch
  const queryClient = useQueryClient();
  const handleHover = async () => {
    const queriesToPrefetch = [
      { queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.KNOWHOW], queryFn: getCategoryPosts('knowHow') },
      { queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.RECOMMEND], queryFn: getCategoryPosts('recommendation') },
      { queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.SHARE], queryFn: getCategoryPosts('sharing') },
      { queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.HABIT], queryFn: getCategoryPosts('habit') },
      { queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.TOTAL], queryFn: getCategoryPosts('total') },
      { queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.NOCATEGORY], queryFn: getCategoryPosts('noCategory') }
    ];

    //prefetch는 오류 반환 x
    for (const { queryKey, queryFn } of queriesToPrefetch) {
      await queryClient.prefetchInfiniteQuery({
        queryKey: queryKey,
        queryFn: queryFn,
        initialPageParam: undefined as undefined | QueryDocumentSnapshot<DocumentData, DocumentData>,
        staleTime: 60_000
      });
    }
  };

  useEffect(() => {
    if (searchParams.get('category') === null || searchParams.get('sort') === null) {
      updateSortOption(category, sortBy);
    }
    handleHover();
  }, []);

  return (
    <St.CommunityContainer>
      <St.MangoDiv>
        <St.MangoWord>Mango</St.MangoWord>
        <St.MangoOutWord>커뮤니티</St.MangoOutWord>
      </St.MangoDiv>
      <St.MangoSUbWord>재미있고 즐거운 친환경! 망고 유저들의 라이프스타일을 공유해요.</St.MangoSUbWord>
      <St.CommunityNavBar>
        <St.CategoryButtonWrapper>
          <St.CategoryButton onClick={() => updateSortOption('total', sortBy)} selected={category === 'total'}>
            전체보기
          </St.CategoryButton>
          <St.CategoryButton onClick={() => updateSortOption('knowHow', sortBy)} selected={category === 'knowHow'}>
            노하우 공유
          </St.CategoryButton>
          <St.CategoryButton
            onClick={() => updateSortOption('recommendation', sortBy)}
            selected={category === 'recommendation'}
          >
            제품 추천
          </St.CategoryButton>
          <St.CategoryButton onClick={() => updateSortOption('sharing', sortBy)} selected={category === 'sharing'}>
            제품 나눔
          </St.CategoryButton>
          <St.CategoryButton onClick={() => updateSortOption('habit', sortBy)} selected={category === 'habit'}>
            습관 인증
          </St.CategoryButton>
          <St.CategoryButton
            onClick={() => updateSortOption('noCategory', sortBy)}
            selected={category === 'noCategory'}
          >
            기타
          </St.CategoryButton>
        </St.CategoryButtonWrapper>

        <St.SortingWrapper>
          <li
            onClick={() => updateSortOption(category, 'popularity')}
            className={sortBy === 'popularity' ? 'selected' : ''}
          >
            인기순
          </li>
          <span>|</span>
          <li onClick={() => updateSortOption(category, 'latest')} className={sortBy === 'latest' ? 'selected' : ''}>
            최신순
          </li>
        </St.SortingWrapper>
      </St.CommunityNavBar>
      <CommunityPostList queryKey={[QUERY_KEYS.POSTS, category]} queryFn={getCategoryPosts(category)} sortBy={sortBy} />
      <TopButton $position={220} />
    </St.CommunityContainer>
  );
}
export default CommunityBody;
