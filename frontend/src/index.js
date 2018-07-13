import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home';
import SinglePost from './pages/SinglePost';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NoMatch from './pages/NoMatch';
import Header from './components/Header';
import Login from './pages/Login';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/:category/:postId" component={SinglePost} />
          <Route path="/:category?" component={Home} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
