import St from './style';
import { QueryFunctionContext, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

interface PostListProps {
  queryKey: QueryKey;
  queryFn: (
    context: QueryFunctionContext<QueryKey, undefined | QueryDocumentSnapshot<DocumentData, DocumentData>>
  ) => Promise<QueryDocumentSnapshot<DocumentData, DocumentData>[]>;
}

function PostList({ queryKey, queryFn }: PostListProps) {
  const { data: posts, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn,
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

  return (
    <St.MainSubWrapper>
      <St.ContentsWrapper>
        <St.Contents>
          {posts?.map((post) => (
            <St.Content key={post.id}>
              {/*
          <img src={item.coverUrl ? item.coverUrl : defaultImg} alt={item.title}></img>
          */}
              <p>{post.title}</p>
              <p>{post.content}</p>
              <p>{post.category}</p>
            </St.Content>
          ))}
        </St.Contents>
      </St.ContentsWrapper>
      <St.MoreContentWrapper>
        <button onClick={() => fetchNextPage()}>더보기...</button>
      </St.MoreContentWrapper>
    </St.MainSubWrapper>
  );
}

export default PostList;
