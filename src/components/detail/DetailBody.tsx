import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import { getAllUsers } from '../../api/authApi';
import { QUERY_KEYS } from '../../query/keys';
import { UserType } from '../../types/UserType';
import { getFormattedDate } from '../../util/formattedDateAndTime';

type Props = {
  post: PostType;
};
function DetailBody({ post }: Props) {
  const [author, setAuthor] = useState<UserType | undefined>(undefined);
  const { data: userList } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getAllUsers
  });

  if (post) {
    const author = userList?.find((user) => user.id === post.uid);
    setAuthor(author);
  }

  console.log('포스트가 들어오니', post);

  return (
    <BodyContainer>
      <PostInfo>
        <div>
          <img src={author?.profileImg} alt="profile" />
        </div>
        <div>
          <p>{author?.displayName ?? '작성자 이름 없음'}</p>
          <span>{getFormattedDate(post.createdAt!) ?? '작성일이 없습니다'}</span>
        </div>
      </PostInfo>
      <div dangerouslySetInnerHTML={{ __html: post?.content as string }} />
    </BodyContainer>
  );
}

export default DetailBody;

const BodyContainer = styled.div`
  width: 100%;
`;

const PostInfo = styled.div`
  display: flex;
  column-gap: 20px;

  & img {
    width: 50px;
    border-radius: 50px;
  }

  & div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  & p {
    font-size: 18px;
    font-weight: bold;
  }
`;
