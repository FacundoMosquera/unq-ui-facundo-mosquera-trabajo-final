import { useState } from 'react'
import './App.css'
import Menu from './components/Menu/Menu';

function App() {
  const [dificultad, setDificultad] = useState("easy");

  return (
    <div className="inicio">
      <Menu />
    </div>
  );
}

export default App
