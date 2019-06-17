import React from 'react';
import {HashRouter as Router} from 'react-router-dom';
import routes from './routes';
// import store from './'
import './App.css';

function App() {
  return (
    <Router>
      {routes}
    </Router>
  );
}

export default App;
