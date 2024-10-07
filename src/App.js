import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage'
import Room from './components/Room/Room'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/room/:roomId" element={<Room />} />
    </Routes>
  );
}

export default App;
