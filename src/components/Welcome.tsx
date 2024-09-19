import { Box, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const AnimatedBackground = () => {
  return (
    <Box position="fixed" inset="0" zIndex="10" bg="black">
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg
        style={{ width: '100%', height: '100%' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#333333" stopOpacity="0">
              <animate
                attributeName="stopOpacity"
                values="0;1;0"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#333333">
              <animate
                attributeName="offset"
                values="0.5;0.3;0.5;0.7;0.5"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#333333" stopOpacity="0">
              <animate
                attributeName="stopOpacity"
                values="0;1;0"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>

        {[...Array(15)].map((_, i) => (
          <g key={i}>
            <path
              d={`M ${-20 + i * 10} ${50 + Math.sin(i) * 20} Q ${50} ${50} ${120 - i * 10} ${50 - Math.sin(i) * 20}`}
              stroke="url(#lineGradient)"
              strokeWidth="0.5"
              fill="none"
            >
              <animate
                attributeName="d"
                dur={`${4 + i * 0.5}s`}
                repeatCount="indefinite"
                values={`
                  M ${-20 + i * 10} ${50 + Math.sin(i) * 20} Q ${50} ${50} ${120 - i * 10} ${50 - Math.sin(i) * 20};
                  M ${-20 + i * 10} ${50 - Math.cos(i) * 20} Q ${50} ${50} ${120 - i * 10} ${50 + Math.cos(i) * 20};
                  M ${-20 + i * 10} ${50 + Math.sin(i) * 20} Q ${50} ${50} ${120 - i * 10} ${50 - Math.sin(i) * 20}
                `}
              />
            </path>
          </g>
        ))}
      </svg>
    </Box>
  );
};

export const Welcome = () => {
  return (
    <Flex
      minHeight="100vh"
      position={'absolute'}
      top={0}
      left={0}
      minW={'100vw'}
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <AnimatedBackground />
      <Box
        zIndex={30}
        maxWidth="2xl"
        w="full"
        bg="rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(5px)"
        rounded="xl"
        p={8}
      >
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="2xl" color="gray.300" textAlign="center">
            Welcome to Penumbra
          </Heading>

          <Flex justify="center">
            <Button as={Link} to={'/wallet'} size="lg" colorScheme="gray">
              Enter the shadows...
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
};
