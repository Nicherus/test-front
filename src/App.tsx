import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import GlobalStyle from './assets/styles/globals';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

export default function List () {
  return (
    <>
      <GlobalStyle />
        <Router>
          <Switch>
            <Route path='/' component={Dashboard} exact/>
            <Route path='/profile' component={Profile} exact/>
          </Switch>
        </Router>
    </>
  );
}