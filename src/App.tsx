import { Welcome } from '@/src/components/Welcome.tsx';
import { useSetScanSinceBlock } from '@/src/hooks.ts';
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
  useColorMode,
} from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';
import theme from './chakraTheme';

const queryClient = new QueryClient();

function App() {
  const { completionPercent, scanSinceBlockHeight, setScanSinceBlockHeight } =
    useQuestStore();
  const { colorMode, setColorMode } = useColorMode();
  useEffect(() => {
    if (colorMode === 'light') {
      setColorMode('dark');
    }
  }, [colorMode, setColorMode]);

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
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
                  {Object.entries(quests).map(([path, Component]) => (
                    <Route key={path} path={path} element={<Component />} />
                  ))}
                </Routes>
              </Box>
            </Flex>
          </Container>
        </Router>
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
  useSetScanSinceBlock();
  return (
    <Box as="nav" height="calc(100vh - 73px)" overflowY="auto" p={5}>
      <VStack align="stretch" spacing={2}>
        {Object.entries(questNames).map(([path, name]) => (
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
