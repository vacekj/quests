import { client } from '@/src/penumbra';
import { Box, Heading, Link, VStack } from '@chakra-ui/react';
import { ViewService } from '@penumbra-zone/protobuf';
import type {
  AddressView,
  AddressView_Decoded,
} from '@penumbra-zone/protobuf/penumbra/core/keys/v1/keys_pb';
import { AddressViewComponent } from '@penumbra-zone/ui/AddressViewComponent';
import { Button } from '@penumbra-zone/ui/Button';
import { useQuery } from '@tanstack/react-query';
import {
  useAddresses,
  useAddressesWithBalance,
  useConnect,
  useEphemeralAddress,
  useWalletManifests,
} from '../hooks';

const WalletInstall: React.FC = () => {
  const { data: wallets, loading } = useWalletManifests();
  const { connectionLoading, connected, onConnect, onDisconnect } =
    useConnect();
  const { data: addresses } = useAddresses(3);

  return (
    <Box py={3} display={'flex'} flexDir={'column'} gap={'2rem'}>
      <Heading as={'h1'}>Quest 1: Connecting a Wallet</Heading>
      <Box>
        In order to interact with Penumbra, you need a compatible wallet. One
        such option is{' '}
        <Link
          textDecor={'underline'}
          href={
            'https://chromewebstore.google.com/detail/prax-wallet/lkpmkhpnhknhmibgnmmhdhgdilepfghe'
          }
        >
          Prax Wallet
        </Link>
        . Visit the link and click Add to Chrome to install it, then come back
        to this page.
      </Box>
      <Box>
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
      </Box>
      <Box>
        Before you connect your wallet, websites cannot access any of your data.
        It's all stored locally and securely on your device. To give a site
        permission to access your data, click the Connect button below.
      </Box>

      {!loading &&
        !connected &&
        Object.entries(wallets).map(([origin, manifest]) => (
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

      {connected && (
        <Box>
          You have now connected Prax to this page. This means that the website
          can access the data in your wallet, such as balances and transaction
          history. A page can never access your seedphrase.
        </Box>
      )}

      <VStack alignItems={'start'} gap={3}>
        <Heading size={'md'}>Here are your first 3 accounts:</Heading>
        {addresses?.map((address) => (
          <AddressViewComponent
            key={address?.toBinary().toString()}
            addressView={
              {
                addressView: {
                  value: {
                    address: address.address,
                  } as AddressView_Decoded,
                  case: 'decoded',
                },
              } as AddressView
            }
          />
        ))}
        {!connected && (
          <div>Can't access accounts until you've connected your wallet</div>
        )}
      </VStack>

      {connected && (
        <Box>
          <Button
            key={origin}
            onClick={() => onDisconnect()}
            disabled={connectionLoading}
          >
            Disconnect
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default WalletInstall;
