import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editTrainById } from '@/api';
import { Train } from '@/types/Train';

export const useEditTrain = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: Train) => {
      const data = {
        number: formData.number,
        route: formData.route,
        track: formData.track,
        arrival: formData.arrival,
        departure: formData.departure,
      };

      const result = await editTrainById(id, data);

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trains'] });
    },
  });
};
