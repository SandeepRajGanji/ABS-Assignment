import {Route,Switch} from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Customer from './components/Customer'
import Employee from './components/Employee'
import EditCustomer from './components/EditCustomer'
import EditEmployee from './components/EditEmployee'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Apps from './components/Apps'
import AppVersion from './components/AppVersion'
import Environent from './components/Environment'
import CustomerApp from './components/CustomerApp'
import CustomerEnvironment from './components/CustomerEnvironment'
import EditCustomerApp from './components/EditCustomerApp'
import './App.css';



function App() {
  return (
    <Switch>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/" component={Home}/>
      <ProtectedRoute exact path="/customers" component={Customer}/>
      <ProtectedRoute exact path="/employees" component={Employee}/>
      <ProtectedRoute exact path="/customers/:id" component={EditCustomer}/>
      <ProtectedRoute exact path="/employees/:id" component={EditEmployee}/>
      <ProtectedRoute exact path="/app" component={Apps}/>
      <ProtectedRoute exact path="/app-version" component={AppVersion}/>
      <ProtectedRoute exact path="/environment" component={Environent}/>
      <ProtectedRoute exact path="/customer-environment" component={CustomerEnvironment}/>
      <ProtectedRoute exact path="/customer-app" component={CustomerApp}/>
      <ProtectedRoute exact path="/customer-app/:id" component={EditCustomerApp}/>
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
