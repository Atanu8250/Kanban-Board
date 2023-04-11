import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
     const { isAuth } = useSelector(store => store.authManager);

     if (isAuth) {
          return children;
     } else {
          return <Navigate to="/signin" />
     }
}

export default PrivateRoute