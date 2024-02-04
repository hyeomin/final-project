import styled from 'styled-components';
import theme from '../../../styles/theme';

const PostListContainer = styled.div`
  width: 100%;
  min-height: 1000px;
`;

export const PostContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;

  @media screen and (max-width: 431px) {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`;

export const SinglePost = styled.div`
  display: flex;
  flex-direction: column;
  height: 380px;
  border-radius: 10px;
  border: 1px solid ${theme.color.lightgray};
  background: white;
  overflow: hidden;

  @media screen and (max-width: 431px) {
    height: 320px;
  }
`;

export const PostImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 50%;
  cursor: pointer;
`;

export const PostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  row-gap: 15px;
  padding: 15px;
  font-size: 16px;

  @media screen and (max-width: 431px) {
    padding: 12px;
    row-gap: 10px;
    font-size: 14px;
  }
`;

export const PostCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & div {
    display: flex;
    column-gap: 15px;
    justify-content: center;
  }

  @media screen and (max-width: 431px) {
    & div {
      column-gap: 10px;
    }
  }
`;

// 작성자 프로필 + 날짜
export const PostCardHeaderLeft = styled.div`
  img {
    width: 30px; //HM 40 > 35 변경
    height: 30px; //HM 40 > 35 변경!
    border-radius: 50%;
  }

  @media screen and (max-width: 431px) {
    img {
      width: 25px;
      height: 25px;
    }
  }
`;

export const AuthorNameAndDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 5px;

  span {
    font-weight: bold;
    font-size: 14px; // HM 망고망 16px
  }

  p {
    color: #bbb; // #222222에서 변경
    font-size: 12px;
    font-weight: 400;
  }

  @media screen and (max-width: 431px) {
    span {
      font-size: 12px; // HM 망고망 16px
      text-align: start;
    }
    p {
      font-size: 11px;
      text-align: start;
    }
  }
`;

// export const AuthorProfileImg = styled.img`
//   width: 30px; //HM 40 > 35 변경
//   height: 30px; //HM 40 > 35 변경!
//   border-radius: 50%;

//   @media screen and (max-width: 431px) {
//     width: 25px;
//     height: 25px;
//   }
// `;

// export const PostCardHeaderTextRow = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: start;
//   row-gap: 5px;

//   & p {
//     font-weight: bold;
//     font-size: 14px; // HM 망고망 16px
//   }

//   span {
//     color: #bbb; // #222222에서 변경
//     font-size: 12px;
//     font-weight: 400;
//   }

//   @media screen and (max-width: 431px) {
//     & p {
//       font-size: 13px; // HM 망고망 16px
//       text-align: start;
//     }
//     span {
//       font-size: 11px;
//     }
//   }
// `;

export const PostTitleAndContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  flex: 1;
  row-gap: 15px;
  padding: 5px;
  line-height: normal;
  text-align: start;

  p {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: bold;
  }

  /* 아래 p에서 span으로 변경 */
  span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: normal;
    font-size: 14px;

    color: ${theme.color.gray};
  }

  @media screen and (max-width: 431px) {
    row-gap: 10px;

    p {
      font-size: 15px;
    }

    span {
      font-size: 13px;
    }
  }
`;

export const CommentAndLikes = styled.div`
  display: flex;
  justify-content: start;
  column-gap: 10px;
  color: ${theme.color.lightgray};
  font-size: 14px;
  & span {
    display: flex;
    column-gap: 3px;
  }
`;

export const HeartClickButton = styled.button<{ $isLiked: boolean }>`
  all: unset;
  color: ${({ $isLiked }) => ($isLiked ? '#FF0000' : theme.color.lightgray)};
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;

/*더보기*/

const MoreContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 40px;

  button {
    //sh
    width: 170px;
    height: 35px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #ffa114;
    border: none;

    color: #fff;
    text-align: center;
    font-size: 16px;
    font-weight: 400;

    &:hover {
      background: #df8d11;
      cursor: pointer;
    }
  }
`;

export default { PostListContainer, MoreContentWrapper };
