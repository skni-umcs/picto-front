import './App.css';
import Admin from './admin/Admin.js'
import User from './common/User.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function siteContent(){
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<User></User>}></Route>
        <Route path="/admin" element={<Admin></Admin>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  return siteContent();
}

export default App;
