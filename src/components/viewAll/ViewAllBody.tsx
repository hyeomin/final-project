import St from './style';
import { getCategoryPosts } from '../../api/pageListApi';
import { useState } from 'react';
import PostList from './PostList';

export type Category = 'knowHow' | 'recommendation' | 'sharing' | 'habit' | 'admin';

function ViewAllBody() {
  const [category, setCategory] = useState<Category>('knowHow');

  return (
    <>
      <St.Button>콘텐츠 by Mango</St.Button>
      <St.MainSubWrapper>
        <PostList queryKey={[category]} queryFn={getCategoryPosts(category)} />
      </St.MainSubWrapper>

      <St.MainSubWrapper>
        <St.ButtonWrapper>
          <St.Button onClick={() => setCategory('knowHow')}>친환경 노하우</St.Button>
          <St.Button onClick={() => setCategory('recommendation')}>제품 추천</St.Button>
          <St.Button onClick={() => setCategory('sharing')}>제품 나눔</St.Button>
          <St.Button onClick={() => setCategory('habit')}>습관 인증</St.Button>
        </St.ButtonWrapper>

        <St.SortWrapper>
          <li>
            <a href="#none">인기순</a>
          </li>

          <li>
            <a href="#none">최신순</a>
          </li>
        </St.SortWrapper>

        <PostList queryKey={[category]} queryFn={getCategoryPosts(category)} />
      </St.MainSubWrapper>
    </>
  );
}
export default ViewAllBody;
