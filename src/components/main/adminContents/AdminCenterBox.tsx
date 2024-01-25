import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SwiperClass } from 'swiper/react';
import useSwiperNavigation from '../../../hooks/useSwiperNavigation';
import theme from '../../../styles/theme';
import { PostType } from '../../../types/PostType';

type Props = {
  swiperInstance: SwiperClass | null;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  adminContents: PostType[] | undefined;
};

function AdminCenterBox({ swiperInstance, currentIndex, setCurrentIndex, adminContents }: Props) {
  const { goNext, goPrev } = useSwiperNavigation({
    swiperInstance,
    currentIndex,
    setCurrentIndex,
    maxIndex: adminContents ? adminContents?.length - 1 : 0
  });

  const postId = adminContents && adminContents[currentIndex] ? adminContents[currentIndex].id : null;

  return (
    <HeaderMain>
      <HeaderInfo>
        <HeaderText>
          <div>
            <h2>나부터 먼저!</h2>
            <h1>친환경 생활습관</h1>
          </div>
          <p>
            더는 지켜만 볼 수 없어요! <br />
            우리 같이 건강한 환경 만들기 챌린지에 도전해봐요.
          </p>
        </HeaderText>
        <ButtonContainer>
          <FlexBox>
            <DetailLinkWrapper>
              <Link to={`/detail/${postId}`}>자세히 보기</Link>
            </DetailLinkWrapper>
            <NavButtonContainer>
              <NavButton onClick={goPrev} disabled={currentIndex === 0}>
                <GoChevronLeft />
              </NavButton>
              <span>{`${currentIndex + 1} / ${adminContents?.length}`}</span>
              <NavButton onClick={goNext} disabled={currentIndex + 1 === adminContents?.length}>
                <GoChevronRight />
              </NavButton>
            </NavButtonContainer>
          </FlexBox>
        </ButtonContainer>
      </HeaderInfo>
    </HeaderMain>
  );
}

export default AdminCenterBox;

const HeaderMain = styled.section`
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  padding: 90px 150px;

  display: flex;
  align-items: end;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  & div {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    & h1 {
      font-size: 36px;
      font-weight: 700;
    }

    & h2 {
      font-size: 24px;
    }
  }

  & p {
    font-size: 17px;
    line-height: normal;
  }
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  row-gap: 40px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  align-items: center;
  flex-shrink: 1;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 40px;
`;

const DetailLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  width: 170px;
  height: 45px;
  border-radius: 10px;
  background-color: #11111174;
  /* background-color: ${theme.color.mangoMain}
  opacity: 80%; */
  color: white;

  &:hover {
    cursor: pointer;
    background-color: #00000099;
  }
`;

const NavButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 25px;

  color: white;
  border: none;
  background-color: #11111174;

  &:hover {
    cursor: pointer;
    background-color: #00000099;
  }
`;
