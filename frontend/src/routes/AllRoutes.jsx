import lazyLoad from '../lazyLoad';
import PrivateRoute from './PrivateRoute';
import { Route, Routes } from 'react-router-dom';
import LazyLoadHandler from '../components/LazyLoadHandler';

// Paths are set relative to the lazyLoad file
const NotFound = lazyLoad('./pages/NotFound');
const Signin = lazyLoad('./pages/Signin');
const Signup = lazyLoad('./pages/Signup');
const Board = lazyLoad('./pages/Board');


function AllRoutes() {
     return (
          <LazyLoadHandler>
               <Routes>
                    <Route exact path='/' element={<PrivateRoute><Board /></PrivateRoute>} />
                    <Route path='/signin' element={<Signin />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='*' element={<NotFound />} />
               </Routes>
          </LazyLoadHandler>
     )
}

export default AllRoutes