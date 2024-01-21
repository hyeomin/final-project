import { useQuery } from '@tanstack/react-query';
import { updateProfile } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CiSettings } from 'react-icons/ci';
import { GoCalendar, GoHeart, GoPencil, GoQuestion, GoTasklist } from 'react-icons/go';
import { getMyPosts, getUserRanking } from '../../../api/myPostAPI';
import defaultImg from '../../../assets/defaultImg.jpg';
import postCountIcon from '../../../assets/icons/postCountIcon.png';
import rankingIcon from '../../../assets/icons/rankingIcon.png';
import { AuthContext } from '../../../context/AuthContext';
import { QUERY_KEYS } from '../../../query/keys';
import { auth, db, storage } from '../../../shared/firebase';
import HabitCalendar from '../HabitCalendar/HabitCalendar';
import LikesPosts from '../LikesPosts';
import MyPosts from '../MyPosts';
import St from './style';

function MyProfile() {
  const [activeTab, setActiveTab] = useState('calendar');
  const [nickname, setNickname] = useState('');
  const [newDisplayName, setNewDisPlayName] = useState('');
  const [userObj, setUserObj] = useState({});
  const [imageUpload, setImageUpload] = useState<any>('');
  const [image, setImage] = useState<string | null>(auth.currentUser?.photoURL || '');
  // Ashley type 수정
  const [isValid, setIsValid] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previousPhotoURL, setPreviousPhotoURL] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isClickedGuide, setIsClickedGuide] = useState(false);
  const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
  // 커스텀훅--> 구현 하고나서!!!!!!!!!!!!!  addeventListener , 한 번만 실행해도 됨 if else --> 로그아웃

  const authContext = useContext(AuthContext);
  const updateCurrentUserInContext = authContext?.updateCurrentUserInContext;

  // 프로필 이미지
  useEffect(() => {
    setPreviousPhotoURL(auth.currentUser?.photoURL!);
  }, [image]);

  // 프로필 취소 버튼
  const onCancelEdit = () => {
    setImage(previousPhotoURL!);
    setIsEditing(false);
    setNewDisPlayName(auth.currentUser?.displayName!);
    setPreviewImage(null);

    if (fileRef.current) {
      fileRef.current.value = '';
      return;
    }
  };

  // 닉네임 변경 유효성 검사
  const onChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== '' && nicknameRegex.test(value)) {
      setIsValid(true);
      setNewDisPlayName(value);
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
    enabled: !!auth.currentUser,
    select: (data) => {
      return data?.filter((post) => post.uid === auth.currentUser?.uid!);
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

  //프로필 수정 업데이트
  const onSubmitModifyProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    // auth 불러오기
    // 현재 유저 닉네임과 새로운 닉네임이 같지 않거나 현재 유저 사진Url과 업로드이미지가 같지 않으면!
    if (auth.currentUser?.displayName !== newDisplayName || auth.currentUser?.photoURL !== image) {
      // 현재 유저 uid 변수로 저장
      const userUid = auth.currentUser?.uid;
      if (userUid) {
        //  auth 객체에 있는 정보 업데이트
        await updateProfile(auth.currentUser!, {
          displayName: newDisplayName,
          photoURL: image
        });

        // getDoc으로 userDocRef users의 해당하는 현재 유저 uid를 가져온다
        const userDocRef = doc(db, 'users', userUid);
        const userDocSnapshot = await getDoc(userDocRef);
        const updateUser = auth.currentUser;
        // userDocRef users의 해당하는 현재 유저 uid가 있다면
        if (userDocSnapshot) {
          // 컬렉션에 있는 users 필드 정보 수정
          await updateDoc(userDocRef, {
            displayName: updateUser?.displayName,
            profileImg: updateUser?.photoURL,
            uid: updateUser?.uid
          });
        }
        // console.log('updateUser', updateUser);
        setNewDisPlayName(auth.currentUser?.displayName!);
        setIsEditing(false);
      }
    }
  };

  // 파일이 업로드되면 스토리지에 업로드하고 다운 즉시 이미지가 보여짐
  // 폴더/파일
  useEffect(() => {
    const imageRef = ref(storage, 'userProfile/' + `${auth.currentUser?.uid}`);
    if (!imageUpload) return;
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(url);
      });
    });
  }, [imageUpload]);

  //input을 클릭해서 파일 업로드
  //사진 미리보기
  const onChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];

    if (uploadedFile?.size! > 1024 * 1024) {
      return alert('최대 1MB까지 업로드 가능합니다');
    }

    if (uploadedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };

      reader.readAsDataURL(uploadedFile);
      setImageUpload(uploadedFile);
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
  console.log('하우매니', myPosts?.length);
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
          {isEditing && (
            <St.PenWrapper onClick={onClickUpload}>
              <GoPencil />
            </St.PenWrapper>
          )}
          <St.MyImage
            src={auth.currentUser?.photoURL === null ? defaultImg : previewImage || auth.currentUser?.photoURL!}
            alt="defaultImg"
          />
        </St.ProfileImageContainer>
        <St.ProfileInfo>
          <div style={{ display: 'flex' }}>
            {isEditing ? (
              <>
                <St.DisplayNameModify
                  autoFocus
                  defaultValue={auth.currentUser?.displayName!}
                  // value={newDisplayName}
                  onChange={onChangeDisplayName}
                  style={{ borderColor: isValid ? 'black' : 'red' }}
                />
              </>
            ) : (
              <St.MyNickname>{auth.currentUser?.displayName!}</St.MyNickname>
            )}
          </div>
          <St.MyEmail>{auth.currentUser?.email}</St.MyEmail>
          <St.UserInfoModify>
            {isEditing ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <St.FileInput type="file" onChange={onChangeUpload} accept="image/*" ref={fileRef} />
                <St.ModifyButton onClick={onCancelEdit}>취소</St.ModifyButton>
                <St.ModifyButton
                  disabled={
                    newDisplayName === '' && !newDisplayName && image === auth.currentUser?.photoURL && !isValid
                  }
                  onClick={onSubmitModifyProfile}
                >
                  수정완료
                </St.ModifyButton>

                <St.ErrorMsg>
                  {!isValid && <span>{errorMsg}</span>}
                  {newDisplayName === auth.currentUser?.displayName && image === auth.currentUser?.photoURL && (
                    <span>변경된 게 없습니다.</span>
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
              <span style={{ marginLeft: '10px' }}>{topUsers?.length}위</span>
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

export default MyProfile;