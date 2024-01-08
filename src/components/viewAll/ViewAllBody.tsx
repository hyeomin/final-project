import St from './style';
import defaultImg from '../../assets/defaultImg.jpg';
import { useQuery } from '@tanstack/react-query';
import { getShareList } from '../../api/pageListApi';
import { QUERY_KEYS } from '../../query/keys';
function ViewAllBody() {
  const { data: shareList, isLoading, isError } = useQuery({ queryKey: [QUERY_KEYS.SHARE], queryFn: getShareList });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }
  console.log('shareList', shareList);

  return (
    <>
      <St.MainSubWrapper>
        <St.Button>콘텐츠 by Mango</St.Button>

        <St.ContentsWrapper>
          <St.Contents>
            <St.Content>
              <img src={defaultImg}></img>
              <p>text text text text</p>
              <p>text text text text</p>
            </St.Content>

            <St.Content>
              <img src={defaultImg}></img>
              <p>text text text text</p>
              <p>text text text text</p>
            </St.Content>

            <St.Content>
              <img src={defaultImg}></img>
              <p>text text text text</p>
              <p>text text text text</p>
            </St.Content>

            <St.Content>
              <img src={defaultImg}></img>
              <p>text text text text</p>
              <p>text text text text</p>
            </St.Content>
          </St.Contents>
        </St.ContentsWrapper>
        <St.MoreContentWrapper>
          <button>더보기...</button>
        </St.MoreContentWrapper>
      </St.MainSubWrapper>

      <St.MainSubWrapper>
        <St.ButtonWrapper>
          <St.Button>친환경 노하우</St.Button>
          <St.Button>제품 추천</St.Button>
          <St.Button>제품 나눔</St.Button>
          <St.Button>습관 인증</St.Button>
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
            {shareList?.map((item) => (
              <St.Content>
                <img src={defaultImg}></img>
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
