import { useContext } from 'react';
import { AuthContext } from '../src/context/AuthContext';
import './App.css';
import Loader from './components/Loader';
import Router from './shared/Router';

function App() {
  // const authContext = useContext(AuthContext);

  // if (!authContext) {
  //   return <Loader />;
  // }

  // const { init } = authContext;
  // return <>{init ? <Router /> : <Loader />}</>;
  return (
    <>
      <Router />{' '}
    </>
  );
}

export default App;
