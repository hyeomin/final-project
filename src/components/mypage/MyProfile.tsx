import { useQuery } from '@tanstack/react-query';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { GoCalendar, GoHeart, GoTasklist } from 'react-icons/go';
import { getMyPosts } from '../../api/myPostAPI';
import defaultImg from '../../assets/defaultImg.jpg';
import { QUERY_KEYS } from '../../query/keys';
import { auth, db, storage } from '../../shared/firebase';
import HabitCalendar from './HabitCalendar';
import LikesPosts from './LikesPosts';
import MyPosts from './MyPosts';
import St from './style';

function MyProfile() {
  const [activeTab, setActiveTab] = useState('calendar');
  const [userObj, setUserObj] = useState({
    displayName: '',
    uid: '',
    photoURL: ''
  });

  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [imageUpload, setImageUpload] = useState<any>('');
  // const [imageUpload, setImageUpload] = useState<File | null>(null);
  // const [localImage, setLocalImage] = useState<string | null>(null);

  const [image, setImage] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const onClickTabBtn = (name: string) => {
    setActiveTab(name);
  };

  const onChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDisplayName(e.target.value);
  };
  // 커스텀훅--> 구현 하고나서!!!!!!!!!!!!!  addeventListener , 한 번만 실행해도 됨 if else --> 로그아웃
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUserObj({
  //         displayName: auth.currentUser?.displayName,
  //         uid: auth.currentUser?.uid,
  //         photoURL: auth.currentUser?.photoURL
  //       });
  //     }
  //   });
  // }, []);

  // 내 게시물 갯수 가져오기
  const { data: posts } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getMyPosts
  });

  //div를 클릭해도 input이 클릭되도록 하기
  const onClickUpload = () => {
    fileRef.current?.click();
  };

  //input을 클릭해서 파일 업로드
  //사진 미리보기
  //blob url 리팩토링 하기
  const onChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];

    if (uploadedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };

      reader.readAsDataURL(uploadedFile);
      setImageUpload(uploadedFile);
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

  //프로필 수정 업데이트

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    const fetchUserData = async () => {
      setUserObj({
        displayName: user?.displayName as string,
        uid: user?.uid as string,
        photoURL: user?.photoURL as string
      });
      setNewDisplayName(user?.displayName!);
    };

    fetchUserData();
  }, []);

  const onSubmitModifyProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();

    if (auth.currentUser?.displayName !== newDisplayName || auth.currentUser?.photoURL !== image) {
      const userUid = auth.currentUser?.uid;

      if (userUid) {
        try {
          await updateProfile(auth.currentUser!, {
            displayName: newDisplayName,
            photoURL: image
          });

          const userDocRef = doc(db, 'users', userUid);

          await updateDoc(userDocRef, {
            displayName: newDisplayName,
            profileImg: image
          });

          // setUserObj({
          //   displayName: newDisplayName,
          //   uid: userUid,
          //   photoURL: image
          // });

          setNewDisplayName(newDisplayName);
        } catch (error) {
          console.error(error, '에러입니다');
        }
      }
    }
  };
  console.log('현재유저', auth.currentUser);
  return (
    <St.Wrapper>
      <St.ProfileEditWrapper>
        {/* <St.profileImg
         src={previewImage || defaultImg} alt="img" /> */}

        <St.profileImg>
          {auth.currentUser?.photoURL === '' ? (
            <img src={defaultImg} alt="Default Profile" />
          ) : (
            <img src={auth.currentUser?.photoURL!} alt="User Profile" />
          )}
        </St.profileImg>

        <St.EmailAndName></St.EmailAndName>
        <St.ProfileInfo>
          <St.MyNickname>{auth.currentUser?.displayName}</St.MyNickname>
          <St.MyEmail>{auth.currentUser?.email}</St.MyEmail>
          <St.UserPostInfo>
            <span>게시물: {posts?.length}</span>
            <span>등급: Lv.0</span>
          </St.UserPostInfo>
          <St.UserInfoModify>
            <St.FileInput style={{ border: '1px solid black' }} type="file" onChange={onChangeUpload} />
            <St.FileImgUpload onClick={onClickUpload}>업로드</St.FileImgUpload>
            <br />
            <St.DisplayNameModify type="text" value={newDisplayName} onChange={onChangeDisplayName} />
            <St.EditBtn onClick={onSubmitModifyProfile}>수정하기</St.EditBtn>
          </St.UserInfoModify>
        </St.ProfileInfo>
      </St.ProfileEditWrapper>
      <St.MySectionWrapper>
        <St.TabButtonContainer>
          <St.TabButton
            onClick={() => {
              onClickTabBtn('calendar');
            }}
          >
            <div>
              <GoCalendar />
              캘린더
            </div>
          </St.TabButton>
          <St.TabButton
            onClick={() => {
              onClickTabBtn('myPosts');
            }}
          >
            <div>
              <GoTasklist />내 게시물
            </div>
          </St.TabButton>
          <St.TabButton
            onClick={() => {
              onClickTabBtn('likes');
            }}
          >
            <div>
              <GoHeart /> 좋아요
            </div>
          </St.TabButton>
        </St.TabButtonContainer>
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
