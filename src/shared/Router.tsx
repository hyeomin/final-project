import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import About from '../pages/about/About';
import Auth from '../pages/auth/Auth';
import Login from '../pages/auth/components/Login';
import Signup from '../pages/auth/components/Signup';
import ByMango from '../pages/bymango/ByMango';
import Community from '../pages/community/Community';
import Detail from '../pages/detail/Detail';
import Home from '../pages/home/Home';
import MyPage from '../pages/mypage/MyPage';
import Write from '../pages/write/Write';
import ProtectedRoute from './ProtectedRoute';

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/bymango" element={<ByMango />} />
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
      {/* <ReactQueryDevtools /> */}
    </BrowserRouter>
  );
}
