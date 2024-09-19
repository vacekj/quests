import { client } from '@/src/penumbra';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  VStack,
} from '@chakra-ui/react';
import { ViewService } from '@penumbra-zone/protobuf';
import type {
  AddressView,
  AddressView_Decoded,
} from '@penumbra-zone/protobuf/penumbra/core/keys/v1/keys_pb';
import { AddressViewComponent } from '@penumbra-zone/ui/AddressViewComponent';
import { Button as PenumbraButton } from '@penumbra-zone/ui/Button';
import { useQuery } from '@tanstack/react-query';
import type React from 'react';
import {
  useAddresses,
  useAddressesWithBalance,
  useConnect,
  useEphemeralAddress,
  useWalletManifests,
} from '../hooks';

const Disconnect: React.FC = () => {
  const { data: wallets, isLoading } = useWalletManifests();
  const { connectionLoading, connected, onConnect, onDisconnect } =
    useConnect();
  return (
    <Box py={3} display={'flex'} flexDir={'column'} gap={'2rem'}>
      <Box>
        Once you are done working with a page, you can disconnect your wallet.
        To do this in Prax. You can go to the Settings, click Connected sites,
        and click the trash button next to the site URL. This will disconnect
      </Box>
      {!connected && (
        <div>Congratulations. The site can no longer see your data.</div>
      )}
    </Box>
  );
};

export default Disconnect;
