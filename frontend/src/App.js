import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ClientList from './components/ClientList';
import AddClient from './components/AddClient';
import EditClient from './components/EditClient';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/clients" component={ClientList} />
        <PrivateRoute exact path="/add-client" component={AddClient} />
        <PrivateRoute exact path="/edit-client/:id" component={EditClient} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
};

export default App;

