import styled from 'styled-components';
import CS from './CommonStyle';

function Detail() {
  return (
    <CS.FullContainer>
      <PostContainer>
        <CoverImageContainer>
          <div>{/* <img src={} /> */}</div>
          <div>
            <button>prev</button>
            <button>next</button>
          </div>
        </CoverImageContainer>
        <div>
          <h3>Title</h3>
        </div>
        <div>Content</div>
      </PostContainer>
    </CS.FullContainer>
  );
}

export default Detail;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  & div {
    background-color: pink;
  }
`;

const CoverImageContainer = styled.div`
  display: flex;
  position: relative;

  background-color: pink;

  & div {
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 100%;

    background-color: lightblue;
  }
`;
