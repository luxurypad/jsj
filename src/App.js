import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import './assets/css/base.css'
import 'antd/dist/antd.css'

import Home from './pages/home/Home'
import Login from './pages/login/Login'

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} exact/>
      <Route path="/login" component={Login} exact />
    </BrowserRouter>
  );
}

export default App;
