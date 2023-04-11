import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import axios from 'axios';

import App from './App'
import './index.css'
import { store } from './redux/store';

// ? AXIOS DEFAULT BACKEND URL
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ChakraProvider>,
)
