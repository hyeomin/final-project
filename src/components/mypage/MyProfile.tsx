import React, { useEffect, useState } from 'react';
import HabitCalendar from './HabitCalendar';
import LikesPosts from './LikesPosts';
import MyPosts from './MyPosts';
import St from './style';
import defaultImg from '../../assets/defaultImg.jpg';
import { auth, db } from '../../shared/firebase';
import { getAuth, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

function MyProfile() {
  const [activeTab, setActiveTab] = useState('calendar');
  const [newDisplayName, setNewDisPlayName] = useState('');

  const onClickTabBtn = (name: string) => {
    setActiveTab(name);
  };

  const onChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDisPlayName(e.target.value);
  };

  const onSubmitModifyProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();
    if (auth.currentUser?.displayName !== newDisplayName) {
      await updateProfile(auth.currentUser!, {
        displayName: newDisplayName
      });
      const docRef = await addDoc(collection(db, 'users'), {
        displayName: auth.currentUser?.displayName,
        profileImg: auth.currentUser?.photoURL,
        uid: auth.currentUser?.uid,
        role: 'user'
      });
      console.log(auth.currentUser);
      console.log(auth.currentUser?.displayName);
    }
  };

  return (
    <div>
      <St.Wrapper>
        <St.ProfileEditWrapper>
          ProfileEditWrapper
          <St.UserInfo>
            <St.MyImage src={auth.currentUser?.photoURL! || defaultImg} alt="defaultImg" />
            <St.MyNickname>{auth.currentUser?.displayName}</St.MyNickname>
            <input type="text" value={newDisplayName} onChange={onChangeDisplayName} />
            <St.EditBtn onClick={onSubmitModifyProfile}>수정하기</St.EditBtn>
            <button>완료</button>
          </St.UserInfo>
        </St.ProfileEditWrapper>
        <St.MySectionWrapper>
          MySectionWrapper
          <St.TabBtns>
            <St.CalendarBtn
              onClick={() => {
                onClickTabBtn('calendar');
              }}
            >
              calendar
            </St.CalendarBtn>
            <St.MyPostsBtn
              onClick={() => {
                onClickTabBtn('myPosts');
              }}
            >
              My Posts
            </St.MyPostsBtn>
            <St.MyLikesBtn
              onClick={() => {
                onClickTabBtn('likes');
              }}
            >
              Likes
            </St.MyLikesBtn>
          </St.TabBtns>
          <St.Tabs>
            {activeTab === 'calendar' && <HabitCalendar />}
            {activeTab === 'myPosts' && <MyPosts />}
            {activeTab === 'likes' && <LikesPosts />}
          </St.Tabs>
        </St.MySectionWrapper>
      </St.Wrapper>
    </div>
  );
}

export default MyProfile;
