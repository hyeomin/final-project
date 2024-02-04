import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Layout from '../layouts/Layout';
import MyPage from '../pages/MyPage';
import About from '../pages/about/About';
import Auth from '../pages/auth/Auth';
import Detail from '../pages/detail/Detail';
import Home from '../pages/home/Home';
// import ViewAll from '../pages/Community';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MangoContents from '../pages/MangoContents';
import Write from '../pages/Write';
import Community from '../pages/community/Community';
import ProtectedRoute from './ProtectedRoute';

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/mangoContents" element={<MangoContents />} />
          <Route path="/auth" element={<Auth />} />
          {/* <Route path="/auth/login" element={<Login />} /> */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />

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
