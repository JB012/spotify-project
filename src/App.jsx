import './App.css'
import Login from './components/Login';
import Pages from './components/Pages';
import {useNavigate, Routes, Route} from 'react-router-dom'
import { useEffect } from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  //TODO: Make callback /profile
  const [currentCode, setCurrentCode] = useLocalStorage("code", code);

  useEffect(() => {
    if (code) {
      history.replaceState({search: ""}, "", "/profile");
      setCurrentCode(code);
    }
  }, [setCurrentCode]);
  
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/profile" element={<Pages currentPage={"Profile"} code={currentCode} />}/>
      <Route path="/player" element={<Pages currentPage={"Player"} code={currentCode} />}/>
    </Routes>
  );
}

export default App
