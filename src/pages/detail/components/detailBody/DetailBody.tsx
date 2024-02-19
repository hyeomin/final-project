import { useQuery } from '@tanstack/react-query';
import { getUser } from 'api/authApi';
import defaultImage from 'assets/defaultImg.jpg';
import kakao from 'assets/detail/Kakao-icon.png';
import link from 'assets/detail/link-bold-icon.png';
import { useState } from 'react';
import { GoComment } from 'react-icons/go';

import { getComments } from 'api/commentApi';
import defaultThumbnail from 'assets/mangoThumbnail.png';
import useKaKaoShare from 'hooks/useKaKaoShare';
import { useModal } from 'hooks/useModal';
import { QUERY_KEYS } from 'query/keys';
import MetaTag from 'shared/MetaTag';
import { auth } from 'shared/firebase';
import { FoundDetailPostProps } from 'types/PostType';
import { extractFirst50Words } from 'util/extractContentText';
import { getFormattedDate } from 'util/formattedDateAndTime';
import { getTransformedImage } from 'util/getTransformedImage';
import LikeButton from '../LikeButton';
import EditNDeleteToggle from '../editNDeleteToggle/EditNDeleteToggle';
import St from './style';

function DetailBody({ foundDetailPost }: FoundDetailPostProps) {
  const modal = useModal();
  const [isEditNDeleteToggleOpened, setIsEditNDeleteToggle] = useState(false);

  const { data: author, error } = useQuery({
    queryKey: [QUERY_KEYS.USERS, foundDetailPost.uid],
    queryFn: () => getUser(foundDetailPost.uid),
    staleTime: 60_000
  });

  if (error) {
    console.log('게시글 작성자 가져오기 실패', error);
  }

  // 댓글목록 가져오기
  const { data: comments } = useQuery({
    queryKey: [QUERY_KEYS.COMMENTS, foundDetailPost.id],
    queryFn: () => getComments(foundDetailPost.id),
    staleTime: Infinity
  });

  //카카오톡 공유
  const { handleShareKakaoClick } = useKaKaoShare();

  //현재 url
  const detailURL = window.location.href;

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

  //혜민
  //오류:Uncaught TypeError: Cannot read properties of undefined (reading '0')
  //image={foundDetailPost.coverImages[0]?.url || defaultThumbnail}
  //간헐적으로 발생하는 증상으로, 페이지에 5분정도 있다가 마이페이지에서 데이터 클릭시 해당 오류 발생
  //그래서 DetailHeader를 호출하는 Detail.tsx에서
  //{!isLoading && foundDetailPost && ( <<  !isLoading으로 확실하게 구분

  return (
    <>
      <MetaTag
        title={foundDetailPost.title}
        description={foundDetailPost.content}
        image={foundDetailPost.coverImages[0]?.url || defaultThumbnail}
        url={`https://mymango.today/detail/${foundDetailPost.id}`}
      />
      <St.BodyContainer>
        <St.BodyHeader>
          <St.PostInfo>
            <div>
              <img src={author?.profileImg || defaultImage} alt="profile" />
            </div>
            <div>
              <p>{author?.displayName ?? '작성자 이름 없음'}</p>
              <St.DateSpan>
                {foundDetailPost.createdAt ? getFormattedDate(foundDetailPost.createdAt) : '작성일이 없습니다'}
              </St.DateSpan>
            </div>
          </St.PostInfo>
          {auth.currentUser?.uid === foundDetailPost.uid && (
            <St.EditNDeleteContainer>
              <button onClick={() => setIsEditNDeleteToggle((prev) => !prev)}>. . .</button>
              {isEditNDeleteToggleOpened && <EditNDeleteToggle foundDetailPost={foundDetailPost} />}
            </St.EditNDeleteContainer>
          )}
        </St.BodyHeader>
        <St.ContentBody dangerouslySetInnerHTML={{ __html: getTransformedImage(foundDetailPost?.content) as string }} />
        <St.AdditionalInfoContainer>
          <St.DetailInfo>
            <div>
              <LikeButton
                foundDetailPost={foundDetailPost}
                buttonSize={18}
                likeFalseColor={'red'}
                likeTrueColor={'red'}
              />
              <div>
                <span>좋아요</span>
                <span>{foundDetailPost.likeCount}</span>
              </div>
            </div>
            <div>
              <GoComment />
              <div>
                <span>댓글</span>
                {comments?.length ?? 0}
              </div>
            </div>
          </St.DetailInfo>

          <St.ShareInfo>
            <button
              onClick={() => {
                const data = {
                  title: foundDetailPost.title,
                  detailURL,
                  imageUrl: foundDetailPost.coverImages[0]?.url || defaultThumbnail,
                  description: extractFirst50Words(foundDetailPost.content)
                };
                handleShareKakaoClick(data);
              }}
            >
              <img src={kakao} alt="kako" />
            </button>
            <button onClick={handleCodeCopy}>
              <img src={link} alt="link" />
            </button>
          </St.ShareInfo>
        </St.AdditionalInfoContainer>
      </St.BodyContainer>
    </>
  );
}

export default DetailBody;
