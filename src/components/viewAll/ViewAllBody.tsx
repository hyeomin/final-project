import St from './style';
import defaultImg from '../../assets/defaultImg.jpg';
import { useQuery } from '@tanstack/react-query';
import { getAdminPostList, getHabitList, getRecommendList, getShareList, getknowHowList } from '../../api/pageListApi';
import { QUERY_KEYS } from '../../query/keys';
import { useEffect, useState } from 'react';

function ViewAllBody() {
  const [selectCategory, setSelectCategory] = useState<Post[]>([]);

  const adminQuery = useQuery({ queryKey: [QUERY_KEYS.ADMIN], queryFn: getAdminPostList });
  const knowHowQuery = useQuery({ queryKey: [QUERY_KEYS.KNOWHOW], queryFn: getknowHowList });
  const recommendQuery = useQuery({ queryKey: [QUERY_KEYS.RECOMMEND], queryFn: getRecommendList });
  const shareQuery = useQuery({ queryKey: [QUERY_KEYS.SHARE], queryFn: getShareList });
  const habitQuery = useQuery({ queryKey: [QUERY_KEYS.HABIT], queryFn: getHabitList });

  useEffect(() => {
    if (knowHowQuery.data) {
      setSelectCategory(knowHowQuery.data);
    }
  }, [knowHowQuery.data]);

  /*----------------------------*/

  //더보기 기능 (관리자용)
  // 1. itemPerRow : 기본 개수 (4 개)
  // 2. startIndex : 배열 slice에서 사용되는 시작 index (값: 0)
  // 3. cnt : 더보기 클릭시 개수 (cnt = 1 : 기본 4개 보여주기 위해서 1로 시작)
  // 3. endIndex : startIndex + itemPerRow * cnt
  // 4. DisplayItem : 배열(관리자/selectedCategory).slice(startIndex,endIndex)
  // 5. 더보기 클릭시 cnt ++

  const itemPerRow = 4;
  const startIndex = 0;
  let endIndex = 0;
  const [cnt, setCnt] = useState(1);
  const [DisplayAdminItem, setDisplayAdminItem] = useState<Post[]>([]);
  console.log(DisplayAdminItem);
  useEffect(() => {
    if (adminQuery.data) {
      endIndex = startIndex + itemPerRow * cnt;
      setDisplayAdminItem(adminQuery.data.slice(startIndex, endIndex));
    }
  }, [adminQuery.data, cnt]);

  //더보기 버튼
  const handleShowMoreClick = () => {
    setCnt((prev) => prev + 1);
  };

  /*----------------------------*/

  //로딩 & 에러 처리 구간
  const isLoading =
    adminQuery.isLoading ||
    knowHowQuery.isLoading ||
    recommendQuery.isLoading ||
    shareQuery.isLoading ||
    habitQuery.isLoading;

  const isError =
    adminQuery.isError || knowHowQuery.isError || recommendQuery.isError || shareQuery.isError || habitQuery.isError;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }
  /*----------------------------*/

  //버튼 클릭시 해당 카테고리 선택
  const handleButtonsClick = (category: Post[] | undefined) => {
    if (category) {
      setSelectCategory(category);
    } else {
      setSelectCategory([]);
    }
  };

  return (
    <>
      <St.MainSubWrapper>
        <St.Button>콘텐츠 by Mango</St.Button>

        <St.ContentsWrapper>
          <St.Contents>
            {DisplayAdminItem?.map((item) => (
              <St.Content key={item.id}>
                <img src={item.coverUrl ? item.coverUrl : defaultImg} alt={item.title}></img>
                <p>{item.title}</p>
                <p>{item.content}</p>
                <p>{item.category}</p>
              </St.Content>
            ))}
          </St.Contents>
        </St.ContentsWrapper>
        <St.MoreContentWrapper>
          <button onClick={handleShowMoreClick}>더보기...</button>
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
            {selectCategory?.map((item) => (
              <St.Content key={item.id}>
                <img src={item.coverUrl ? item.coverUrl : defaultImg} alt={item.title}></img>
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
