import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import SetAvatar1 from './pages/SetAvatar1';

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/setAvatar" element={<SetAvatar1 />} />
      <Route path="/" element={<Chat />} />
    </Routes>
  </BrowserRouter>;
}
