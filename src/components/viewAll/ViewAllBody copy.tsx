import St from './style';
import defaultImg from '../../assets/defaultImg.jpg';
import { InfiniteData, QueryFunctionContext, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getAdminPostList, getHabitList, getRecommendList, getShareList, getknowHowList } from '../../api/pageListApi';
import { QUERY_KEYS } from '../../query/keys';
import { useEffect, useState } from 'react';
import usePaginatedItem from '../../hooks/usePaginatedItem';
import { DocumentData, collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { db } from '../../shared/firebase';

interface AdminPostListResponse {
  items: PostType[];
  nextCursor?: string;
}

function ViewAllBody() {
  // const [selectCategory, setSelectCategory] = useState<PostType[]>([]);

  //const adminQuery = useQuery({ queryKey: [QUERY_KEYS.ADMIN], queryFn: getAdminPostList });
  const knowHowQuery = useQuery({ queryKey: [QUERY_KEYS.KNOWHOW], queryFn: getknowHowList });
  const recommendQuery = useQuery({ queryKey: [QUERY_KEYS.RECOMMEND], queryFn: getRecommendList });
  const shareQuery = useQuery({ queryKey: [QUERY_KEYS.SHARE], queryFn: getShareList });
  const habitQuery = useQuery({ queryKey: [QUERY_KEYS.HABIT], queryFn: getHabitList });

  // let formattedDate = new Intl.DateTimeFormat('ko-KR', {
  //   dateStyle: 'full',
  //   timeStyle: 'short'
  // }).format(new Date());

  const [lastVisible, setLastVisible] = useState<DocumentData | null>(null);

  const {
    data: admin,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.ADMIN],
    queryFn: async () => {
      const q = lastVisible
        ? query(collection(db, 'test'), where('role', '==', 'admin'), startAfter(lastVisible), limit(4))
        : query(collection(db, 'test'), where('role', '==', 'admin'), limit(4));

      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length > 0) {
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<PostType, 'id'>) //id 제외하고 나머지 필드를 PostType으로 변환
      }));
    },

    initialPageParam: '',
    getNextPageParam: (lastPage) => {
      //console.log('333333', lastPage[lastPage.length - 1]); //배열 4개중에 마지막 데이터
      //console.log('333333', lastPage[lastPage.length - 1].id); //배열 4개중에 마지막 데이터
      console.log('lastPage', lastPage);
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPage[lastPage.length - 1].id; //sdfsdfsfsdfd
    },
    select: (data) => {
      return data.pages.flat();
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
        <St.Button>콘텐츠 by Mango</St.Button>

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
          <St.Button onClick={() => handleButtonsClick(knowHowQuery.data)}>친환경 노하우</St.Button>
          <St.Button onClick={() => handleButtonsClick(recommendQuery.data)}>제품 추천</St.Button>
          <St.Button onClick={() => handleButtonsClick(shareQuery.data)}>제품 나눔</St.Button>
          <St.Button onClick={() => handleButtonsClick(habitQuery.data)}>습관 인증</St.Button>
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
            {knowHowQuery.data?.map((item) => (
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
