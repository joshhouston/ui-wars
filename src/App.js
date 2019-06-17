import React from 'react';
import {HashRouter as Router} from 'react-router-dom';
import routes from './routes';
import store from './redux/store';
import {Provider} from 'react-redux';
// import './App.css';
import './style.scss'

function App() {
  return (
    <Provider store={store}>
      <Router>
        {routes}
      </Router>
    </Provider>
  );
}

export default App;
