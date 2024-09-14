import React from 'react';
import { Text } from '@penumbra-zone/ui/Text';
import QuestCompletionIndicator from './QuestCompletionIndicator';
import { useQuestStore } from '../store';
import { useConnect } from '../hooks';
import { ViewService } from '@penumbra-zone/protobuf';
import { client } from '@/src/penumbra.ts';

const Quest2: React.FC = () => {
  const { connected } = useConnect();
  const { markQuestComplete } = useQuestStore();
  const [hasIBCTransfer, setHasIBCTransfer] = React.useState(false);

  React.useEffect(() => {
    const checkForIBCTokens = async () => {
      if (connected) {
        try {
          const notes = client
            .service(ViewService)
            .notes({ addressIndex: { account: 0 } });
          const balances = await Array.fromAsync(
            client.service(ViewService).balances({}),
          );
          console.log(balances);
          const arr = [];
          for await (const i of notes) {
            console.log(i.noteRecord?.source);
            arr.push(i);
          }

          if (arr.length > 0) {
            setHasIBCTransfer(true);
            markQuestComplete(2);
          }
        } catch (error) {
          console.error('Error fetching notes:', error);
        }
      }
    };

    checkForIBCTokens();
  }, [connected, markQuestComplete]);

  return (
    <main className="bg-black text-white min-h-screen p-6">
      <Text h1>Quest 2: Shielding Funds</Text>
      <QuestCompletionIndicator questNumber={2} />

      <Text body>
        To shield funds, use{' '}
        <a href="https://ibc.fun" className="underline">
          ibc.fun
        </a>{' '}
        to transfer tokens into Penumbra. We suggest depositing USDC.
      </Text>

      {!hasIBCTransfer && <Text body>Awaiting IBC transfer...</Text>}

      {hasIBCTransfer && (
        <Text body>IBC transfer detected! Your funds are now shielded.</Text>
      )}
    </main>
  );
};

export default Quest2;
