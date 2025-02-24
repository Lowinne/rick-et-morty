
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {CharacterDetails, RickAndMortyCharactersList} from './pages/characters';

function App() {
  
  return (
    <Router>
      <Routes>
        {/* Route pour la page des personnages */}
        <Route path="/characters" element={<RickAndMortyCharactersList />} />
        {/* Route par défaut pour gérer les pages non trouvées */}
        <Route path="*" element={<div>Page non trouvée</div>} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
      </Routes>
    </Router>
  );
}

export default App
