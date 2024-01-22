import { useState } from 'react';
import { GoPlus, GoSearch, GoX } from 'react-icons/go';
import { useRecoilState } from 'recoil';
import { postInputState } from '../../../recoil/posts';
import { commonHashtagsList } from '../common/lists';
import St from './style';

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
      setCurrentHashtag('');
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
    <St.HashtagArea>
      <h5>자주 사용된 해시태그입니다. 해시태그를 추가해보세요!</h5>
      <St.RecommendedTags>
        {commonHashtags.map((hashtag, idx) => {
          return (
            <St.SingleHashtag key={idx} onClick={() => onHandleSelectHashtag(hashtag)}>
              {hashtag}
              <GoPlus />
            </St.SingleHashtag>
          );
        })}
      </St.RecommendedTags>
      <St.SelectedTagList>
        {hashtags.map((tag, idx) => (
          <St.SingleHashtag key={idx} onClick={() => removeHashtag(tag)}>
            {tag}
            <GoX />
          </St.SingleHashtag>
        ))}
      </St.SelectedTagList>
      <St.HashtagInputContainer>
        <input
          name={HASHTAG}
          value={currentHashtag}
          onChange={onHashtagChangeHandler}
          onKeyPress={onKeyPressHandler}
          placeholder="해시태그 + Enter"
        />
        <St.SearchIcon>
          <GoSearch />
        </St.SearchIcon>
      </St.HashtagInputContainer>
    </St.HashtagArea>
  );
}

export default Hashtag;
