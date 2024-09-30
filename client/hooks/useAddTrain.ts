import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Train } from '@/types/Train';
import { createTrain } from '../api';

export const useAddTrain = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: Train) => {
      const result = await createTrain(formData);

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trains'] });
    },
  });
};
