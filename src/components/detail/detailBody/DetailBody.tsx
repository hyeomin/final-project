import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { GoComment } from 'react-icons/go';
import { getAllUsers } from '../../../api/authApi';
import defaultImage from '../../../assets/defaultImg.jpg';
import { QUERY_KEYS } from '../../../query/keys';
import { auth } from '../../../shared/firebase';
import { FoundDetailPostProps } from '../../../types/PostType';
import { getFormattedDate } from '../../../util/formattedDateAndTime';
import EditNDeleteToggle from '../EditNDeleteToggle';
import LikeButton from '../LikeButton';
import St from './style';

function DetailBody({ foundDetailPost }: FoundDetailPostProps) {
  const [isEditNDeleteToggleOpened, setIsEditNDeleteToggle] = useState(false);

  const { data: userList } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getAllUsers
  });

  const author = userList?.find((user) => user.uid === foundDetailPost.uid);

  let authorImage = author?.profileImg;
  if (!authorImage) {
    authorImage = defaultImage;
  }

  return (
    <St.BodyContainer>
      <St.BodyHeader>
        <St.PostInfo>
          <div>
            <img src={authorImage} alt="profile" />
          </div>
          <div>
            <p>{author?.displayName ?? '작성자 이름 없음'}</p>
            <St.DateSpan>{getFormattedDate(foundDetailPost.createdAt!) ?? '작성일이 없습니다'}</St.DateSpan>
          </div>
        </St.PostInfo>
        {auth.currentUser?.uid === foundDetailPost.uid && (
          <St.EditNDeleteContainer>
            <button onClick={() => setIsEditNDeleteToggle((prev) => !prev)}>. . .</button>
            {isEditNDeleteToggleOpened && <EditNDeleteToggle foundDetailPost={foundDetailPost} />}
          </St.EditNDeleteContainer>
        )}
      </St.BodyHeader>
      <St.ContentBody dangerouslySetInnerHTML={{ __html: foundDetailPost?.content as string }} />
      <St.AdditionalInfoContainer>
        <St.CountInfo>
          <LikeButton foundDetailPost={foundDetailPost} buttonSize={18} likeFalseColor={'red'} likeTrueColor={'red'} />
          <div>
            <span>좋아요</span>
            <span>{foundDetailPost.likeCount}</span>
          </div>
        </St.CountInfo>
        <St.CountInfo>
          <GoComment />
          <div>
            <span>댓글</span>
            {foundDetailPost.commentCount ?? 0}
          </div>
        </St.CountInfo>
      </St.AdditionalInfoContainer>
    </St.BodyContainer>
  );
}

export default DetailBody;
