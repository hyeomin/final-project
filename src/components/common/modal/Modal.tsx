import React from 'react';
import St from '../modal/style';
import { useRecoilValue } from 'recoil';
import { OpenModalParams } from '../../../hooks/useModal';

type ModalProps = Exclude<OpenModalParams, 'closeButton'>;

function Modal(props: ModalProps) {
  const { title, message, leftButtonLabel, onClickLeftButton, rightButtonLabel, onClickRightButton } = props;

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
