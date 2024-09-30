import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeTrainById } from '@/api';

export const useRemoveTrain = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await removeTrainById(id);

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trains'] });
    },
  });
};
