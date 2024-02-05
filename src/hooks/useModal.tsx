import { createContext, useContext, useState } from 'react';
import Modal from '../components/modal/Modal';

// const { title, message, btnMsg, btnType, btnMsg2, btnType2 } = useModal;

type ModalContextValue = {
  open: (params: OpenModalParams) => void;
  close: () => void;
};

export type OpenModalParams = {
  title: string;
  message?: string;
  leftButtonLabel?: string;
  onClickLeftButton?: () => void;
  rightButtonLabel?: string;
  onClickRightButton?: () => void;
};

const initialValue: ModalContextValue = {
  open: () => {},
  close: () => {}
};

const ModalContext = createContext(initialValue);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalElement, setModalElement] = useState<React.ReactNode>(null);

  const open = (params: OpenModalParams) => {
    setModalElement(<Modal {...params} />);
  };

  const close = () => setModalElement(null);

  const modal: ModalContextValue = {
    open,
    close
  };

  return (
    <ModalContext.Provider value={modal}>
      {children}
      {modalElement}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
