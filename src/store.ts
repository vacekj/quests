import Deposit from '@/src/components/Deposit.tsx';
import Disconnect from '@/src/components/Disconnect.tsx';
import Staking from '@/src/components/Staking.tsx';
import Swap from '@/src/components/Swap.tsx';
import WalletInstall from '@/src/components/WalletInstall.tsx';
import { fadeConfig } from '@chakra-ui/react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface QuestState {
  completedQuests: Record<QuestPath, boolean>;
  markQuestComplete: (questPath: string) => void;
  markQuestIncomplete: (questPath: string) => void;
  completionPercent: () => number;
}

type QuestPath = keyof typeof quests;

export const quests: Record<string, React.FC> = {
  wallet: WalletInstall,
  deposit: Deposit,
  // swap: Swap,
  stake: Staking,
  // vote: null,
  disconnect: Disconnect,
} as const;

export const questNames: Record<QuestPath, string> = {
  wallet: 'Setup a Wallet',
  deposit: 'Deposit funds',
  // swap: 'Swap tokens',
  stake: 'Stake UM',
  // vote: null,
  disconnect: 'Disconnect wallet',
};

export const useQuestStore = create<QuestState>()(
  persist(
    (set, get) => ({
      completedQuests: Object.fromEntries(
        Object.keys(quests).map((key) => [key, false]),
      ),
      completionPercent: () => 0,
      markQuestComplete: (questPath) =>
        set((state) => ({
          completedQuests: { ...state.completedQuests, [questPath]: true },
        })),
      markQuestIncomplete: (questPath) =>
        set((state) => ({
          completedQuests: { ...state.completedQuests, [questPath]: false },
        })),
    }),
    {
      name: 'quest-storage',
    },
  ),
);
