import { useCallback, useState } from 'react';

// const 임시함수 = (): [string, () => void] => {
//   const 내부함수 = () => {};
//   return ['1', 내부함수];
// };

// const [문자열, 함수] = 임시함수(); // ['1', 내부함수];

const usePrintError = (error: any): [string, (error: any) => void] => {
  const [errMsg, setErrMsg] = useState(error);

  const printErr = useCallback((error: any) => {
    // if (error.code === 'auth/email-already-in-use') {
    //   return setErrMsg('이미 사용하는 이메일입니다.');
    // }
    switch (error.code) {
      case 'auth/user-not-found':
        return setErrMsg('이메일이 일치하지 않습니다.');
      case 'auth/wrong-password':
        return setErrMsg('비밀번호가 일치하지 않습니다.');
      case 'auth/email-already-in-use':
        return setErrMsg('이미 사용 중인 이메일입니다.');
      case 'auth/weak-password':
        return setErrMsg('비밀번호를 6자 이상 입력해주세요');
      case 'auth/missing-password':
        return setErrMsg('비밀번호가 틀립니다.');
      case 'auth/invalid-email':
        return setErrMsg('유효하지 않은 이메일 입니다.');
      case 'auth/too-many-requests':
        return setErrMsg('너무 많은 요청을 보냈습니다. 잠시 후 다시 시도하세요.');
      case 'auth/internal-error':
        return setErrMsg('잘못된 요청입니다.');
      case 'auth/invalid-credential':
        return setErrMsg('이메일 또는 비밀번호가 일치하지 않습니다');
      case 'auth/network-request-failed':
        return setErrMsg('네트워크 연결에 실패 하였습니다.');
      case 'auth/email-already-exists':
        return setErrMsg('제공된 이메일을 기존 사용자가 이미 사용 중입니다.');
      // 비밀번호 input 과 비밀번호 확인 input 의 값이 다를경우 출력하는 오류
      case 'auth/wrong-password':
        return setErrMsg('비밀번호가 일치하지 않습니다.');
      default:
        //console.log('New Error code:', error.code);
        setErrMsg(error.code);
    }
  }, []);
  return [errMsg, printErr];
};

export default usePrintError;
