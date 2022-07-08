import {Routes as Router, Route} from 'react-router-dom';
import NonAuthLayout from './Layout/NonAuthLayout';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import { Navigate } from 'react-router-dom';
import AuthLayout from './Layout/AuthLayout';
import AllAgents from './components/AllAgents';



function App() {
  return (
    <Router>
      <Route path = '/' element = {<NonAuthLayout><Login /></NonAuthLayout>} />
      <Route path = '/login' element = {<Navigate to ='/' />}/>

      <Route path = '/dashboard' element = {<Navigate to = '/admin/dashboard' />}></Route>
    
      <Route path = '/admin'>
      <Route index element = {<Navigate to = '/admin/dashboard' />} />
      <Route path = 'dashboard' element = {<AuthLayout><Dashboard /></AuthLayout>} />
      <Route path = 'all-agents' element = {<AuthLayout><AllAgents /></AuthLayout>} />
      </Route>

    </Router>    
  );
}

export default App;
