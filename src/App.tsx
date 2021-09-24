import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import GlobalStyle from './assets/styles/globals';
import Dashboard from './pages/Dashboard';

export default function List () {
  return (
    <>
      <GlobalStyle />
        <Router>
          <Switch>
            <Route path='/'>
              <Dashboard />
            </Route>
          </Switch>
        </Router>
    </>
  );
}