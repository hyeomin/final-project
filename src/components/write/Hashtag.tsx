import { useState } from 'react';
import { GoPlus, GoSearch, GoX } from 'react-icons/go';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { postInputState } from '../../recoil/posts';
import theme from '../../styles/theme';
import { commonHashtagsList } from './common/Lists';

function Hashtag() {
  const HASHTAG = 'hashtag';

  const [postInput, setPostInput] = useRecoilState(postInputState);
  const { hashtags } = postInput;

  const [commonHashtags, setCommonHashtags] = useState(commonHashtagsList);
  const [currentHashtag, setCurrentHashtag] = useState('');

  // 새로운 해시태그 추가
  const onHashtagChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newHashtag = event.target.value;
    setCurrentHashtag(newHashtag);
  };

  // 엔터 누르면 해시태그 추가
  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && currentHashtag.length > 1) {
      onHandleSelectHashtag(currentHashtag);
    }
  };

  // 선택된 해시태그 색깔 변경
  const onHandleSelectHashtag = (newHashtag: string) => {
    setPostInput({ ...postInput, hashtags: [...hashtags, newHashtag] });
    if (commonHashtags.includes(newHashtag)) {
      setCommonHashtags(commonHashtags.filter((tag) => tag !== newHashtag));
    }
  };

  // 해시태그 삭제
  const removeHashtag = (tagToRemove: string) => {
    setPostInput({ ...postInput, hashtags: hashtags.filter((tag) => tag !== tagToRemove) });
  };

  return (
    <HashtagArea>
      <h5>자주 사용된 해시태그입니다. 해시태그를 추가해보세요!</h5>
      <RecommendedTags>
        {commonHashtags.map((hashtag, idx) => {
          return (
            <SingleHashtag key={idx} onClick={() => onHandleSelectHashtag(hashtag)}>
              {hashtag}
              <GoPlus />
            </SingleHashtag>
          );
        })}
      </RecommendedTags>
      <SelectedTagList>
        {hashtags.map((tag, idx) => (
          <SingleHashtag key={idx} onClick={() => removeHashtag(tag)}>
            {tag}
            <GoX />
          </SingleHashtag>
        ))}
      </SelectedTagList>
      <HashtagInputContainer>
        <input
          name={HASHTAG}
          value={currentHashtag}
          onChange={onHashtagChangeHandler}
          onKeyPress={onKeyPressHandler}
          placeholder="해시태그 + Enter"
        />
        <SearchIcon>
          <GoSearch />
        </SearchIcon>
      </HashtagInputContainer>
    </HashtagArea>
  );
}

export default Hashtag;

const HashtagArea = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 10px;

  & h5 {
    padding: 5px 0;
  }
`;

const RecommendedTags = styled.div`
  display: flex;
  column-gap: 10px;
  font-size: 16px;
`;

const SingleHashtag = styled.span`
  display: flex;
  justify-content: center;
  column-gap: 5px;

  background-color: ${theme.color.mangoLight};
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 5px 8px;
  font-size: 14px;
  color: #444;

  &:hover {
    cursor: pointer;
    border: 1px solid ${theme.color.mangoMain};
  }
`;

const HashtagInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  border: 1px solid ${theme.color.mangoMain};

  font-size: 14px;
  column-gap: 10px;
  overflow: hidden;

  & input {
    display: flex;
    border-radius: 10px;
    width: 100%;
    height: 35px;
    padding: 0 20px;
    border: none;
  }
`;

const SearchIcon = styled.div`
  padding: 0 20px;
  border-left: 1px solid ${theme.color.lightgray};
`;

const SelectedTagList = styled.div`
  display: flex;
  column-gap: 10px;

  & span {
    border: 1px solid ${theme.color.mangoMain};
  }
`;
