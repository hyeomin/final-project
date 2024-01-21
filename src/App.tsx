import { useContext } from 'react';
import Loader from '../src/components/common/Loader';
import { AuthContext } from '../src/context/AuthContext';
import './App.css';
import Router from './shared/Router';

function App() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Loader />;
  }

  const { init } = authContext;
  return <>{init ? <Router /> : <Loader />}</>;
}

export default App;
