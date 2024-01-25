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
import useKaKaoShare from '../../../hooks/useKaKaoShare';
import { useSearchParams } from 'react-router-dom';
import { useModal } from '../../../hooks/useModal';
import { extractFirst50Words } from '../../../util/extractContentText';

function DetailBody({ foundDetailPost }: FoundDetailPostProps) {
  const modal = useModal();
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

  //카카오톡 공유
  const { handleShareKakaoClick } = useKaKaoShare();

  //현재 url
  const detailURL = window.location.href;
  console.log(detailURL);

  //코드 복사
  const handleCodeCopy = async () => {
    try {
      await navigator.clipboard.writeText(detailURL);

      const onClickConfirm = () => {
        modal.close();
      };
      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '클립보드에 링크가 복사되었어요!',
        message: '원하는 곳에 붙여넣으세요.',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickConfirm
      };
      modal.open(openModalParams);
    } catch (error) {
      console.log(error);
    }
  };

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
        <div>
          <button
            onClick={() => {
              const data = {
                title: foundDetailPost.title,
                detailURL,
                imageUrl: foundDetailPost.coverImages[0].url,
                description: extractFirst50Words(foundDetailPost.content)
              };
              handleShareKakaoClick(data);
            }}
          >
            카카오
          </button>
          <button onClick={handleCodeCopy}>링크 복사</button>
        </div>
      </St.AdditionalInfoContainer>
    </St.BodyContainer>
  );
}

export default DetailBody;
