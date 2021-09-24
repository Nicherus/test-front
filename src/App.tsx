import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { UserProvider } from './contexts/UserContext';
import GlobalStyle from './assets/styles/globals';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';



export default function List () {
  return (
    <UserProvider>
      <GlobalStyle />
        <Router>
          <Switch>
            <Route path='/' component={Dashboard} exact/>
            <Route path='/profile' component={Profile} exact/>
            <Route path='/password' component={ChangePassword} exact/>
          </Switch>
        </Router>
    </UserProvider>
  );
}