import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { IsEditingProps } from '../../pages/Write';
import { postState } from '../../recoil/posts';

function Hashtag({ foundPost, isEditing }: IsEditingProps) {
  const HASHTAG = 'hashtag';
  const [post, setPost] = useRecoilState(postState);
  const { hashtags } = post;
  const [currentHashtag, setCurrentHashtag] = useState('');

  // 수정 중이면 수정 중인 글의 해시태그로 업데이트
  useEffect(() => {
    if (foundPost?.hashtag) {
      setPost({ ...post, hashtags: foundPost?.hashtag });
    }
  }, [isEditing, foundPost, post, setPost]);

  // 새로운 해시태그 추가
  const onHashtagChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newHashtag = event.target.value;

    if (!newHashtag.startsWith('#')) {
      newHashtag = '#' + newHashtag;
    }
    setCurrentHashtag(newHashtag);
  };

  // 엔터 누르면 해시태그 추가
  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && currentHashtag.length > 1) {
      setPost({ ...post, hashtags: [...hashtags, currentHashtag] });
      setCurrentHashtag('#');
    }
  };

  // 해시태그 삭제
  const removeHashtag = (index: number) => {
    setPost({ ...post, hashtags: hashtags.filter((_, idx) => idx !== index) });
  };

  return (
    <HashtagArea>
      <RecommendedTags>추천 해시태그</RecommendedTags>
      <HashtagInputContainer>
        <input
          name={HASHTAG}
          value={currentHashtag}
          onChange={onHashtagChangeHandler}
          onKeyPress={onKeyPressHandler}
          placeholder="해시태그 + Enter"
        />
      </HashtagInputContainer>
      <SelectedTagList>
        {hashtags.map((tag, index) => (
          <span key={index}>
            {tag} <button onClick={() => removeHashtag(index)}>x</button>
          </span>
        ))}
      </SelectedTagList>
    </HashtagArea>
  );
}

export default Hashtag;

const HashtagArea = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  padding: 10px;
  background-color: pink;
`;

const RecommendedTags = styled.div`
  background-color: lightblue;
`;

const HashtagInputContainer = styled.div`
  display: flex;
  column-gap: 10px;
  & input {
    display: flex;
    width: 100%;
  }
`;

const SelectedTagList = styled.div`
  background-color: lightblue;
`;
