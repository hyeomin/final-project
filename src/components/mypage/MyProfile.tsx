import { useState } from 'react';
import HabitCalendar from './HabitCalendar';
import LikesPosts from './LikesPosts';
import MyPosts from './MyPosts';
import St from './style';

function MyProfile() {
  const [activeTab, setActiveTab] = useState('calendar');

  const onClickTabBtn = (click: string) => {
    setActiveTab(click);
  };
  return (
    <div>
      <St.Wrapper>
        <St.ProfileEditWrapper>
          ProfileEditWrapper
          <St.UserInfo>
            <St.MyImage></St.MyImage>
            <St.MyNickname>user Nickname</St.MyNickname>
            <St.EditBtn>수정하기</St.EditBtn>
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
