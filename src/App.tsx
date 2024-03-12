import { useContext } from 'react';
import './App.css';
import { AuthContext } from 'context/AuthContext';
import Loader from 'components/Loader';
import Router from 'shared/Router';

function App() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Loader />;
  }
  const { init } = authContext;
  return <>{init ? <Router /> : <Loader />}</>;
}

export default App;
