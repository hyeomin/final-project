import React from 'react';
import St from '../modal/style';
import { useRecoilValue } from 'recoil';
import { publicModal } from '../../../recoil/useModal';

function Modal() {
  const useModal = useRecoilValue(publicModal);
  const { title, message, btnMsg, btnType, btnMsg2, btnType2 } = useModal;

  // const { handleContinueWriting, handleExit } = PublicHook();
  // const btnFn = btnType === 'continue' ? handleContinueWriting : null;
  // const btnFn2 = btnType2 === 'exit' ? handleExit : null;

  return (
    <>
      <St.ScDiv>
        <St.ScDivContainer>
          <St.ScDivTitleAndContent>
            <h2>{title}</h2>
            <p>{message}</p>
          </St.ScDivTitleAndContent>
          <St.ScDivButton>
            {/* {btnMsg && <St.ScButtonFirst onClick={btnFn}>{btnMsg} </St.ScButtonFirst>}
            {btnMsg2 && <St.ScButtonSecond onClick={btnFn2}>{btnMsg2} </St.ScButtonSecond>} */}
          </St.ScDivButton>
        </St.ScDivContainer>
      </St.ScDiv>
    </>
  );
}

export default Modal;
