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
import { useContext } from 'react';
import Loader from '../src/components/common/Loader';
import { AuthContext } from '../src/context/AuthContext';
import './App.css';
import Router from './shared/Router';

function App() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { init } = authContext;
  return <>{init ? <Router /> : <Loader />}</>;
}

export default App;
