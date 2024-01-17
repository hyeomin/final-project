import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { GoComment, GoEye, GoHeart } from 'react-icons/go';
import styled from 'styled-components';
import { getAllUsers } from '../../api/authApi';
import defaultImage from '../../assets/defaultImg.jpg';
import { FoundPostProps } from '../../pages/Detail';
import { QUERY_KEYS } from '../../query/keys';
import { auth } from '../../shared/firebase';
import theme from '../../styles/theme';
import { getFormattedDate } from '../../util/formattedDateAndTime';
import EditNDeleteToggle from './EditNDeleteToggle';

function DetailBody({ foundPost }: FoundPostProps) {
  const [isEditNDeleteToggleOpened, setIsEditNDeleteToggle] = useState(false);
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
      <BodyHeader>
        <PostInfo>
          <div>
            <img src={authorImage} alt="profile" />
          </div>
          <div>
            <p>{author?.displayName ?? '작성자 이름 없음'}</p>
            <DateSpan>{getFormattedDate(foundPost.createdAt!) ?? '작성일이 없습니다'}</DateSpan>
          </div>
        </PostInfo>
        {auth.currentUser?.uid === foundPost.uid && (
          <EditNDeleteContainer>
            <button onClick={() => setIsEditNDeleteToggle((prev) => !prev)}>. . .</button>
            {isEditNDeleteToggleOpened && <EditNDeleteToggle foundPost={foundPost} />}
          </EditNDeleteContainer>
        )}
      </BodyHeader>
      <ContentBody dangerouslySetInnerHTML={{ __html: foundPost?.content as string }} />
      <AdditionalInfoContainer>
        <span>
          <GoEye />
          {foundPost.viewCount}
        </span>
        <span>
          <GoHeart />
          {foundPost.likeCount}
        </span>
        <span>
          <GoComment />
          {foundPost.commentCount ?? 0}
        </span>
      </AdditionalInfoContainer>
    </BodyContainer>
  );
}

export default DetailBody;

const BodyContainer = styled.div`
  width: 100%;
  margin: 40px 0;
`;

const BodyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostInfo = styled.div`
  display: flex;
  column-gap: 20px;
  font-size: 18px;
  font-weight: bold;

  & img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }

  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 15px;
  }
`;

const DateSpan = styled.span`
  color: #888;
  font-size: 14px;
  font-weight: 300;
`;

const EditNDeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  position: relative;
  color: ${theme.color.lightgray};

  & button {
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    border: none;
    background-color: transparent;
  }
`;

const ContentBody = styled.div`
  color: #222222;
  padding: 40px 0;
  border-bottom: 1px solid lightgray;
`;

const AdditionalInfoContainer = styled.div`
  display: flex;
  justify-content: start;
  column-gap: 10px;
  color: ${theme.color.lightgray};
  padding: 5px 0;
  font-size: 16px;

  & span {
    display: flex;
    column-gap: 3px;
  }
`;
