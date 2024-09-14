import { PenumbraUIProvider } from '@penumbra-zone/ui/PenumbraUIProvider';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Quest1 from './components/Quest1';
import Quest2 from './components/Quest2';
import './main.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <div className={'bg-[#000000] mx-auto w-fit'}>
      <QueryClientProvider client={queryClient}>
        <PenumbraUIProvider>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Quest1 />
                    <Quest2 />
                  </>
                }
              />
            </Routes>
          </Router>
        </PenumbraUIProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
