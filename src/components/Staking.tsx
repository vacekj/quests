import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

import type React from 'react';
import { useBalances, useNotes } from '../hooks';

const Staking: React.FC = () => {
  const { data: balances } = useBalances();
  const completed = balances?.some(
    (balance) =>
      balance?.balanceView?.valueView.case === 'knownAssetId' &&
      balance?.balanceView?.valueView?.value?.metadata?.symbol.includes(
        'delUM(',
      ),
  );
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box bg={bgColor} color={textColor} p={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="2xl">
          Staking
        </Heading>

        <Text>
          If you hold the staking token `UM` you can delegate, or stake, those
          tokens to a validator. This enables you to receive rewards and
          participate in governance in exchange for taking on the risk of
          validator misbehavior.
        </Text>

        <VStack spacing={4} align="stretch">
          <Text>To stake with Prax, follow these steps:</Text>
          <UnorderedList spacing={2} pl={4}>
            <ListItem>
              First ensure you hold the Penumbra protocol's staking token `UM`.
            </ListItem>
            <ListItem>Next, select the `Stake` tab on your frontend.</ListItem>
            <ListItem>
              On the `Stake` tab, you can see how much `UM` you have available
              to delegate, along with a list of possible validators.
            </ListItem>
          </UnorderedList>
        </VStack>

        <Text>For each validator, you will see some important data:</Text>
        <UnorderedList spacing={2} pl={4}>
          <ListItem>
            `VP`: the voting power of the validator in the governance system,
          </ListItem>
          <ListItem>`Com`: the commission rate that validator takes.</ListItem>
        </UnorderedList>

        <VStack spacing={4} align="stretch">
          <Text>
            Once you select a validator to stake with, you can click the
            `Delegate` button.
          </Text>
          <Text>
            Select how much `UM` you wish to delegate, then press `Delegate`:
          </Text>
          <Image
            src="/api/placeholder/600/400"
            alt="Delegation amount example"
          />
        </VStack>

        <Text>
          It will take a few moments for the delegation transaction to be
          prepared, then Prax will generate a view of your transaction. Verify
          one of the outputs is to the validator you selected, then click
          `Approve`:
        </Text>
        <Image src="/api/placeholder/600/400" alt="Delegation Prax example" />

        <Text>
          You should see a pop-up in the lower right hand of the page indicating
          that the transaction was approved!
        </Text>
        <Image src="/api/placeholder/600/400" alt="Delegation popup example" />

        <Text>
          You will receive the delegation token associated with that validator.
          At a later point, you can undelegate by clicking the `Undelegate`
          button to undelegate from that validator, and receive staking tokens.
        </Text>

        <Flex justifyContent="space-between" mt={6}>
          <Button colorScheme="blue">Delegate</Button>
          <Button colorScheme="red">Undelegate</Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Staking;
