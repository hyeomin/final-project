import { useEffect } from 'react';
const mangoCover1 = `${process.env.PUBLIC_URL}/logo192.png`;
// kakao 기능 동작을 위해 넣어준다.
//index.d.ts에 타입 선언함
const { Kakao } = window;

const useKaKaoShare = () => {
  // 배포한 자신의 사이트
  //const realUrl = 'https://final-project-nine-bice.vercel.app/';
  const realUrl = 'https://localhost:3000';
  // 로컬 주소 (localhost 3000 같은거)
  const resultUrl = window.location.href;

  // 재랜더링시에 실행되게 해준다.
  useEffect(() => {
    // init 해주기 전에 clean up 을 해준다.

    window.Kakao.cleanup();
    window.Kakao.init(`${process.env.REACT_APP_KAKAO_API_KEY}`);
    // 잘 적용되면 true 를 뱉는다.
    console.log(window.Kakao.isInitialized());
  }, []);

  const handleShareKakaoClick = (title: string) => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description: '망고망고',
          imageUrl: process.env.PUBLIC_URL + '/logo192.png',
          link: {
            mobileWebUrl: realUrl
          }
        },
        buttons: [
          {
            title: '보러 가기',
            link: {
              mobileWebUrl: realUrl
            }
          }
        ]
      });
    }
  };
  return { handleShareKakaoClick };
};

export default useKaKaoShare;
