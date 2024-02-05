import St from './style';

function AboutHeader() {
  return (
    <St.Header>
      <St.VideoWrapper muted autoPlay loop playsInline>
        <source src={process.env.PUBLIC_URL + '/video/about-cover-video.webm'} type="video/webm" />
      </St.VideoWrapper>
      <St.Title>
        <h5>WHY MANGO?</h5>
        <p>⌄</p>
      </St.Title>
    </St.Header>
  );
}

export default AboutHeader;
