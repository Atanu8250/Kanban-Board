import lazyLoad from '../lazyLoad';
import React, { Suspense } from 'react';
import PrivateRoute from './PrivateRoute';
import Loading from '../components/Loading';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../components/ErrorFallback';

const NotFound = lazyLoad('./pages/NotFound');
const Signin = lazyLoad('./pages/Signin');
const Signup = lazyLoad('./pages/Signup');
const Board = lazyLoad('./pages/Board');


/**
 * * --- Lazy-Loaded Routes ---
 * Suspence => it will show the 'fallback' component untill file is loaded lazily
 * ErrorBoundary => while loading the 'lazily loaded component' if we got any error 
 *                  then this 'ErrorBoundary' will show the 'FallbackComponent' to 
 *                  the user and in the 'onReset' function allow the user to reload 
 *                  the page again to get the component
 * */ 

function AllRoutes() {
     return (
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { window.location.reload() }}>
               <Suspense fallback={<Loading />}>
                    <Routes>
                         <Route exact path='/' element={<PrivateRoute><Board /></PrivateRoute>} />
                         <Route path='/signin' element={<Signin />} />
                         <Route path='/signup' element={<Signup />} />
                         <Route path='*' element={<NotFound />} />
                    </Routes>
               </Suspense>
          </ErrorBoundary>
     )
}

export default AllRoutes