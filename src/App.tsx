import Disconnect from '@/src/components/Disconnect.tsx';
import Staking from '@/src/components/Staking.tsx';
import Swap from '@/src/components/Swap.tsx';
import { Welcome } from '@/src/components/Welcome.tsx';
import { questNames, quests, useQuestStore } from '@/src/store.ts';
import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  Progress,
  VStack,
} from '@chakra-ui/react';
import { PenumbraUIProvider } from '@penumbra-zone/ui/PenumbraUIProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';
import theme from './chakraTheme';
import Deposit from './components/Deposit.tsx';
import WalletInstall from './components/WalletInstall.tsx';
const queryClient = new QueryClient();

function App() {
  const { completionPercent } = useQuestStore();
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <PenumbraUIProvider>
          <Router>
            <Container position={'relative'} mt={10} maxW={'container.xl'}>
              {/* Header */}
              <Flex
                as="header"
                align="center"
                justify="space-between"
                wrap="wrap"
                padding="1.5rem"
              >
                <Flex align="center" mr={5}>
                  <Heading as="h1" size="lg" letterSpacing={'tighter'}>
                    Penumbra Quests
                  </Heading>
                </Flex>
              </Flex>

              {/* Progress bar */}
              <Progress
                size="sm"
                value={completionPercent()}
                css={'& > * {transition: 0.4s cubic-bezier(0.22,0.61,0.36,1)}'}
                transition={'0.5s linear'}
                colorScheme="orange"
                rounded={'sm'}
                margin="1.5rem"
              />

              <Flex>
                <Sidebar />
                <Box
                  display={'flex'}
                  flex={1}
                  flexDir={'column'}
                  p={8}
                  overflowY="auto"
                >
                  <Header />
                  <Routes>
                    <Route path="/" element={<Welcome />} />
                    {Object.entries(quests).map(([path, Component], index) => (
                      <Route key={path} path={path} element={<Component />} />
                    ))}
                  </Routes>
                </Box>
              </Flex>
            </Container>
          </Router>
        </PenumbraUIProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

function Header() {
  const { pathname } = useLocation();

  return (
    <Heading as="h1" size="xl" mb={4}>
      {questNames[pathname.slice(1)]}
    </Heading>
  );
}

function Sidebar() {
  const { pathname } = useLocation();
  return (
    <Box as="nav" height="calc(100vh - 73px)" overflowY="auto" p={5}>
      <VStack align="stretch" spacing={2}>
        {Object.entries(questNames).map(([path, name], index) => (
          <Button
            as={Link}
            rounded={'sm'}
            py={6}
            key={name}
            variant={path === pathname.slice(1) ? 'solid' : 'ghost'}
            justifyContent="flex-start"
            fontWeight={path === pathname.slice(1) ? 'bold' : 'normal'}
            to={path}
          >
            {name}
          </Button>
        ))}
      </VStack>
    </Box>
  );
}

export default App;
