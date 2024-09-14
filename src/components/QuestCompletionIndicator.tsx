// src/components/QuestCompletionIndicator.tsx
import { useQuestStore } from '../store';
import { Text } from '@penumbra-zone/ui/Text';

interface QuestCompletionIndicatorProps {
  questNumber: number;
}

const QuestCompletionIndicator: React.FC<QuestCompletionIndicatorProps> = ({ questNumber }) => {
  const { completedQuests } = useQuestStore();
  const isCompleted = completedQuests.includes(questNumber);

  return (
    <div>
      {isCompleted ? (
        <Text body color={() => 'text-green-500'}>
          ✅ Quest {questNumber} Completed!
        </Text>
      ) : (
        <Text body color={() => 'text-red-500'}>
          ❌ Quest {questNumber} Incomplete
        </Text>
      )}
    </div>
  );
};

export default QuestCompletionIndicator;
