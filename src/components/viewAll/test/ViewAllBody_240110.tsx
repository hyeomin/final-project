import St from '../style';
import defaultImg from '../../assets/defaultImg.jpg';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getAdminPostList, getCategoryPosts } from '../../../api/pageListApi';
import { QUERY_KEYS } from '../../../query/keys';
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  query,
  startAfter,
  where
} from 'firebase/firestore';
import { db } from '../../../shared/firebase';
import { useState } from 'react';

type Category = 'knowHow' | 'recommendation' | 'sharing' | 'habit' | 'admin';

function ViewAllBody() {
  const [selectCategory, setSelectCategory] = useState<PostType[]>([]);
  //const [categoryList, setcategoryList] = useState<Category>('knowHow');

  //const adminQuery = useQuery({ queryKey: [QUERY_KEYS.ADMIN], queryFn: getAdminPostList });
  // const knowHowQuery = useQuery({ queryKey: [QUERY_KEYS.KNOWHOW], queryFn: getCategoryPosts('knowHow') });
  // const recommendQuery = useQuery({ queryKey: [QUERY_KEYS.RECOMMEND], queryFn: getRecommendList });
  // const shareQuery = useQuery({ queryKey: [QUERY_KEYS.SHARE], queryFn: getShareList });
  // const habitQuery = useQuery({ queryKey: [QUERY_KEYS.HABIT], queryFn: getHabitList });

  const {
    data: admin,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.ADMIN],
    queryFn: async ({ pageParam }) => {
      const q = pageParam
        ? query(collection(db, 'test'), where('role', '==', 'admin'), startAfter(pageParam), limit(4))
        : query(collection(db, 'test'), where('role', '==', 'admin'), limit(4));

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs;
    },

    initialPageParam: undefined as undefined | QueryDocumentSnapshot<DocumentData, DocumentData>,
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPage[lastPage.length - 1];
    },
    select: (data) => {
      return data.pages.flat().map((doc) => ({ id: doc.id, ...doc.data() } as PostType));
    }
  });

  console.log('Loading:', isLoading, 'Error:', isError, 'Data:', admin);

  /*----------------------------*/
  //로딩 & 에러 처리 구간
  // const isLoading =
  //   adminQuery.isLoading ||
  //   knowHowQuery.isLoading ||
  //   recommendQuery.isLoading ||
  //   shareQuery.isLoading ||
  //   habitQuery.isLoading;

  // const isError =
  //   adminQuery.isError || knowHowQuery.isError || recommendQuery.isError || shareQuery.isError || habitQuery.isError;

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error loading data</div>;
  // }
  /*----------------------------*/

  //버튼 클릭시 해당 카테고리 선택
  const handleButtonsClick = (category: PostType[] | undefined) => {
    if (category) {
      //setSelectCategory(category);
    } else {
      //setSelectCategory([]);
    }
  };

  const fetchMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  return (
    <>
      <St.MainSubWrapper>
        <p>콘텐츠 by Mango</p>

        <St.ContentsWrapper>
          <St.Contents>
            {admin?.map((item) => (
              <St.Content key={item.id}>
                {/*
                <img src={item.coverUrl ? item.coverUrl : defaultImg} alt={item.title}></img>
                */}
                <img src={defaultImg} alt={item.title}></img>
                <p>{item.title}</p>
                <p>{item.content}</p>
                <p>{item.category}</p>
              </St.Content>
            ))}
          </St.Contents>
        </St.ContentsWrapper>
        <St.MoreContentWrapper>
          <button onClick={fetchMore}>더보기...</button>
        </St.MoreContentWrapper>
      </St.MainSubWrapper>

      <St.MainSubWrapper>
        <St.ButtonWrapper>
          {/* <St.Button onClick={() => handleButtonsClick(knowHowQuery.data)}>친환경 노하우</St.Button>
          <St.Button onClick={() => handleButtonsClick(recommendQuery.data)}>제품 추천</St.Button>
          <St.Button onClick={() => handleButtonsClick(shareQuery.data)}>제품 나눔</St.Button>
          <St.Button onClick={() => handleButtonsClick(habitQuery.data)}>습관 인증</St.Button> */}
        </St.ButtonWrapper>

        <St.SortWrapper>
          <li>
            <a href="#none">인기순</a>
          </li>

          <li>
            <a href="#none">최신순</a>
          </li>
        </St.SortWrapper>

        <St.ContentsWrapper>
          <St.Contents>
            {selectCategory?.map((item) => (
              <St.Content key={item.id}>
                <img src={defaultImg} alt={item.title}></img>

                <p>{item.title}</p>
                <p>{item.content}</p>
                <p>{item.category}</p>
              </St.Content>
            ))}
          </St.Contents>
        </St.ContentsWrapper>

        <St.MoreContentWrapper>
          <button>더보기...</button>
        </St.MoreContentWrapper>
      </St.MainSubWrapper>
    </>
  );
}
export default ViewAllBody;
