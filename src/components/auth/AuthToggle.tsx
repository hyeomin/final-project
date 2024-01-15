import { GoPencil } from 'react-icons/go';
import styled from 'styled-components';
import defaultImg from '../../assets/defaultImg.jpg';
import { auth } from '../../shared/firebase';

function AuthToggle() {
  return (
    <ToggleContainer>
      <ToggleBox>
        <span>{auth.currentUser?.email}</span>
        <ProfileImageContainer>
          <img src={auth.currentUser?.photoURL ?? defaultImg} alt="profile" />
          <PenWrapper>
            <GoPencil />
          </PenWrapper>
        </ProfileImageContainer>
        <span>{`안녕하세요 ${auth.currentUser?.displayName}님`}</span>
        <div>
          <button>마이페이지</button>
          <button>로그아웃</button>
        </div>
      </ToggleBox>
    </ToggleContainer>
  );
}

export default AuthToggle;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: end;
  padding: 0 120px;
  background-color: pink;
`;

const ToggleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  width: 240px;
  height: 260px;
  background-color: #d9d9d9;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  width: 120px;
  height: 120px;
  background-color: white;
  position: relative;

  & img {
  }
`;

const PenWrapper = styled.div`
  position: absolute;
  width: 20px;
  right: 5px;
`;
