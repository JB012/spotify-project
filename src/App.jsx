import './App.css'
import Login from './components/Login';
import Profile from './components/Profile';

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    code ? <Profile code={code} /> : <Login />
  );
}

export default App
