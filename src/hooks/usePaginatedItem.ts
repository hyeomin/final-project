import { useEffect, useState } from 'react';

export default function usePaginatedItem(data: PostType[], itemPerRow: number) {
  const [cnt, setCnt] = useState<number>(1);
  const [displayData, setDisplayData] = useState<PostType[]>([]);

  useEffect(() => {
    const endIndex = itemPerRow * cnt;
    setDisplayData(data.slice(0, endIndex));
  }, [data, cnt]);

  useEffect(() => {
    // data가 변경될 때 cnt를 1로 초기화
    setCnt(1);
  }, [data]);

  const showMore = () => setCnt((prev) => prev + 1);

  return { displayData, showMore };
}
