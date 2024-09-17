import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Flex,
  Heading,
  Link,
} from '@chakra-ui/react';
import type {
  ValueView,
  ValueView_KnownAssetId,
} from '@penumbra-zone/protobuf/penumbra/core/asset/v1/asset_pb';
import type { BalancesResponse } from '@penumbra-zone/protobuf/penumbra/view/v1/view_pb';
import { ValueViewComponent } from '@penumbra-zone/ui/ValueViewComponent';
import type React from 'react';
import { useBalances, useNotes } from '../hooks';

const Deposit: React.FC = () => {
  const { data } = useNotes();
  const depositNotes = data?.filter(
    (note) => note?.noteRecord?.source?.source.case === 'ics20Transfer',
  );
  const { data: balances } = useBalances();
  const knownBalances = balances?.filter(
    (balance) => balance.balanceView?.valueView.case === 'knownAssetId',
  );
  const depositedBalances: BalancesResponse[] =
    knownBalances?.filter((balance) =>
      depositNotes?.some((note) =>
        note.noteRecord?.note?.value?.assetId?.equals(
          (balance.balanceView?.valueView?.value as ValueView_KnownAssetId)
            ?.metadata?.penumbraAssetId,
        ),
      ),
    ) ?? [];
  return (
    <Box py={3} display={'flex'} flexDir={'column'} gap={'2rem'}>
      <Heading as={'h1'}>Quest 2: Shielding Funds</Heading>
      {depositNotes && (
        <Alert status="success">
          <AlertIcon />
          Deposit completed succesfully! Received
          <Flex gap={3} px={3}>
            {depositedBalances?.map((balance) => (
              <ValueViewComponent
                key={balance.toJsonString()}
                valueView={balance.balanceView as ValueView}
              />
            ))}
          </Flex>
        </Alert>
      )}
      <div>
        Now it's time to shield your funds and transfer them into Penumbra. Pick
        an account from Prax by clicking the extension icon, click the IBC
        Deposit Address checkbox, and copy the address.
      </div>
      <Alert status={'info'}>
        <AlertIcon />
        <AlertDescription>
          IBC Deposit addresses exist because source chains record the deposit
          address. They serve as an additional layer of anonymity to not link
          your deposit and actual addresses.
        </AlertDescription>
      </Alert>
      <Box>
        We will use&nbsp;
        <Link
          textDecor={'underline'}
          href={'https://go.skip.build/'}
          className={'font-medium underline'}
        >
          Skip Protocol
        </Link>
        &nbsp; to bridge funds into Penumbra. Go to the Skip app, and input your
        IBC Deposit address. Select your source chain and asset (we recommend
        USDC, but any common asset is fine) and select Penumbra and USDC as the
        destination chain. Then initiate the deposit and come back to this page.
      </Box>
      <Alert status={'info'}>
        <AlertIcon />
        <AlertDescription>
          Penumbra supports paying fees in multiple tokens, including USDC. Prax
          will always choose the best token to pay fees with depending on your
          balances.
        </AlertDescription>
      </Alert>
    </Box>
  );
};

export default Deposit;
