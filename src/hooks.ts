import { client } from '@/src/penumbra';
import { useQuestStore } from '@/src/store.ts';
import {
  PenumbraClient,
  type PenumbraManifest,
  PenumbraRequestFailure,
  PenumbraState,
} from '@penumbra-zone/client';
import { TendermintProxyService, ViewService } from '@penumbra-zone/protobuf';
import { useQuery } from '@tanstack/react-query';
import { uniqBy } from 'es-toolkit';
import { useEffect } from 'react';

export const useWalletManifests = () => {
  return useQuery<Record<string, PenumbraManifest>>({
    queryKey: ['providerManifests'],
    staleTime: 0,
    queryFn: async () => {
      const res = PenumbraClient.getProviderManifests();
      const resolvedManifests = await Promise.all(
        Object.entries(res).map(async ([key, promise]) => {
          const value = await promise;
          return [key, value];
        }),
      );
      return Object.fromEntries(resolvedManifests ?? {});
    },
  });
};

export const useConnect = () => {
  const {
    data: connected,
    isLoading: connectionLoading,
    refetch,
  } = useQuery({
    queryKey: ['connection'],
    queryFn: async () => {
      const providers = PenumbraClient.getProviders();
      const connected = Object.keys(providers).find((origin) =>
        PenumbraClient.isProviderConnected(origin),
      );
      if (!connected) return undefined;
      try {
        await client.connect(connected);
        return connected;
      } catch (error) {
        return undefined;
      }
    },
  });

  const onConnect = async (origin: string) => {
    try {
      await client.connect(origin);
      await refetch();
    } catch (error) {
      if (error instanceof Error && error.cause) {
        if (error.cause === PenumbraRequestFailure.Denied) {
          alert(
            'Connection denied: you may need to un-ignore this site in your extension settings.',
          );
        }
        if (error.cause === PenumbraRequestFailure.NeedsLogin) {
          alert('Not logged in: please login into the extension and try again');
        }
      }
    }
  };

  const onDisconnect = async () => {
    if (!client.connected) return;
    try {
      await client.disconnect();
      await refetch();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    client.onConnectionStateChange((event) => {
      if (
        event.state === PenumbraState.Connected ||
        event.state === PenumbraState.Disconnected
      ) {
        refetch();
      }
    });
  }, [refetch]);

  return {
    connectionLoading,
    connected,
    onConnect,
    onDisconnect,
  };
};

export function useBalances() {
  const { connected } = useConnect();
  return useQuery({
    queryKey: ['balances', connected],
    staleTime: 0,
    queryFn: async () => {
      const balances = await Array.fromAsync(
        client.service(ViewService).balances({}),
      );
      return balances;
    },
  });
}

export function useDelegations() {
  const { connected } = useConnect();
  return useQuery({
    queryKey: ['delegations', connected],
    staleTime: 0,
    queryFn: async () => {
      const delegations = await Array.fromAsync(
        client.service(ViewService).delegationsByAddressIndex({
          addressIndex: {
            account: 0,
          },
        }),
      );
      return delegations;
    },
  });
}

export function useNotes() {
  const { connected } = useConnect();
  return useQuery({
    queryKey: ['notes', connected],
    staleTime: 0,
    queryFn: async () => {
      const notes = await Array.fromAsync(
        client.service(ViewService).notes({
          includeSpent: true,
        }),
      );

      return notes;
    },
  });
}

export function useAddressesWithBalance() {
  const { connected } = useConnect();
  const { data: balances } = useBalances();
  return useQuery({
    queryKey: ['addressesWithBalance', balances, connected],
    staleTime: 0,
    queryFn: async () => {
      return uniqBy(
        balances?.map((balance) => balance.accountAddress) ?? [],
        (a) => a?.toJsonString(),
      );
    },
  });
}

export function useAddresses(count: number) {
  const { connected } = useConnect();

  return useQuery({
    queryKey: ['addresses', connected],
    staleTime: 0,
    queryFn: async () => {
      return await Promise.all(
        Array(count)
          .fill(undefined)
          .map((_, index) =>
            client.service(ViewService).addressByIndex({
              addressIndex: {
                account: index,
              },
            }),
          ),
      );
    },
  });
}

export function useEphemeralAddress({ index }: { index: number }) {
  const { connected } = useConnect();
  return useQuery({
    queryKey: ['ephemeralAddress', connected],
    staleTime: 0,
    queryFn: async () => {
      return client.service(ViewService).ephemeralAddress({
        addressIndex: {
          account: index,
        },
      });
    },
  });
}

export function useCurrentChainStatus() {
  const { connected } = useConnect();
  return useQuery({
    queryKey: ['blockNumber', connected],
    staleTime: 0,
    queryFn: async () => {
      return client.service(TendermintProxyService).getStatus({});
    },
  });
}

type BlockRange = {
  from: number;
  to: number;
};

export function useSwaps(blockRange: BlockRange) {
  const { connected } = useConnect();
  return useQuery({
    queryKey: ['swaps', connected],
    staleTime: 0,
    queryFn: async () => {
      console.log('fetching swaps');
      const txs = await Array.fromAsync(
        client.service(ViewService).transactionInfo({
          startHeight: BigInt(blockRange.from),
          endHeight: BigInt(blockRange.to),
        }),
      );
      console.log(txs);
      const swaps = txs.filter((tx) =>
        tx.txInfo?.transaction?.body?.actions?.some(
          (action) =>
            action.action?.case === 'swap' ||
            action.action?.case === 'swapClaim',
        ),
      );
      console.log(swaps);
      return swaps;
    },
  });
}

export function useSetScanSinceBlock() {
  const { scanSinceBlockHeight, setScanSinceBlockHeight } = useQuestStore();
  const { data: status } = useCurrentChainStatus();
  const latestBlockHeight = Number(status?.syncInfo?.latestBlockHeight ?? 0n);
  useEffect(() => {
    if (
      Number.isNaN(scanSinceBlockHeight) ||
      latestBlockHeight - scanSinceBlockHeight > 100
    ) {
      setScanSinceBlockHeight(latestBlockHeight);
    }
  }, [scanSinceBlockHeight, setScanSinceBlockHeight, latestBlockHeight]);
}
