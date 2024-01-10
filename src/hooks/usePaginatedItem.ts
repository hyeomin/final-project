import { useEffect, useState } from 'react';

/*
 * itemPerRow : 기본 개수 (4 개)
 * data       : 관리자 게시물 / 사용자 게시물 ( 4가지 카테고리 )
 * cnt        : 더보기 클릭시 개수 (cnt = 1 : 기본 4개 보여주기 위해서 1로 시작)
 * endIndex   : 기본 개수 * cnt
 * showMore   : 클릭시 +1
 */

export default function usePaginatedItem(data: PostType[], itemPerRow: number) {
  const [cnt, setCnt] = useState<number>(1);
  const [displayData, setDisplayData] = useState<PostType[]>([]);

  useEffect(() => {
    setDisplayData(data.slice(0, itemPerRow));
  }, [data, itemPerRow]);

  useEffect(() => {
    const endIndex = itemPerRow * cnt;
    setDisplayData(data.slice(0, endIndex));
  }, [cnt, itemPerRow]); // 'data' 의존성을 제거

  const showMore = () => setCnt((prev) => prev + 1);

  return { displayData, showMore };
}
