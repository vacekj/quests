import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface QuestState {
  completedQuests: number[];
  markQuestComplete: (questNumber: number) => void;
  markQuestIncomplete: (questNumber: number) => void;
  completionPercent: () => string;
}

export const useQuestStore = create<QuestState>()(
  persist(
    (set, get) => ({
      completedQuests: [],
      completionPercent: () =>
        (100 * (get().completedQuests.length / 7)).toFixed(0),
      markQuestComplete: (questNumber) =>
        set((state) => ({
          completedQuests: Array.from(
            new Set([...state.completedQuests, questNumber]),
          ),
        })),
      markQuestIncomplete: (questNumber) =>
        set((state) => ({
          completedQuests: state.completedQuests.filter(
            (q) => q !== questNumber,
          ),
        })),
    }),
    {
      name: 'quest-storage',
    },
  ),
);
