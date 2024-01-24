const useKaKaoShare = () => {
  const handleShareKakaoClick = (title: string, detailURL: string) => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description: '망고망고',
          imageUrl: 'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
          link: {
            mobileWebUrl: detailURL
          }
        },
        buttons: [
          {
            title: '보러 가기',
            link: {
              mobileWebUrl: detailURL
            }
          }
        ]
      });
    }
  };
  return { handleShareKakaoClick };
};

export default useKaKaoShare;
