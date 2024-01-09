import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { hashtagState } from '../../recoil/posts';

function Hashtag() {
  const HASHTAG = 'hashtag';
  const [hashtags, setHashtags] = useRecoilState(hashtagState);
  const [currentHashtag, setCurrentHashtag] = useState('');

  const onHashtagChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newHashtag = event.target.value;

    if (!newHashtag.startsWith('#')) {
      newHashtag = '#' + newHashtag;
    }
    setCurrentHashtag(newHashtag);
  };

  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && currentHashtag.length > 1) {
      setHashtags([...hashtags, currentHashtag]);
      setCurrentHashtag('#');
    }
  };

  const removeHashtag = (index: number) => {
    setHashtags(hashtags.filter((_, idx) => idx !== index));
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
