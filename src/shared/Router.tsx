import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Layout from '../layouts/Layout';
import About from '../pages/About';
import Auth from '../pages/Auth';
import Detail from '../pages/Detail';
import Home from '../pages/Home';
import MyPage from '../pages/MyPage';
import ViewAll from '../pages/ViewAll';
import Write from '../pages/Write';
import ProtectedRoute from './ProtectedRoute';
<<<<<<< HEAD
import SearchPage from '../pages/SearchPage';
=======
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
>>>>>>> 6327ff302514ac5bf1d49a98e6b6785dd8d6c7cc

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viewAll" element={<ViewAll />} />
          <Route path="/auth" element={<Auth />} />
          {/* <Route path="/auth/login" element={<Login />} /> */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/searchPage" element={<SearchPage />} />

          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/write" element={<Write key={new Date().getTime()} />} />
          </Route>
        </Routes>
      </Layout>
      <ReactQueryDevtools />
    </BrowserRouter>
  );
}
