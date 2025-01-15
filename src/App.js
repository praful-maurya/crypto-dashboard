import './App.css';
import CryptoDetail from './components/crypro-details/CryptoDetails';
import CryptoList from './components/crypto-list/CryptoList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CryptoList />} />
        <Route path="/crypto/:id" element={<CryptoDetail />} />
      </Routes>
    </Router>
  );
}

export default App;