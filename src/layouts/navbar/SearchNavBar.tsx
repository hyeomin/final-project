import React from 'react';
import styled from 'styled-components';
type Props = {
  isSearchToggleOpen: boolean;
};
function SearchNavBar({ isSearchToggleOpen }: Props) {
  return (
    <SearchLayout isOpen={isSearchToggleOpen}>
      <SearchWrapper>
        <SearchPart>
          <SearchInputDiv>
            <input type="search" placeholder="검색어를 입력해주세요." autoComplete="off"></input>
          </SearchInputDiv>
          <SearchTagsPart>
            <h3>태그로 찾기</h3>
            <SearchTags>
              <a href="#">친환경</a>
            </SearchTags>
          </SearchTagsPart>
        </SearchPart>
      </SearchWrapper>
    </SearchLayout>
  );
}

const SearchLayout = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => (props.isOpen ? '100%' : '0')};
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  overflow: hidden;
  z-index: 100;
  transition: 0.4s ease height, 0.4s ease top, 0.2s ease opacity;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: ${(props) => (props.isOpen ? 'block' : 'none')}; /* isOpen 상태에 따라 표시 여부 설정 */
    transition: 0.3s ease opacity;
    transition-delay: ${(props) => (props.isOpen ? '0.4s' : '0s')}; /* isOpen 상태에 따라 지연 시간 설정 */
    z-index: 99;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 100%;
  padding: 8rem 2rem;
  background-color: #fff;
  display: flex;
  z-index: 2;
  transition: 0.4s ease height, 0.4s ease top, 0.2s ease opacity;
`;

const SearchPart = styled.div`
  max-width: 94rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: #fff; /* 배경색을 하얀색으로 설정 */
  z-index: 1;
  //opacity: 0;
  // transform: translateY(-5rem);
  transition: 0.3s ease opacity, 0.3s ease transform;
  transition-delay: 0.3s;
`;

const SearchTagsPart = styled.div``;
const SearchTags = styled.div``;

const SearchInputDiv = styled.div``;

export default SearchNavBar;
