import './App.css'
import Login from './components/Login';
import Pages from './components/Pages';
import {useNavigate, Routes, Route} from 'react-router-dom'
import { useEffect } from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  //TODO: Make callback /profile
  
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/profile" element={<Pages currentPage={"Profile"} code={code} />}/>
      <Route path="/player" element={<Pages currentPage={"Player"} code={code} />}/>
    </Routes>
  );
}

export default App
