import './App.css';
import Admin from './admin/Admin.js';
import User from './common/User.js';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import './common/Common.css';
import './speaker/Speaker.css';
import './listener/Listener.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<User></User>}></Route>
          <Route path="/admin" element={<Admin></Admin>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
