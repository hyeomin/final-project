import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useContext, useRef, useState } from 'react';
import { CiSettings } from 'react-icons/ci';
import { GoCalendar, GoHeart, GoPencil, GoQuestion, GoTasklist } from 'react-icons/go';
import {
  updateProfileImage,
  updateProfileImageProps,
  updateProfileInfo,
  updateProfileInfoProps
} from '../../../../api/authApi';
import { getMyPosts, getUserRanking } from '../../../../api/myPostAPI';
import defaultImg from '../../../../assets/defaultImg.jpg';
import postCountIcon from '../../../../assets/icons/postCountIcon.png';
import rankingIcon from '../../../../assets/icons/rankingIcon.png';
import { AuthContext } from '../../../../context/AuthContext';
import { QUERY_KEYS } from '../../../../query/keys';
import { auth, db } from '../../../../shared/firebase';
import HabitCalendar from '../../HabitCalendar/HabitCalendar';
import LikesPosts from '../../LikesPosts';
import MyPosts from '../../MyPosts';
import St from '../style';

function MyProfileTest() {
  const [activeTab, setActiveTab] = useState('calendar');

  const [isValid, setIsValid] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isClickedGuide, setIsClickedGuide] = useState(false);

  const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
  // 커스텀훅--> 구현 하고나서!!!!!!!!!!!!!  addeventListener , 한 번만 실행해도 됨 if else --> 로그아웃

  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;

  const [updateProfileSuccess, setUpdateProfileSuccess] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || '');
  const [profileImage, setProfileImage] = useState(authCurrentUser?.photoURL || defaultImg);

  // 닉네임 변경 유효성 검사
  const onChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== '' && nicknameRegex.test(value)) {
      setIsValid(true);
      setDisplayName(value);
    } else {
      setIsValid(false);
      // 에러 메시지 표시
      setErrorMsg('올바른 형식으로 입력해주세요.'); // 원하는 에러 메시지를 설정해주세요.
    }
  };

  // 내 게시물 갯수 가져오기
  const { data: myPosts } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getMyPosts,
    enabled: !!authCurrentUser,
    select: (data) => {
      return data?.filter((post) => post.uid === authCurrentUser?.uid!);
    }
  });

  // 랭킹순위
  const { data: topUsers } = useQuery({
    queryKey: ['topUsers'],
    queryFn: getUserRanking
  });

  //div를 클릭해도 input이 클릭되도록 하기
  const onClickUpload = () => {
    fileRef.current?.click();
  };

  const queryClient = useQueryClient();

  // 프로필 정보 Firebase 업데이트
  const userProfileUpdateMutation = useMutation({
    mutationFn: ({ authCurrentUser, displayName, profileImage }: updateProfileInfoProps) =>
      updateProfileInfo({ authCurrentUser, displayName, profileImage }),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries();
      setUpdateProfileSuccess(true);
      if (updatedUser) {
        authContext?.updateCurrentUserInContext(updatedUser);
      }
      setIsEditing(false);
      alert('프로필이 수정되었습니다.');
    },
    onError: (error) => {
      console.error('Error updating profile', error);
      setIsEditing(false);
      alert('프로필 업데이트에 문제가 발생했습니다.');
    }
  });

  //프로필 수정 업데이트
  const onSubmitModifyProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authCurrentUser) {
      if (authCurrentUser.displayName !== displayName || authCurrentUser.photoURL !== profileImage) {
        userProfileUpdateMutation.mutate({ authCurrentUser, displayName, profileImage });
      }
    }

    if (updateProfileSuccess && authCurrentUser) {
      const userDocRef = doc(db, 'users', authCurrentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot) {
        // 컬렉션에 있는 users 필드 정보 수정
        await updateDoc(userDocRef, {
          displayName: authCurrentUser?.displayName,
          profileImg: authCurrentUser?.photoURL,
          uid: authCurrentUser?.uid
        });
      }
    }
  };

  // 프로필 이미지를 Firebase에 업로드
  const profileImageUploadMutation = useMutation({
    mutationFn: ({ authCurrentUser, profileImage }: updateProfileImageProps) =>
      updateProfileImage({ authCurrentUser, profileImage }),
    onSuccess: (url) => {
      queryClient.invalidateQueries();
      // 성공 시 이미지 state 업로드해서 사진 미리보기
      setProfileImage(url);
    }
  });

  //input을 클릭해서 파일 업로드
  const onChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile?.size! > 1024 * 1024) {
      return alert('최대 1MB까지 업로드 가능합니다');
    }

    if (authCurrentUser && selectedFile) {
      profileImageUploadMutation.mutate({ authCurrentUser, profileImage: selectedFile });
    }
  };

  // menuTab 버튼
  const onClickTabBtn = (name: string) => {
    setActiveTab(name);
  };

  // 등급 가이드 확인 버튼
  const ClickedGuideToggleBtn = () => {
    setIsClickedGuide((prevState) => !prevState);
  };

  const userGrade = myPosts?.length;
  let levelOne = 1;
  let levelTwo = 2;
  let levelThree = 3;

  let LevelOneGradeEmoji = '🌱';
  let LevelTwoGradeEmoji = '☘️';
  let LevelThreeGradeEmoji = '🌳';
  let ddd = LevelOneGradeEmoji;
  let aaa = levelOne;
  if (userGrade && userGrade < 2) {
    ddd = LevelOneGradeEmoji;
    aaa = levelOne;
  } else if (userGrade && userGrade < 6) {
    ddd = LevelTwoGradeEmoji;
    aaa = levelTwo;
  } else if (userGrade && userGrade >= 6) {
    ddd = LevelThreeGradeEmoji;
    aaa = levelThree;
  }

  return (
    <St.Wrapper>
      <St.ProfileEditWrapper>
        <St.ProfileImageContainer>
          {isEditing ? (
            <>
              <St.PenWrapper onClick={onClickUpload}>
                <GoPencil />
              </St.PenWrapper>
              <St.MyImage src={profileImage} alt="defaultImg" />
            </>
          ) : (
            <St.MyImage src={authCurrentUser?.photoURL || defaultImg} alt="defaultImg" />
          )}
        </St.ProfileImageContainer>
        <St.ProfileInfo>
          <div style={{ display: 'flex' }}>
            {isEditing ? (
              <>
                <St.DisplayNameModify
                  autoFocus
                  defaultValue={authCurrentUser?.displayName ?? ''}
                  onChange={onChangeDisplayName}
                  style={{ borderColor: isValid ? 'black' : 'red' }}
                />
              </>
            ) : (
              <St.MyNickname>{authCurrentUser?.displayName || ''}</St.MyNickname>
            )}
          </div>
          <St.MyEmail>{authCurrentUser?.email}</St.MyEmail>
          <St.UserInfoModify>
            {isEditing ? (
              <>
                <St.FileInput type="file" onChange={onChangeUpload} accept="image/*" ref={fileRef} />
                <St.ModifyButton onClick={() => setIsEditing(false)}>취소</St.ModifyButton>
                <St.ModifyButton
                  // disabled={
                  //   displayName === '' && !displayName && profileImage === authCurrentUser?.photoURL && !isValid
                  // }
                  onClick={onSubmitModifyProfile}
                >
                  수정완료
                </St.ModifyButton>
                <St.ErrorMsg>
                  {!isValid && <span>{errorMsg}</span>}
                  {displayName === authCurrentUser?.displayName && profileImage === authCurrentUser?.photoURL && (
                    <span>변경된 내용이 없습니다.</span>
                  )}
                </St.ErrorMsg>
              </>
            ) : (
              <>
                <CiSettings style={{ cursor: 'pointer' }} onClick={() => setIsEditing(true)}>
                  수정
                </CiSettings>
              </>
            )}
          </St.UserInfoModify>
        </St.ProfileInfo>
        <St.UserPostInfoContainer>
          <St.PostInfoBox>
            게시물 수<br />
            <div>
              <img style={{ width: '20px', height: '20px', marginTop: '20px' }} src={postCountIcon} />
              <span style={{ marginLeft: '10px' }}>{myPosts?.length}개</span>
            </div>
          </St.PostInfoBox>
          <St.PostInfoBox>
            <div>
              <span style={{ marginBottom: '1px' }}>랭킹</span>
              <br />
              <img style={{ width: '20px', height: '20px', marginTop: '20px' }} src={rankingIcon} />
              {/* <span style={{ marginLeft: '10px' }}>{topUsers.}위</span> */}
            </div>
          </St.PostInfoBox>
          <St.PostInfoBox>
            <div>
              <div style={{ display: 'flex' }}>
                <div>등급</div>
                <div style={{ cursor: 'pointer' }} onClick={ClickedGuideToggleBtn}>
                  <GoQuestion style={{ fontSize: '15px', marginLeft: '5px', cursor: 'pointer' }} />
                </div>
              </div>

              {isClickedGuide ? (
                <div>
                  <St.GuideGradeWrapper>
                    <St.GuideGrade>
                      0-2개 : 새싹등급🌱 <br />
                      3-5개: 클로버등급☘️ <br />
                      6개이상: 나무등급🌳
                    </St.GuideGrade>
                  </St.GuideGradeWrapper>
                </div>
              ) : null}
              <br />
              <div style={{ display: 'flex', width: '20px', marginTop: '10px' }}>
                <div style={{ marginRight: '10px' }}>{ddd}</div>
                <div>Lv.{aaa}</div>
              </div>
            </div>
          </St.PostInfoBox>
        </St.UserPostInfoContainer>
      </St.ProfileEditWrapper>
      <St.TabButtonContainer>
        <St.TabButton
          onClick={() => {
            onClickTabBtn('calendar');
          }}
        >
          <div>
            <GoCalendar style={{ marginTop: '3px' }} />
            캘린더
          </div>
        </St.TabButton>
        <St.TabButton
          onClick={() => {
            onClickTabBtn('myPosts');
          }}
        >
          <div>
            <GoTasklist style={{ marginTop: '3px' }} />내 게시물
          </div>
        </St.TabButton>
        <St.TabButton
          onClick={() => {
            onClickTabBtn('likes');
          }}
        >
          <div>
            <GoHeart style={{ marginTop: '3px' }} /> 좋아요
          </div>
        </St.TabButton>
      </St.TabButtonContainer>
      <St.MySectionWrapper>
        <St.Tabs>
          {activeTab === 'calendar' && <HabitCalendar />}
          {activeTab === 'myPosts' && <MyPosts />}
          {activeTab === 'likes' && <LikesPosts />}
        </St.Tabs>
      </St.MySectionWrapper>
    </St.Wrapper>
  );
}

export default MyProfileTest;
