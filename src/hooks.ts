import { client } from '@/src/penumbra';
import {
  PenumbraClient,
  type PenumbraManifest,
  PenumbraRequestFailure,
  PenumbraState,
} from '@penumbra-zone/client';
import { TendermintProxyService, ViewService } from '@penumbra-zone/protobuf';
import { useQuery } from '@tanstack/react-query';
import { uniqBy } from 'es-toolkit';
import { useEffect, useState } from 'react';

// Common react api for fetching wallet data to render the list of injected wallets
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
  const [connectionLoading, setConnectionLoading] = useState<boolean>(false);
  const [connected, setConnected] = useState<string>();

  const reconnect = async () => {
    const providers = PenumbraClient.getProviders();
    const connected = Object.keys(providers).find((origin) =>
      PenumbraClient.isProviderConnected(origin),
    );
    if (!connected) return;
    try {
      await client.connect(connected);
      setConnected(connected);
    } catch (error) {
      /* no-op */
    }
  };

  const onConnect = async (origin: string) => {
    try {
      setConnectionLoading(true);
      await client.connect(origin);
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
    } finally {
      setConnectionLoading(false);
    }
  };

  const onDisconnect = async () => {
    if (!client.connected) return;
    try {
      await client.disconnect();
    } catch (error) {
      console.error(error);
    }
  };

  // Monitors the connection
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // If Prax is connected on page load, reconnect to ensure the connection is still active
    reconnect();
    client.onConnectionStateChange((event) => {
      if (event.state === PenumbraState.Connected) {
        setConnected(event.origin);
      } else {
        setConnected(undefined);
      }
    });
  }, []);

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

export function useNotes() {
  const { connected } = useConnect();
  return useQuery({
    queryKey: ['notes', connected],
    staleTime: 0,
    queryFn: async () => {
      const notes = await Array.fromAsync(
        client.service(ViewService).notes({}),
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
