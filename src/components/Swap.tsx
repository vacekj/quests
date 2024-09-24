import {
  Box,
  Heading,
  Image,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import type React from 'react';

const Swap: React.FC = () => {
  return (
    <Box py={3} display={'flex'} flexDir={'column'} gap={'2rem'}>
      <VStack spacing={6} align="stretch">
        <Text>
          Penumbra offers a built-in DEX that allows you to swap tokens
          privately and with the best trade execution.
        </Text>
        <Text>
          We recommend swapping the USDC that you bridged in earlier to UM, the
          Penumbra staking token, but you can choose to swap any pair you want.
          <Link
            textDecoration={'underline'}
            px={1}
            href={'https://stake.with.starlingcyber.net/#/swap?from=USDC&to=UM'}
          >
            Click here
          </Link>
          to go to the Minifront Swap page.
        </Text>

        <Heading as="h2">Instant Swaps</Heading>

        <Text>
          The simplest type of swap available is an "instant swap". This can be
          accessed by setting the `Speed` slider all the way to the left-hand
          setting (`Instant Price`).
        </Text>

        <Text>
          Using the selectors on the right-hand side, choose the two tokens you
          wish to swap between:
        </Text>

        <Image src="/images/swap-tokens-1.png" alt="Token swap interface" />

        <Text>
          The left-hand side specifies the source token, which you will swap for
          the right-hand side. The amount of the source token you wish to swap
          is specified in the input box below the `Trade` label.
        </Text>

        <Text>
          Thanks to Penumbra's DEX design, you're guaranteed to get the best
          market execution price at the time you perform the swap.
        </Text>

        <Text>
          To see a preview of how the swap will execute, you can press the
          `Estimate` button. This will show you information including:
        </Text>

        <UnorderedList spacing={2}>
          <ListItem>
            The total amount of the desired token to be received
          </ListItem>
          <ListItem>
            The individual routes taken to perform the swap (the Penumbra DEX
            allows synthetic liquidity by swapping through other trading pairs!)
          </ListItem>
          <ListItem>The price impact of executing your swap</ListItem>
        </UnorderedList>

        <Box height="4" />

        <Image src="/images/swap-instant-1.png" alt="Instant swap preview" />

        <Text>
          If you're happy with the proposed swap, press the `Swap` button and
          wait for the transaction to be built.
        </Text>

        <Text>
          Prax will prompt you to sign the transaction after it's built. Click
          `Approve` in the extension and your swap will be executed at market
          price.
        </Text>

        <Heading as="h2">Gradual Dutch Auctions</Heading>

        <Text>
          Penumbra's DEX also supports{' '}
          <Text as="b">Gradual Dutch Auctions</Text> which allow you to perform
          price discovery based on market demand, by offering your swap over a
          period of time at diminishing prices until all tokens are sold.
        </Text>

        <Text>
          Using the `Speed` slider mechanism, you can view how different time
          scales affect the number of auctions that will be created. By moving
          the slider to the right, the auction will take place over a greater
          amount of time, leading to tokens being sold at more price points.
        </Text>

        <Text>
          You must also specify the maximum and minimum prices you're willing to
          sell your tokens at. This way, you can ensure that the auction allows
          you to get the highest prices possible for your tokens, without
          selling them for less than you're comfortable with.
        </Text>

        <Box height="4" />

        <Image
          src="/images/swap-gda-1.png"
          alt="Gradual Dutch Auction interface"
        />

        <Text>
          Press `Start auctions` and Prax will present to you the proposed
          transaction, which allows you to view all the individual Dutch
          Auctions:
        </Text>

        <Box height="4" />

        <Image src="/images/swap-gda-2.png" alt="Dutch Auction preview" />

        <Text>
          As with the <Text as="b">Instant Swap</Text>, you can then press
          `Approve` in Prax to submit the auction.
        </Text>
      </VStack>
    </Box>
  );
};

export default Swap;
