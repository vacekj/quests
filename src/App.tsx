import { ChakraProvider, Container } from '@chakra-ui/react';
import { PenumbraUIProvider } from '@penumbra-zone/ui/PenumbraUIProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import theme from './chakraTheme';
import Quest1 from './components/Quest1';
import Quest2 from './components/Quest2';

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container mt={10}>
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
      </Container>
    </ChakraProvider>
  );
}

export default App;
