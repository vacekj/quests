import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import type {
  ValueView,
  ValueView_KnownAssetId,
} from '@penumbra-zone/protobuf/penumbra/core/asset/v1/asset_pb';
import { ValidatorInfo } from '@penumbra-zone/protobuf/penumbra/core/component/stake/v1/stake_pb';
import { ValueViewComponent } from '@penumbra-zone/ui/ValueViewComponent';
import type React from 'react';
import { useBalances, useDelegations } from '../hooks';

const Staking: React.FC = () => {
  const { data: delegations } = useDelegations();
  const validators =
    delegations
      ?.filter(
        (delegation) =>
          delegation?.valueView?.valueView?.value?.amount?.toJsonString() !==
          '{}',
      )
      .map((delegation) => {
        console.log(delegation);
        const valueView = delegation.valueView?.valueView
          ?.value as ValueView_KnownAssetId;
        return ValidatorInfo.fromBinary(
          valueView.extendedMetadata?.value as Uint8Array,
        );
      }) ?? [];
  const { data: balances } = useBalances();
  const delegationTokens =
    balances?.filter(
      (balance) =>
        balance?.balanceView?.valueView.case === 'knownAssetId' &&
        balance?.balanceView?.valueView?.value?.metadata?.symbol.includes(
          'delUM(',
        ),
    ) ?? [];
  return (
    <Box py={3} display={'flex'} flexDir={'column'} gap={'2rem'}>
      <VStack spacing={6} align="stretch">
        <Text>
          If you hold the staking token "UM" you can delegate, or stake, those
          tokens to a validator. This enables you to receive rewards and
          participate in governance in exchange for taking on the risk of
          validator misbehavior.
        </Text>

        <VStack spacing={4} align="stretch">
          <Text>To stake with Prax, follow these steps:</Text>
          <UnorderedList spacing={2} pl={4}>
            <ListItem>
              First ensure you hold the Penumbra protocol's staking token 'UM'.
            </ListItem>
            <ListItem>Next, select the 'Stake' tab on your frontend.</ListItem>
            <ListItem>
              On the 'Stake' tab, you can see how much 'UM' you have available
              to delegate, along with a list of possible validators.
            </ListItem>
          </UnorderedList>
        </VStack>

        <Text>For each validator, you will see some important data:</Text>
        <UnorderedList spacing={2} pl={4}>
          <ListItem>
            'VP': the voting power of the validator in the governance system,
          </ListItem>
          <ListItem>'Com': the commission rate that validator takes.</ListItem>
        </UnorderedList>

        <VStack spacing={4} align="stretch">
          <Text>
            Once you select a validator to stake with, you can click the
            'Delegate' button.
          </Text>
          <Text>
            Select how much 'UM' you wish to delegate, then press 'Delegate':
          </Text>
        </VStack>

        <Text>
          It will take a few moments for the delegation transaction to be
          prepared, then Prax will generate a view of your transaction. Verify
          one of the outputs is to the validator you selected, then click
          'Approve':
        </Text>

        <Text>
          You should see a pop-up in the lower right hand of the page indicating
          that the transaction was approved!
        </Text>

        <Text>
          You will receive the delegation token associated with that validator.
          At a later point, you can undelegate by clicking the 'Undelegate'
          button to undelegate from that validator, and receive staking tokens.
        </Text>
      </VStack>

      {delegationTokens.length > 0 && (
        <VStack alignItems={'start'}>
          <Alert status="success">
            <AlertIcon />
            Staked UM succesfully!
          </Alert>
          <Flex
            flexGrow={0}
            flexShrink={1}
            flexBasis="auto"
            px={3}
            alignItems={'center'}
            justifyContent={'center'}
            mx={-3.5}
            css={' * {text-overflow: ellipsis;}; '}
          >
            {delegationTokens?.map((balance) => (
              <ValueViewComponent
                key={balance.toJsonString()}
                valueView={balance.balanceView as ValueView}
              />
            ))}
          </Flex>
        </VStack>
      )}
      <VStack>
        {validators.map((validator) => (
          <Box key={validator.toJsonString()}>{validator?.validator?.name}</Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Staking;
