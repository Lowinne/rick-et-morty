import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RickAndMortyCharactersList } from './pages/characters';

function App() {
  
  return (
    <Router>
      <Routes>
        {/* Route pour la page des personnages */}
        <Route path="/characters" element={<RickAndMortyCharactersList />} />
        {/* Route par défaut pour gérer les pages non trouvées */}
        <Route path="*" element={<div>Page non trouvée</div>} />
      </Routes>
    </Router>
  );
}

export default App
