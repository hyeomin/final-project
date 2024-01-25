type Props = {
  title: string;
  detailURL: string;
  imageUrl: string;
  description: string;
};

const useKaKaoShare = () => {
  const handleShareKakaoClick = ({ title, detailURL, imageUrl, description }: Props) => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description,
          imageUrl,
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
