import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ErrorFallback from '../components/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary'
import { Center, Spinner } from '@chakra-ui/react';

const NotFound = lazy(() => import('../pages/NotFound'));
const Signin = lazy(() => import('../pages/Signin'));
const Signup = lazy(() => import('../pages/Signup'));
const Board = lazy(() => import('../pages/Board'));

function AllRoutes() {
     return (
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { window.location.reload() }}>
               <Suspense fallback={<Center h='100svh'><Spinner color='var(--primary-color)' thickness='4px' size='xl' /></Center>}>
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