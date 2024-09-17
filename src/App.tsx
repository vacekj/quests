import Staking from '@/src/components/Staking.tsx';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  Input,
  Progress,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { PenumbraUIProvider } from '@penumbra-zone/ui/PenumbraUIProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import theme from './chakraTheme';
import Deposit from './components/Deposit.tsx';
import WalletInstall from './components/WalletInstall.tsx';

const queryClient = new QueryClient();
const pages = [
  { title: 'Setup a wallet', content: () => <WalletInstall /> },
  {
    title: 'Deposit into Penumbra',
    content: () => <Deposit />,
  },
  { title: 'Stake your UM', content: () => <Staking /> },
  {
    title: 'Shielded Staking',
    content: () => <div>Shielded Staking content</div>,
  },
  {
    title: 'Decentralized Governance',
    content: () => <div>Decentralized Governance content</div>,
  },
  {
    title: 'Selective Disclosure',
    content: () => <div>Selective Disclosure content</div>,
  },
  {
    title: 'Using Penumbra on the web',
    content: () => <div>Using Penumbra on the web content</div>,
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const progress = ((currentPage + 1) / pages.length) * 100;
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <PenumbraUIProvider>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <Container mt={10} maxW={'container.xl'}>
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
                      value={progress}
                      size="sm"
                      colorScheme="orange"
                      rounded={'sm'}
                    />

                    <Flex>
                      {/* Sidebar */}
                      <Box
                        as="nav"
                        height="calc(100vh - 73px)"
                        overflowY="auto"
                        p={5}
                      >
                        <VStack align="stretch" spacing={2}>
                          {pages.map((page, index) => (
                            <Button
                              rounded={'sm'}
                              py={6}
                              key={page.title}
                              onClick={() => setCurrentPage(index)}
                              variant={
                                currentPage === index ? 'solid' : 'ghost'
                              }
                              justifyContent="flex-start"
                              fontWeight={
                                currentPage === index ? 'bold' : 'normal'
                              }
                            >
                              {page.title}
                            </Button>
                          ))}
                        </VStack>
                      </Box>

                      {/* Main content */}
                      <Box flex={1} p={8} overflowY="auto">
                        <Heading as="h1" size="xl" mb={4}>
                          {pages[currentPage].title}
                        </Heading>

                        {/* This is where you would insert your page content */}
                        <Box>{pages[currentPage].content()}</Box>
                      </Box>
                    </Flex>
                  </Container>
                }
              />
            </Routes>
          </Router>
        </PenumbraUIProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
