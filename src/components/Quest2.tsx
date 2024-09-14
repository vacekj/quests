import { client } from '@/src/penumbra.ts';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Heading,
  Link,
} from '@chakra-ui/react';
import { ViewService } from '@penumbra-zone/protobuf';
import { Text } from '@penumbra-zone/ui/Text';
import { ValueViewComponent } from '@penumbra-zone/ui/ValueViewComponent';
import type React from 'react';
import { useBalances } from '../hooks';
import { useQuestStore } from '../store';
import QuestCompletionIndicator from './QuestCompletionIndicator';

const Quest2: React.FC = () => {
  const { data } = useBalances();

  return (
    <Box py={3} display={'flex'} flexDir={'column'} gap={'2rem'}>
      <Heading as={'h1'}>Quest 2: Shielding Funds</Heading>

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
      {data?.map((balanceRespone) => (
        <ValueViewComponent
          valueView={balanceRespone.balanceView}
          key={balanceRespone.toBinary().toString()}
        />
      ))}
    </Box>
  );
};

export default Quest2;
