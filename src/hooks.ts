import { client } from '@/src/penumbra';
import {
  PenumbraClient,
  type PenumbraManifest,
  PenumbraRequestFailure,
  PenumbraState,
} from '@penumbra-zone/client';
import { ViewService } from '@penumbra-zone/protobuf';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

// Common react api for fetching wallet data to render the list of injected wallets
export const useWalletManifests = () => {
  const [manifests, setManifests] = useState<Record<string, PenumbraManifest>>(
    {},
  );
  const [loading, setLoading] = useState<boolean>(true);

  const loadManifests = async () => {
    setLoading(true);
    const res = PenumbraClient.getProviderManifests();
    const resolvedManifests = await Promise.all(
      Object.entries(res).map(async ([key, promise]) => {
        const value = await promise;
        return [key, value];
      }),
    );
    setManifests(Object.fromEntries(resolvedManifests));
    setLoading(false);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    loadManifests();
  }, []);

  return { data: manifests, loading };
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
type UseBalancesProps = {
  accountSelector?: string;
};

export function useBalances(props?: UseBalancesProps) {
  const balances = useQuery({
    queryKey: ['balances'],
    queryFn: async () => {
      const notes = client
        .service(ViewService)
        .notes({ addressIndex: { account: 0 } });

      const balances = await Array.fromAsync(
        client.service(ViewService).balances({}),
      );

      console.log(balances);
      return balances;
    },
  });

  return balances;
}
