import { Box } from '@chakra-ui/react';
import type React from 'react';
import { useConnect } from '../hooks';

const Disconnect: React.FC = () => {
  const { connected } = useConnect();
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
