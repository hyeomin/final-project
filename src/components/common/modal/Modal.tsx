import React from 'react';
import St from '../modal/style';
import { useRecoilValue } from 'recoil';
import usePublicHook from '../../../hooks/usePublicHook';
import { OpenModalParams } from '../../../hooks/useModal';
import { publicModalState } from '../../../recoil/useModal';

type ModalProps = Exclude<OpenModalParams, 'closeButton'>;

function Modal(props: ModalProps) {
  const { title, message, leftButtonLabel, onClickLeftButton, rightButtonLabel, onClickRightButton } = props;

  // const { handleCommit, handleExit, handleMoveAuth, handleconfirm, handleCancel } = usePublicHook();

  //const btnFn = btnType === 'continue' ? handleCommit : null;
  // switch (btnType) {
  //   case 'exit':
  //     btnFn = handleExit;
  //     break;

  //   case 'cancel':
  //     btnFn = handleCancel;
  //     break;
  //   default:
  //     btnFn = null;
  // }

  // switch (btnType2) {
  //   case 'continue':
  //     btnFn2 = handleCommit;
  //     break;

  //   case 'moveAuth':
  //     btnFn2 = handleMoveAuth;
  //     break;

  //   case 'confirm':
  //     btnFn2 = handleconfirm;
  //     break;

  //   default:
  //     btnFn2 = null;
  // }

  return (
    <>
      <St.ScDiv>
        <St.ScDivContainer>
          <St.ScDivTitleAndContent>
            <h2>{title}</h2>
            <p>{message}</p>
          </St.ScDivTitleAndContent>

          <St.ScDivButton>
            {leftButtonLabel && <St.ScButtonFirst onClick={onClickLeftButton}>{leftButtonLabel}</St.ScButtonFirst>}
            {rightButtonLabel && <St.ScButtonSecond onClick={onClickRightButton}>{rightButtonLabel}</St.ScButtonSecond>}
          </St.ScDivButton>
        </St.ScDivContainer>
      </St.ScDiv>
    </>
  );
}

export default Modal;
