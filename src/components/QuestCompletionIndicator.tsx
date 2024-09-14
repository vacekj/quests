import { useQuestStore } from '../store';

interface QuestCompletionIndicatorProps {
  questNumber: number;
}

const QuestCompletionIndicator: React.FC<QuestCompletionIndicatorProps> = ({
  questNumber,
}) => {
  const { completionPercent } = useQuestStore();

  return completionPercent();
};

export default QuestCompletionIndicator;
