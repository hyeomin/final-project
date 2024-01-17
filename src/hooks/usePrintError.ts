import { useCallback, useState } from 'react';

// const 임시함수 = (): [string, () => void] => {
//   const 내부함수 = () => {};
//   return ['1', 내부함수];
// };

// const [문자열, 함수] = 임시함수(); // ['1', 내부함수];

const usePrintError = (error: any): [string, (error: any) => void] => {
  const [errMsg, setErrMsg] = useState('');

  const printErr = useCallback((error: any) => {
    if (error.code === 'auth/email-already-in-use') {
      return setErrMsg('이미 사용하는 이메일입니다.');
    }
    // switch (error.code) {
    //   case 'auth/user-not-found':
    //     return setErrMsg('이메일이 일치하지 않습니다.');
    //   case 'auth/wrong-password':
    //     return setErrMsg('비밀번호가 일치하지 않습니다.');
    //   case 'auth/email-already-in-use':
    //     return setErrMsg('이미 사용 중인 이메일이긴 한데 .. 암튼 테스트.');
    //   case 'auth/weak-password':
    //     return setErrMsg('비밀번호를 6자 이상 입력해주세요');
    //   case 'auth/missing-password':
    //     return setErrMsg('비밀번호가 틀립니다.');
    //   case 'auth/invalid-email':
    //     return setErrMsg('유효하지 않은 이메일 입니다.');
    //   case 'auth/admin-restricted-operation':
    //     return setErrMsg('필수입력 사항을 작성해주세요.');
    //   case 'auth/internal-error':
    //     return setErrMsg('잘못된 요청입니다.');
    //   case 'auth/network-request-failed':
    //     return setErrMsg('네트워크 연결에 실패 하였습니다.');
    //   case 'auth/email-already-exists':
    //     return setErrMsg('제공된 이메일을 기존 사용자가 이미 사용 중입니다.');
    //   // 비밀번호 input 과 비밀번호 확인 input 의 값이 다를경우 출력하는 오류
    //   case '비밀번호가 일치하지 않습니다.':
    //     return setErrMsg('비밀번호가 일치하지 않습니다.');
    //   default:
    //     console.log('New Error code:', error.code);
    //     setErrMsg('');
    // }
  }, []);
  return [errMsg, printErr];
};

export default usePrintError;
