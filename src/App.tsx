<<<<<<< HEAD
import './App.css';
import Router from './shared/Router';

function App() {
  //   //회원가입
  //   useEffect(() => {
  //     //로그인이 되면 사용자의 정보를 가지고 온다
  //     onAuthStateChanged(auth, (user) => {
  //       // console.log('user', user?.photoURL);
  //     });
  //   }, []);

  return (
    <div>
      <Router />
    </div>
  );
=======
// import './App.css';
// import Router from './shared/Router';
// import Loader from '../src/components/common/Loader';
// import { AuthContext } from '../src/context/AuthContext';
// import { useContext } from 'react';

// function App() {
//   const { init } = useContext(AuthContext);
//   return <>{init ? <Router /> : <Loader />}</>;
// }
// export default App;
import './App.css';
import Router from './shared/Router';
import Loader from '../src/components/common/Loader';
import { AuthContext } from '../src/context/AuthContext';
import { useContext } from 'react';

function App() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { init } = authContext;
  return <>{init ? <Router /> : <Loader />}</>;
>>>>>>> 5928473a4fe2abf4996f94a7a7637e36064df04a
}

export default App;
