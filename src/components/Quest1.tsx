
import React from 'react';
import { useConnect, useWalletManifests } from '../hooks';
import { Text } from '@penumbra-zone/ui/Text';
import { Button } from '@penumbra-zone/ui/Button';
import QuestCompletionIndicator from './QuestCompletionIndicator';
import { useQuestStore } from '../store';

const Quest1: React.FC = () => {
  const { data: wallets, loading } = useWalletManifests();
  const { connectionLoading, connected, onConnect } = useConnect();
  const { markQuestComplete } = useQuestStore();

  React.useEffect(() => {
    if (connected) {
      markQuestComplete(1);
    }
  }, [connected, markQuestComplete]);

  return (
    <main className="bg-black text-white min-h-screen p-6">
      <Text h1>Quest 1: Connecting a Wallet</Text>
      <QuestCompletionIndicator questNumber={1} />

      <Text body>
        Instructions on how to install Prax and create a wallet.
      </Text>
      <Text body>
        Connect your wallet to the page to proceed. When you connect, the site can access your
        wallet's public data, but your private data remains secure.
      </Text>

      {loading && <Text body>Loading wallets...</Text>}

      {!loading && !connected && (
        <div className="mt-4">
          {Object.entries(wallets).map(([origin, manifest]) => (
            <Button key={origin} onClick={() => onConnect(origin)} disabled={connectionLoading}>
              {connectionLoading ? 'Connecting...' : `Connect to ${manifest.name}`}
            </Button>
          ))}
        </div>
      )}

      {connected && (
        <Text body>
          You are now connected to the wallet!
        </Text>
      )}
    </main>
  );
};

export default Quest1;
