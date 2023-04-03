import React, { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter,Navigate } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner.js';
import Protected from '../components/Protected';
import { UserAuth } from "../context/AuthContext";
import userEvent from '@testing-library/user-event';
import { useReducedMotion } from 'framer-motion';


//lazy importing page components
const Layout = lazy(() => import('../layout/Layout.js'));

const AddEditBlog = lazy(() => import('../pages/AddEditBlog.js'));

const Post = lazy(() => import('../pages/Post.js'));

const MainPage = lazy(() => import('../pages/MainPage.js'));

const ErrorPage = lazy(() => import('../pages/ErrorPage.js'));

const AboutUs = lazy(() => import('../pages/AboutUs.js'));

const Signin = lazy(() => import('../pages/Signin.jsx'));

const Notice = lazy(() => import('../pages/Notice.js'));

const Account = lazy(() => import('../pages/Account'));

const Details = lazy(() => import ('../pages/Details'));


const Router = () => {
  const {user} = UserAuth();


  return (
    <React.StrictMode>
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route
                path='/'
                element={<Layout />}
              >
                
                <Route index element={<MainPage />} exact />
                <Route path='aboutus' element={<AboutUs />} />
                <Route path='notice' element={<Notice />} />
                <Route path='login' element={<Signin />} />
                <Route path='post' element={<Post user= {user}/>} />
                <Route path='detail/:id' element= {<Details user={user}/>}/>
                <Route path='/update/:id' element={user?.uid ? <AddEditBlog/> : <Navigate to="/"/>} />
                <Route path='forum' element={user?.uid ? <AddEditBlog /> : <Navigate to="/"/>} />
                <Route path='account' 
                element={
                <Protected>
                    <Account /> 
                </Protected>} 
                />
              </Route>
              {/* no matching route */}
              <Route
                  path='*'
                  element={<ErrorPage text={'Page not found!'} />}
                />
            </Routes>
          </Suspense>
        </BrowserRouter>
    </React.StrictMode>
  );
};

export default Router;