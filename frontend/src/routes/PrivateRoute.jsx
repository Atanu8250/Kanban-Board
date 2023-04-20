import React from 'react'
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
     const token = sessionStorage.getItem("TOKEN");

     if (token) {
          return children;
     } else {
          return <Navigate to="/signin" />
     }
}

export default PrivateRoute;