import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
 
import Search from './components/Search';

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}
