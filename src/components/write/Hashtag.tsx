import { useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { IsEditingProps } from '../../pages/Write';
import { hashtagsListState, postState } from '../../recoil/posts';
import theme from '../../styles/theme';

function Hashtag({ foundPost, isEditing }: IsEditingProps) {
  const HASHTAG = 'hashtag';

  const [post, setPost] = useRecoilState(postState);
  const { hashtags } = post;

  const [hashtagList, setHashtagList] = useRecoilState(hashtagsListState);
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

  const onHandleSelectHashtag = () => {};

  return (
    <HashtagArea>
      <RecommendedTags>
        <h5>자주 사용된 해시태그입니다. 해시태그를 추가해보세요!</h5>
        <div>
          {hashtagList.map((hashtag, idx) => {
            return (
              <SingleHashtag key={idx} onClick={() => onHandleSelectHashtag}>
                {hashtag}
                <GoPlus />
              </SingleHashtag>
            );
          })}
        </div>
      </RecommendedTags>
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
  row-gap: 20px;

  padding: 10px;
  background-color: pink;
`;

const RecommendedTags = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  font-size: 16px;
  background-color: lightblue;

  & div {
    display: flex;
    column-gap: 10px;
  }
`;

const SingleHashtag = styled.div`
  background-color: ${theme.color.mangoLight};
  border: none;
  border-radius: 5px;
  padding: 5px;
`;

const HashtagInputContainer = styled.div`
  display: flex;
  font-size: 14px;
  column-gap: 10px;
  & input {
    display: flex;
    width: 100%;
  }
`;

const SelectedTagList = styled.div`
  background-color: lightblue;
`;
