import Staking from '@/src/components/Staking.tsx';
import { ChakraProvider, Container } from '@chakra-ui/react';
import { PenumbraUIProvider } from '@penumbra-zone/ui/PenumbraUIProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import theme from './chakraTheme';
import Deposit from './components/Deposit.tsx';
import WalletInstall from './components/WalletInstall.tsx';

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
                      <WalletInstall />
                      <Deposit />
                      <Staking />
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
