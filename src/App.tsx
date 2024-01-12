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
}

export default App;
