import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Singup from '../pages/Singup'
import Signin from '../pages/Signin'
import Board from '../pages/Board'

function AllRoutes() {
     return (
          <Routes>
               <Route exact path='/' element={<PrivateRoute><Board /></PrivateRoute>} />
               <Route path='/signin' element={<Signin />} />
               <Route path='/signup' element={<Singup />} />
          </Routes>
     )
}

export default AllRoutes