import { atom } from 'recoil';
import { MODAL_STATE } from './keys';

const modalState = atom({
  key: MODAL_STATE.IS_MODAL_OPEN,
  default: {
    isModalOpen01: false,
    isModalOpen02: false,
    isModalOpen03: false,
    isModalOpen04: false,
    isModalOpen05: false,
    isModalOpen06: false,
    isModalOpen07: false,
    isModalOpen08: false
  }
});

export { modalState };
