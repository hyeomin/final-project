import styled from 'styled-components';
import theme from 'styles/theme';

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
  font-size: 16px;
  flex-wrap: wrap;
  gap: 10px;
`;

const SingleHashtag = styled.span`
  display: flex;
  flex-shrink: 0;
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

const SelectedTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  & span {
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

export default { HashtagArea, RecommendedTags, SingleHashtag, HashtagInputContainer, SearchIcon, SelectedTagList };
