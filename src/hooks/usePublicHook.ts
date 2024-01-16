import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { buttonClickedState, editingCommentIdState, editingTextState, publicModalState } from '../recoil/useModal';
import { isSignUpState } from '../recoil/users';

function usePublicHook() {
  const [publicModal, setPublicModal] = useRecoilState(publicModalState);
  const [isSignUp, setIsSignUp] = useRecoilState(isSignUpState);
  const [editingText, setEditingText] = useRecoilState(editingTextState);
  //const setEditingText = useSetRecoilState(editingTextState);
  const [editingCommentId, setEditingCommentId] = useRecoilState<string>(editingCommentIdState);
  const [buttonClicked, setButtonClicked] = useRecoilState(buttonClickedState);
  const navigate = useNavigate();

  const handleCommit = () => {
    setPublicModal({ ...publicModal, isUse: false });
  };

  const handleExit = () => {
    setPublicModal({ ...publicModal, isUse: false });
    navigate('/');
  };

  //Navbar: 글쓰기 > auth 이동
  const handleMoveAuth = () => {
    setPublicModal({ ...publicModal, isUse: false });
    navigate('/auth');
    setIsSignUp(false);
  };

  //확인
  const handleconfirm = () => {
    setButtonClicked(true);
    console.log('확인버튼 누름'); //2
    setPublicModal({ ...publicModal, isUse: false });
  };

  //취소
  const handleCancel = () => {
    setButtonClicked(false);
    console.log('취소버튼 누름');
    setEditingCommentId('');
    setPublicModal({ ...publicModal, isUse: false });
  };

  return {
    handleCommit,
    handleExit,
    handleMoveAuth,
    handleconfirm,
    handleCancel
  };
}

export default usePublicHook;
