import React from 'react'
import Main from './Page/Main'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'
import Login from './component/login'
import Header from './component/Header'
import Notfound from './Page/notfound'
import AddUser from './Page/AddUser'
import EditUser from './Page/EditUser'
function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
     
    <Router>
      <Routes>
      <Route path="/" element={isLoggedIn == "true" ?<Main />: <Login />}  />
      <Route path="/:id" element={isLoggedIn == "true" ?<EditUser />: <Notfound/>}  />
    
      <Route path="*" element={<Notfound/>}  />
 <Route path="/add/user" element={isLoggedIn == "true" ?<AddUser/>:<Notfound/>}  />
              
       <Route element={<PrivateRoutes />}>
       
              <Route path="/Home" element={ <Main />}  />

              </Route>       
 </Routes>
    </Router>
   
  )
}

export default App
