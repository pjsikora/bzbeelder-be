import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Root from './Root';
import App from './modules/App';
import './style.scss'
// import '../node_modules/codemirror/lib/codemirror.css'
import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
import LoginForm from './modules/auth/components/LoginForm';

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Root>,
  document.querySelector('#root')
);