import Main from "./components/Main";
import Login from "./components/Login";
import Profile from './components/Profile';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import NewAlbum from './components/NewAlbum'

function App() {
  return (
    <div>
      <BrowserRouter>
    <Routes>
     <Route  path="/main" element= {<Main />} />
     <Route path="/login" element = {<Login />} />
      <Route path = '/' element ={<Register />} />
      <Route path = '/new' element = {<NewAlbum />} />
      <Route path = '/profile' element ={<Profile />} />
        </Routes >
      </BrowserRouter>
    </div>
  );
}

export default App;
