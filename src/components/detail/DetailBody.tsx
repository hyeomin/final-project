import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getAllUsers } from '../../api/authApi';
import defaultImage from '../../assets/defaultImg.jpg';
import { QUERY_KEYS } from '../../query/keys';
import { getFormattedDate } from '../../util/formattedDateAndTime';

type Props = {
  foundPost: PostType;
};

function DetailBody({ foundPost }: Props) {
  const { data: userList } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getAllUsers
  });

  const author = userList?.find((user) => user.uid === foundPost.uid);

  let authorImage = author?.profileImg;
  if (!authorImage) {
    authorImage = defaultImage;
  }

  return (
    <BodyContainer>
      <PostInfo>
        <div>
          <img src={authorImage} alt="profile" />
        </div>
        <div>
          <p>{author?.displayName ?? '작성자 이름 없음'}</p>
          <span>{getFormattedDate(foundPost.createdAt!) ?? '작성일이 없습니다'}</span>
        </div>
      </PostInfo>
      <ContentBody dangerouslySetInnerHTML={{ __html: foundPost?.content as string }} />
    </BodyContainer>
  );
}

export default DetailBody;

const BodyContainer = styled.div`
  width: 100%;
  margin: 40px 0;
  border-bottom: 1px solid lightgray;
`;

const PostInfo = styled.div`
  display: flex;
  column-gap: 20px;
  font-size: 22px;
  font-weight: bold;

  & img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }

  & div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  & span {
    color: #888;
    font-size: 16px;
    font-weight: 300;
  }
`;

const ContentBody = styled.div`
  color: #222222;
  padding: 40px 0;
`;
