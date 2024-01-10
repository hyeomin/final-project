import React from 'react';
import St from './style';

const MyPosts = () => {
  return (
    <div>
      MyPosts
      <St.MyPostsWrapper>
        <St.MyPosts>
          <St.MyPostImg></St.MyPostImg>
          <St.MyPostText> </St.MyPostText>
        </St.MyPosts>
        <St.MyPosts>
          <St.MyPostImg></St.MyPostImg>
          <St.MyPostText></St.MyPostText>
        </St.MyPosts>
        <St.MyPosts>
          <St.MyPostImg>Img</St.MyPostImg>
          <St.MyPostText>text text</St.MyPostText>
        </St.MyPosts>
        <St.MyPosts>
          <St.MyPostImg>Img</St.MyPostImg>
          <St.MyPostText>text text</St.MyPostText>
        </St.MyPosts>
        <St.MyPosts>
          <St.MyPostImg>Img</St.MyPostImg>
          <St.MyPostText>text text</St.MyPostText>
        </St.MyPosts>
        <St.MyPosts>
          <St.MyPostImg>Img</St.MyPostImg>
          <St.MyPostText>text text</St.MyPostText>
        </St.MyPosts>
      </St.MyPostsWrapper>
    </div>
  );
};

export default MyPosts;
