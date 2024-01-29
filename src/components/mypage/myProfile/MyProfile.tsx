import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CiSettings } from 'react-icons/ci';
import { GoCalendar, GoHeart, GoPencil, GoQuestion, GoTasklist } from 'react-icons/go';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  updateProfileImage,
  updateProfileImageProps,
  updateProfileInfo,
  updateProfileInfoProps
} from '../../../api/authApi';
import { getMyPosts, getUserRanking } from '../../../api/myPostAPI';
import defaultImg from '../../../assets/defaultImg.jpg';
import postCountIcon from '../../../assets/icons/postCountIcon.png';
import rankingIcon from '../../../assets/icons/rankingIcon.png';
import { AuthContext } from '../../../context/AuthContext';
import { useModal } from '../../../hooks/useModal';
import { QUERY_KEYS } from '../../../query/keys';
import { auth, db } from '../../../shared/firebase';
import HabitCalendar from '../HabitCalendar/HabitCalendar';
import LikesPosts from '../LikesPosts';
import MyPosts from '../MyPosts';
import St from './style';
import { updateVariableDeclarationList } from 'typescript';
import { set } from 'react-hook-form';

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
  // 커스텀훅--> 구현 하고나서!!!!!!!!!!!!!  addeventListener , 한 번만 실행해도 됨 if else --> 로그아웃

  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;

  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || '');
  const [profileImage, setProfileImage] = useState(authCurrentUser?.photoURL || defaultImg);

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
      setErrorMsg('올바른 형식으로 입력하세요. \n (2자 이상 8자 이하, 영어 또는 숫자 또는 한글)'); // 원하는 에러 메시지를 설정해주세요.
    }
  };

  // 내 게시물 갯수 가져오기
  const { data: myPosts } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getMyPosts,
    // enabled: !!authCurrentUser,
    select: (data) => {
      return data?.filter((post) => post.uid === authCurrentUser?.uid!);
    }
  });

  // 랭킹순위
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

    if (authCurrentUser) {
      if (authCurrentUser.displayName !== displayName || authCurrentUser.photoURL !== profileImage) {
        userProfileUpdateMutation.mutate({ authCurrentUser, displayName, profileImage });
        setIsEditing(false);
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
  const onChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

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
    } else if (authCurrentUser && selectedFile) {
      profileImageUploadMutation.mutate({ authCurrentUser, profileImage: selectedFile });
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
    // console.log('queryString', queryString);
    // console.log('location', location);
    // console.log('searchParams get', newSearchParams);

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
                    !isValid ||
                    (displayName !== authCurrentUser?.displayName && !isChecked)
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
                <CiSettings style={{ cursor: 'pointer' }} onClick={() => setIsEditing(true)}>
                  수정
                </CiSettings>
              </>
            )}
          </St.UserInfoModify>
        </St.ProfileInfo>
        <St.UserPostInfoContainer>
          <St.PostInfoBox>
            <div>게시물 수</div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
              <img src={postCountIcon} />
              <div>{myPosts?.length}개</div>
            </div>
          </St.PostInfoBox>
          <St.PostInfoBox>
            <div>랭킹</div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
              <img src={rankingIcon} />
              <div>
                {authCurrentUser && userRanking
                  ? // 조건에 만족하는 요소를 못찾으면 -1반환하는 로직 때문에 undefined가 나옴
                    // 순위--> 인덱스 값을 사용하여 +1한 값을 보여줌. 문제는 findIndex값이 없을때 +1을 하게되면 0이됨
                    // 0은 falsy하기 때문에 순위없음대신 undefined가 나왔음.
                    userRanking.findIndex((r) => r.uid === authCurrentUser.uid) !== -1
                    ? `${userRanking?.findIndex((r) => r.uid === authCurrentUser.uid) + 1}위`
                    : '순위 없음'
                  : // findIndex값이 -1일때 언디파인드가 아니라 '-' 나오게
                    '-'}
              </div>
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
                      Lv1 - 0-15개 : 새싹등급🌱 <br />
                      Lv2 - 16-30개 : 클로버등급☘️ <br />
                      Lv3 - 30개 이상 : 나무등급🌳
                    </St.GuideGrade>
                  </St.GuideGradeWrapper>
                </div>
              ) : null}
              <br />
              <div style={{ display: 'flex', width: '20px', marginTop: '10px', gap: '5px' }}>
                <span>{levelEmoji}</span>
                <span>Lv.{level}</span>
              </div>
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
