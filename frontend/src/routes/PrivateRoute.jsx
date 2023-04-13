import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
     const { isAuth } = useSelector(store => store.authManager);

     return children;
     if (isAuth) {
     } else {
          return <Navigate to="/signin" />
     }
}

export default PrivateRoute