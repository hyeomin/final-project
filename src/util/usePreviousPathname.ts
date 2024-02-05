import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function usePreviousPathname() {
  const { pathname } = useLocation();
  const [prevPathname, setPrevPathname] = useState('');

  useEffect(() => {
    setPrevPathname(pathname);
  }, []);

  return prevPathname;
}

export default usePreviousPathname;
