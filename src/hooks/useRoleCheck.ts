import { useQuery } from '@tanstack/react-query';
import { getUser } from 'api/authApi';
import { QUERY_KEYS } from 'query/keys';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { roleState } from 'recoil/users';
import { auth } from 'shared/firebase';
import { UserType } from 'types/UserType';

function useRoleCheck() {
  const [role, setRole] = useRecoilState(roleState);

  // role이 비어있는 경우 다시 넣기
  const {
    data: user,
    refetch,
    error
  } = useQuery<UserType | undefined>({
    queryKey: [QUERY_KEYS.USERS, auth.currentUser?.uid],
    queryFn: () => getUser(auth.currentUser?.uid!),
    enabled: !!auth.currentUser && role === ''
  });

  if (error) {
    console.log('특정 유저 가져오기 실패(useRoleCheck)', error);
  }

  useEffect(() => {
    if (!!auth.currentUser && role === '') {
      refetch();
    }
    if (user) {
      setRole(user.role);
    }
  }, [user, auth]);

  // role 돌려주기
  return role;
}

export default useRoleCheck;
