import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Heading,
  Link,
} from '@chakra-ui/react';

import { CommitmentSource_Ics20Transfer } from '@penumbra-zone/protobuf/penumbra/core/component/sct/v1/sct_pb';
import { ValueViewComponent } from '@penumbra-zone/ui/ValueViewComponent';
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
  return (
    <Box py={3} display={'flex'} flexDir={'column'} gap={'2rem'}>
      <Heading as={'h1'}>Quest 3: Staking</Heading>
      {completed && (
        <Alert status="success">
          <AlertIcon />
          Staking completed succesfully!
        </Alert>
      )}
      <div>
        Now it's time to shield your funds and transfer them into Penumbra. Pick
        an account from Prax by clicking the extension icon, click the IBC
        Staking Address checkbox, and copy the address.
      </div>
      <Alert status={'info'}>
        <AlertIcon />
        <AlertDescription>
          IBC Staking addresses exist because source chains record the deposit
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
        IBC Staking address. Select your source chain and asset (we recommend
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

export default Staking;
