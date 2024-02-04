import styled from 'styled-components';
import theme from '../../styles/theme';

const CommunityContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;

  //모바일 세로
  @media screen and (max-width: 431px) {
    width: 100%;
  }
`;

const CommunityNavBar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 50px 30px;

  @media screen and (max-width: 431px) {
    flex-direction: column;
    padding: 20px 0;
    row-gap: 15px;
  }
`;

const CategoryButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 50px;

  @media screen and (max-width: 431px) {
    width: 100%;
    padding: 0 20px;
    column-gap: 20px;
    border-bottom: 1px solid ${theme.color.lightgray};
    justify-content: start;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    // 스크롤바 숨기기
    &::-webkit-scrollbar {
      display: none;
    }

    // 기타 브라우저에 스크롤바 없애기
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const CategoryButton = styled.button<{ selected: boolean }>`
  font-size: 17px;
  font-weight: ${({ selected }) => (selected ? 800 : 400)};
  color: ${({ selected }) => (selected ? '#222' : '#888')};
  border: none;
  border-bottom: ${({ selected }) => (selected ? '2px solid #ffa114' : 'none')};
  outline: none;
  cursor: pointer;
  background-color: transparent;

  @media screen and (max-width: 431px) {
    font-size: 14px;
    padding: 5px 0;
  }
`;

const SortingWrapper = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 20px;

  li {
    text-decoration: none;

    color: #888;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
  }
  li.selected {
    font-weight: 700;
    color: #222;
  }

  span {
    color: #999;
  }

  @media screen and (max-width: 431px) {
    width: 100%;
    gap: 10px;
    padding: 0 10px;

    & li {
      font-size: 13px;
    }
  }
`;

export default { CommunityContainer, CommunityNavBar, CategoryButtonWrapper, CategoryButton, SortingWrapper };
