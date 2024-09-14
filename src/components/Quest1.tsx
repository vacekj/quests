import { Button } from '@penumbra-zone/ui/Button';
import { Text } from '@penumbra-zone/ui/Text';
import { useConnect, useWalletManifests } from '../hooks';
import { useQuestStore } from '../store';
import QuestCompletionIndicator from './QuestCompletionIndicator';

const Quest1: React.FC = () => {
  const { data: wallets, loading } = useWalletManifests();
  const { connectionLoading, connected, onConnect, onDisconnect } =
    useConnect();

  return (
    <main className="text-white p-6 flex flex-col max-w-screen-lg">
      <h1 className={'text-4xl mb-3'}>Quest 1: Connecting a Wallet</h1>
      <Text p>
        In order to interact with Penumbra, you need a compatible wallet. One
        such option is{' '}
        <a
          href={
            'https://chromewebstore.google.com/detail/prax-wallet/lkpmkhpnhknhmibgnmmhdhgdilepfghe'
          }
        >
          Prax Wallet
        </a>
        . Visit the link and click Add to Chrome to install it, then come back
        to this page.
      </Text>
      <Text p>
        When you first open the extension by clicking it in the Chrome toolbar,
        select Create a new wallet. During the guided tutorial, you'll need to
        set a passphrase to protect your wallet. The passphrase is not the same
        as the recovery phrase. The passphrase is used to restrict access to the
        web wallet on your computer. The recovery phrase can be used to restore
        your wallet in case you forget your passphrase, switch to a new machine
        or delete the extension. Make sure to store both the passphrase and the
        recovery phrase securely, for example in a password manager. Re-enter
        portions of the recovery phrase when prompted, to confirm that you've
        saved it properly.
      </Text>
      <Text p>
        Next, click the Connect to Prax wallet button below and confirm the
        Connection dialog.
      </Text>

      {!loading && !connected && (
        <div className="mt-4 max-w-4xl">
          {Object.entries(wallets).map(([origin, manifest]) => (
            <Button
              key={origin}
              onClick={() => onConnect(origin)}
              disabled={connectionLoading}
            >
              {connectionLoading
                ? 'Connecting...'
                : `Connect to ${manifest.name}`}
            </Button>
          ))}
        </div>
      )}

      {connected && (
        <Text body>
          You have now connected Prax to this page. This means that the website
          can access the data in your wallet. All your data is stored locally,
          and pages <i>cannot access it until you connect your wallet.</i>
        </Text>
      )}

      {connected && (
        <div className="mt-4 max-w-[10rem]">
          <Button
            key={origin}
            onClick={() => onDisconnect()}
            disabled={connectionLoading}
          >
            Disconnect
          </Button>
        </div>
      )}
    </main>
  );
};

export default Quest1;
