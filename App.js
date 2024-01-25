import './App.css';
import Category from './components/Category';
import Client from './components/Client';
import Home from './components/Home';
import Loginpage from './components/Loginpage';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
function App(){
  const username= sessionStorage.getItem("username")
  return (
    <div >
      <div>
       
      
        
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Loginpage/>}></Route>
        <Route path='/home' element={<Home username={username}/>}></Route>
        <Route path='/submit' element={<Home/>}></Route>
        <Route path='/category' element={<Category/>}></Route>
        <Route path='/client' element={<Client/>}></Route>
        <Route path='/loginpage' element={<Loginpage/>}></Route>
        
      </Routes>
      </BrowserRouter>
     
      </div>
    </div>
  );
}

export default App;
