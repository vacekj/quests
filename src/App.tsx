// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quest1 from './components/Quest1';
import Quest2 from './components/Quest2';
import { PenumbraUIProvider } from '@penumbra-zone/ui/PenumbraUIProvider';
import "./main.css";

function App() {
  return (
    <PenumbraUIProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Quest1 />
                <Quest2 />{' '}
              </>
            }
          />
        </Routes>
      </Router>
    </PenumbraUIProvider>
  );
}

export default App;
