import { client } from '@/src/penumbra.ts';
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
    <main className="text-white p-6 flex flex-col max-w-screen-lg">
      <Text h1>Quest 2: Shielding Funds</Text>
      <QuestCompletionIndicator questNumber={2} />

      <Text body>
        To shield funds, use{' '}
        <a href="https://ibc.fun" className="underline">
          ibc.fun
        </a>{' '}
        to transfer tokens into Penumbra. We suggest depositing USDC.
      </Text>

      {data?.map((balanceRespone) => (
        <ValueViewComponent
          valueView={balanceRespone.balanceView}
          key={balanceRespone.toBinary().toString()}
        />
      ))}
    </main>
  );
};

export default Quest2;
