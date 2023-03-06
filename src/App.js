import logo from './logo.svg';
import './App.css';
import Header from './components/client/header/Header';
import ClientMap from './components/client/map/clientMap';
import AdminMap from './components/admin/map/adminMap';
import UserDet from './User/UserDet';
import Home from './Home/Home';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import User from './User/User';
import Fotter from './Footer/Fotter';



function App() {
  return (
    <div className="App">
      <Router>
    <Header/>
    {/* <ClientMap/> */}
    <Routes>
    <Route exact path='/' element={<Home/>}></Route>
    <Route exact path='/admin' element={<AdminMap/>}></Route>
    <Route exact path='/client' element={<ClientMap/>}></Route>
    <Route exact path='/user' element={<User/>}></Route>

    </Routes>

    {/* <AdminMap/> */}
    </Router>
    <Fotter/>
    </div>
  );
}

export default App;
