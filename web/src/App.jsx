import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom'
import './App.css'

import { api } from './client';
import history from './history';

import LoginComponent from './components/LoginComponent'
import SignUpComponent from './components/SignUpComponent'
import TodoApp from './components/TodoApp'

class App extends Component {
  componentDidMount() {

    // Set the token if present in localStorage
    const token = localStorage.getItem('token')
    if (token && token.length > 0) api.setToken(token);
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={LoginComponent}></Route>
          <Route exact path="/signup" component={SignUpComponent}></Route>
          <Route exact path="/home" component={TodoApp}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
