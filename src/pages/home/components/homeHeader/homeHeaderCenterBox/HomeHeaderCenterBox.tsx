import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { SwiperClass } from 'swiper/react';
import useSwiperNavigation from '../../../../../hooks/useSwiperNavigation';
import { PostType } from '../../../../../types/PostType';
import St from './style';

type Props = {
  swiperInstance: SwiperClass | null;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  adminContents: PostType[] | undefined;
};

function HomeHeaderCenterBox({ swiperInstance, currentIndex, setCurrentIndex, adminContents }: Props) {
  const { goNext, goPrev } = useSwiperNavigation({
    swiperInstance,
    currentIndex,
    setCurrentIndex,
    maxIndex: adminContents ? adminContents?.length - 1 : 0
  });

  const postId = adminContents && adminContents[currentIndex] ? adminContents[currentIndex].id : null;

  return (
    <St.HeaderMain>
      <St.HeaderInfo>
        <St.HeaderText>
          <div>
            <h2>오늘의 친환경</h2>
            <h1>망고 라이프스타일</h1>
          </div>
          {adminContents ? (
            <p>{adminContents[currentIndex].title}</p>
          ) : (
            <p>
              더는 지켜만 볼 수 없어요! <br />
              우리 같이 건강한 환경 만들기 챌린지에 도전해봐요.
            </p>
          )}
        </St.HeaderText>
        <St.ButtonContainer>
          <St.FlexBox>
            <St.DetailLink to={`/detail/${postId}`}>
              <p>자세히 보기</p>
            </St.DetailLink>
            <St.NavButtonContainer>
              <St.NavButton onClick={goPrev}>
                <GoChevronLeft />
              </St.NavButton>
              <span>{`${currentIndex + 1} / ${adminContents?.length}`}</span>
              <St.NavButton onClick={goNext}>
                <GoChevronRight />
              </St.NavButton>
            </St.NavButtonContainer>
          </St.FlexBox>
        </St.ButtonContainer>
      </St.HeaderInfo>
    </St.HeaderMain>
  );
}

export default HomeHeaderCenterBox;
