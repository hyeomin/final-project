import React from 'react';
import St from '../modal/style';
import { useRecoilValue } from 'recoil';
import usePublicHook from '../../../hooks/usePublicHook';
import { publicModalState } from '../../../recoil/useModal';

function Modal() {
  const useModal = useRecoilValue(publicModalState);
  const { title, message, btnMsg, btnType, btnMsg2, btnType2 } = useModal;

  const { handleCommit, handleExit, handleMoveAuth } = usePublicHook();
  const btnFn = btnType === 'exit' ? handleExit : null;
  let btnFn2;
  //const btnFn = btnType === 'continue' ? handleCommit : null;

  switch (btnType2) {
    case 'continue':
      btnFn2 = handleCommit;
      break;

    case 'moveAuth':
      btnFn2 = handleMoveAuth;
      break;

    default:
      btnFn2 = null;
  }

  return (
    <>
      <St.ScDiv>
        <St.ScDivContainer>
          <St.ScDivTitleAndContent>
            <h2>{title}</h2>
            <p>{message}</p>
          </St.ScDivTitleAndContent>
          <St.ScDivButton>
            {btnMsg && (
              <St.ScButtonFirst onClick={btnFn as React.MouseEventHandler<HTMLButtonElement>}>
                {btnMsg}{' '}
              </St.ScButtonFirst>
            )}
            {btnMsg2 && (
              <St.ScButtonSecond onClick={btnFn2 as React.MouseEventHandler<HTMLButtonElement>}>
                {btnMsg2}{' '}
              </St.ScButtonSecond>
            )}
          </St.ScDivButton>
        </St.ScDivContainer>
      </St.ScDiv>
    </>
  );
}

export default Modal;
