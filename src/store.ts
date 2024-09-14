import create from 'zustand';
import { persist } from 'zustand/middleware';

interface QuestState {
  completedQuests: number[];
  markQuestComplete: (questNumber: number) => void;
  markQuestIncomplete: (questNumber: number) => void;
}

export const useQuestStore = create<QuestState>()(
  persist(
    (set) => ({
      completedQuests: [],
      markQuestComplete: (questNumber) =>
        set((state) => ({
          completedQuests: Array.from(new Set([...state.completedQuests, questNumber])),
        })),
      markQuestIncomplete: (questNumber) =>
        set((state) => ({
          completedQuests: state.completedQuests.filter((q) => q !== questNumber),
        })),
    }),
    {
      name: 'quest-storage',
    }
  )
);
