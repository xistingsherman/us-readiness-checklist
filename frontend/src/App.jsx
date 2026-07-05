import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReadinessChecklist from './components/ReadinessChecklist';
import SavedResult from './components/SavedResult';
import './styles/tokens.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReadinessChecklist />} />
        <Route path="/result/:id" element={<SavedResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;