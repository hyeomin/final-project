import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { publicModalState } from '../recoil/useModal';

function usePublicHook() {
  const [publicModal, setPublicModal] = useRecoilState(publicModalState);
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
  };
  return { handleCommit, handleExit, handleMoveAuth };
}

export default usePublicHook;
