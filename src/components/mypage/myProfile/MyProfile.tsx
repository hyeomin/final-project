import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { GoCalendar, GoHeart, GoPencil, GoQuestion, GoTasklist } from 'react-icons/go';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  updateProfileImage,
  updateProfileImageProps,
  updateProfileInfo,
  updateProfileInfoProps
} from '../../../api/authApi';
import defaultImg from '../../../assets/defaultImg.jpg';
import postCountIcon from '../../../assets/icons/postCountIcon.png';
import rankingIcon from '../../../assets/icons/rankingIcon.png';
import { AuthContext } from '../../../context/AuthContext';
import { useModal } from '../../../hooks/useModal';
import { QUERY_KEYS } from '../../../query/keys';
import { auth, db } from '../../../shared/firebase';
import { resizeProfileImageFile } from '../../../util/imageResize';
import HabitCalendar from '../HabitCalendar/HabitCalendar';
import LikesPosts from '../LikesPosts';
import MyPosts from '../MyPosts';
import St from './style';
import { getMyPosts, getUserRanking } from '../../../api/myPostAPI';

function MyProfile() {
  const modal = useModal();
  const [activeTab, setActiveTab] = useState('calendar');
  const [isValid, setIsValid] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isClickedGuide, setIsClickedGuide] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;

  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;
  const [isPhotoURLChanged, setIsPhotoURLChanged] = useState(false);
  const [isDisplayNameChanged, setIsDisplayNameChanged] = useState(false);
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || '');
  const [profileImage, setProfileImage] = useState(authCurrentUser?.photoURL || defaultImg);
  const [resizedImage, setResizedImage] = useState<File>();

  // 닉네임 변경 유효성 검사
  const onChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setIsChecked(false);

    if (value !== '' && nicknameRegex.test(value)) {
      setIsValid(true);
      setDisplayName(value);
    } else {
      setIsValid(false);
      // 에러 메시지 표시
      setErrorMsg('올바른 형식으로 입력하세요. \n (2자 이상 8자 이하, 영어 또는 숫자 또는 한글)');
    }
  };

  // 내 게시물 갯수 가져오기
  const { data: myPosts } = useQuery({
    queryKey: [QUERY_KEYS.POSTS, 'myPosts'],
    queryFn: getMyPosts,
    staleTime: 1000 * 60,
    enabled: !!authCurrentUser
  });

  // 랭킹순위 (좋아요 수 기준)
  const { data: userRanking } = useQuery({
    queryKey: ['userRanking'],
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
      queryClient.invalidateQueries({ queryKey: [`${QUERY_KEYS.USERS}`] });
      if (updatedUser) {
        authContext?.updateCurrentUserInContext(updatedUser);
      }
      setIsEditing(false);

      const onClickSave = () => {
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '프로필이 수정되었습니다.',
        message: '',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
    },
    onError: (error) => {
      console.error('프로필 업데이트에 문제가 발생했습니다.', error);
      setIsEditing(false);

      const onClickSave = () => {
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '프로필 업데이트에 문제가 발생했습니다.',
        message: '',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
    }
  });

  //프로필 수정 업데이트
  const onSubmitModifyProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const onClickSave = () => {
      modal.close();
    };

    if (authCurrentUser!.displayName !== displayName) {
      setIsDisplayNameChanged(true);
    }

    if (authCurrentUser!.photoURL !== profileImage) {
      setIsPhotoURLChanged(true);
    }

    if (!isChecked && isDisplayNameChanged) {
      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '중복확인 버튼을 눌러주세요',
        message: '',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
    } else {
      if (authCurrentUser) {
        if (isDisplayNameChanged || isPhotoURLChanged) {
          userProfileUpdateMutation.mutate({ authCurrentUser, displayName, profileImage });
          setIsEditing(false);
          setIsDisplayNameChanged(false);
          setIsPhotoURLChanged(false);
        }
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
      if (url) setProfileImage(url);
    }
  });

  //input을 클릭해서 파일 업로드
  const onChangeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile?.size! > 1024 * 1024) {
      const onClickSave = () => {
        modal.close();
        return;
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '[알림]',
        message: '최대 1MB까지 업로드 가능합니다',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
    } else if (authCurrentUser) {
      try {
        // 프로필 이미지 사이즈 업데이트
        const resizedImage = await resizeProfileImageFile(selectedFile);
        profileImageUploadMutation.mutate({ authCurrentUser, profileImage: resizedImage });
      } catch (err) {
        console.log('프로필 사이즈 전환 실패', err);
      }
    }
  };

  // 닉네임 중복확인
  const nicknameCheck = async (nickname: string) => {
    const userRef = collection(db, 'users');
    const q = query(userRef, where('displayName', '==', nickname));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      const onClickSave = () => {
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '이미 존재하는 닉네임입니다.',
        message: '',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
      setIsChecked(false);
      setIsFormValid(false);
      return;
    } else if (nickname === '') {
      const onClickSave = () => {
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '닉네임을 입력해주세요.',
        message: '',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
      return;
    } else if (querySnapshot.docs.length === 0) {
      const onClickSave = () => {
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '사용 가능한 닉네임입니다.',
        message: '',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
      setIsFormValid(true);
      setIsChecked(true);
    }
  };

  useEffect(() => {
    const queryString = location.search;
    const searchParams = new URLSearchParams(queryString);
    const profile = searchParams.get('profile') || '';
    setActiveTab(profile || 'calendar');
  }, [location.search]);

  // menuTab 버튼
  const onClickTabBtn = (name: string) => {
    const queryString = location.search;
    const newSearchParams = new URLSearchParams(queryString);
    newSearchParams.set('profile', name);
    setSearchParams(newSearchParams);

    const updatedActiveTab = name;
    setActiveTab(updatedActiveTab);

    const newUrl = `${location.pathname}?${newSearchParams.toString()}`;

    navigate(newUrl);
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
  let levelEmoji = LevelOneGradeEmoji;
  let level = levelOne;
  if (userGrade && userGrade < 16) {
    levelEmoji = LevelOneGradeEmoji;
    level = levelOne;
  } else if (userGrade && userGrade <= 30) {
    levelEmoji = LevelTwoGradeEmoji;
    level = levelTwo;
  } else if (userGrade && userGrade < 30) {
    levelEmoji = LevelThreeGradeEmoji;
    level = levelThree;
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
                <St.DisplayNameCheckBtn
                  onClick={() => nicknameCheck(displayName)}
                  disabled={displayName == '' || displayName == authCurrentUser?.displayName}
                >
                  중복확인
                </St.DisplayNameCheckBtn>
              </>
            ) : (
              <St.MyNickname>{authCurrentUser?.displayName || ''}</St.MyNickname>
            )}
          </div>
          <St.MyEmail>{authCurrentUser?.email}</St.MyEmail>
          <St.UserInfoModify>
            {isEditing ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <St.FileInput type="file" onChange={onChangeUpload} accept="image/*" ref={fileRef} />
                <St.ModifyButton onClick={() => setIsEditing(false)}>취소</St.ModifyButton>
                <St.ModifyButton
                  onClick={onSubmitModifyProfile}
                  disabled={
                    !displayName ||
                    (displayName === authCurrentUser?.displayName && profileImage === authCurrentUser?.photoURL) ||
                    !isValid
                  }
                >
                  수정완료
                </St.ModifyButton>
                <St.ErrorMsg>
                  {!isValid && errorMsg !== '변경된 내용이 없습니다.' && <span>{errorMsg}</span>}
                  {displayName === authCurrentUser?.displayName && profileImage === authCurrentUser?.photoURL && (
                    <span>변경된 내용이 없습니다.</span>
                  )}
                </St.ErrorMsg>
              </div>
            ) : (
              <>
                <St.ProfileModifyBtn style={{ cursor: 'pointer' }} onClick={() => setIsEditing(true)}>
                  프로필 수정
                </St.ProfileModifyBtn>
              </>
            )}
          </St.UserInfoModify>
        </St.ProfileInfo>
        <St.UserPostInfoContainer>
          <St.PostInfoBox>
            <div>게시물 수</div>
            <St.PostInfoIcon>
              <img src={postCountIcon} />
              <div>{myPosts ? myPosts.length : '-'}개</div>
            </St.PostInfoIcon>
          </St.PostInfoBox>
          <St.PostInfoBox>
            <div>랭킹</div>
            <St.PostInfoIcon>
              <img src={rankingIcon} />
              <div>
                {authCurrentUser && userRanking
                  ? userRanking.findIndex((r) => r.uid === authCurrentUser.uid) >= 0
                    ? `${userRanking?.findIndex((r) => r.uid === authCurrentUser.uid) + 1}위`
                    : '순위 없음'
                  : '-'}
              </div>
            </St.PostInfoIcon>
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
                      Lv1 - 0-15개 : 새싹등급🌱 <br />
                      Lv2 - 16-30개 : 클로버등급☘️ <br />
                      Lv3 - 30개 이상 : 나무등급🌳
                    </St.GuideGrade>
                  </St.GuideGradeWrapper>
                </div>
              ) : null}
              <br />
              <St.LevelBox>
                <St.LevelEmoji>{levelEmoji}</St.LevelEmoji>
                <St.Level>Lv.{level}</St.Level>
              </St.LevelBox>
            </div>
          </St.PostInfoBox>
        </St.UserPostInfoContainer>
      </St.ProfileEditWrapper>
      <St.TabButtonContainer>
        <St.TabButton
          $isActive={activeTab === 'calendar'}
          onClick={() => {
            onClickTabBtn('calendar');
          }}
        >
          <div>
            <GoCalendar />
            <span>캘린더</span>
          </div>
        </St.TabButton>
        <St.TabButton
          $isActive={activeTab === 'myPosts'}
          onClick={() => {
            onClickTabBtn('myPosts');
          }}
        >
          <div>
            <GoTasklist />
            <span>내 게시물</span>
          </div>
        </St.TabButton>
        <St.TabButton
          $isActive={activeTab === 'likes'}
          onClick={() => {
            onClickTabBtn('likes');
          }}
        >
          <div>
            <GoHeart />
            <span>좋아요</span>
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

export default MyProfile;
