import React from 'react';
import './App.css';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import Login  from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import UpdateProfile from './pages/Profile/UpdateProfile';
import EmailVerification from './pages/Auth/EmailVerification';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './components/Common/Privateroute';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route 
          path="/" 
          element={<PrivateRoute element={<Dashboard/>} />} 
        />
        {/* <Route path='/' Component={Dashboard}/> */}
        <Route path='/signup' Component={Signup}/>
        <Route path='/login' Component={Login} />
        <Route path='/email-varification' Component={EmailVerification}/>
        <Route path='/updata-profile' element={<PrivateRoute element={<UpdateProfile/>} />}  />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
