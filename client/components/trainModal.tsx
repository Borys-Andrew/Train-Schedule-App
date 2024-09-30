'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Train } from '@/types/Train';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formFields: Array<{
  label: string;
  name: 'id' | 'number' | 'route' | 'track' | 'arrival' | 'departure';
  type: 'text' | 'number' | 'time';
}> = [
  {
    label: 'Train Number',
    name: 'number',
    type: 'text',
  },
  {
    label: 'Route',
    name: 'route',
    type: 'text',
  },
  {
    label: 'Track',
    name: 'track',
    type: 'number',
  },
  {
    label: 'Arrival Time',
    name: 'arrival',
    type: 'time',
  },
  {
    label: 'Departure Time',
    name: 'departure',
    type: 'time',
  },
];

const formSchema = z.object({
  id: z.string().optional(),
  number: z.string().nonempty({
    message: 'Train number is required',
  }),
  route: z.string().nonempty({
    message: 'Route is required',
  }),
  track: z.coerce.number().min(1, {
    message: 'Track number must be a positive number',
  }),
  arrival: z.string().nonempty(),
  departure: z.string().nonempty(),
});

type TrainFormProps = {
  onHandleEditTrain?: (data: Train) => void;
  onHandleAddTrain?: (data: Train) => void;
  isEditMode?: boolean;
  train?: Train;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose?: any;
};

export default function TrainModal({
  train,
  onHandleAddTrain,
  onHandleEditTrain,
  onClose,
  isEditMode = false,
}: TrainFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: train || {
      number: '',
      route: '',
      track: 0,
      arrival: '',
      departure: '',
    },
  });

  const onSubmit = async (formData: Train) => {
    if (onHandleAddTrain) {
      await onHandleAddTrain(formData);
      onClose(false);
    }
    if (onHandleEditTrain) {
      await onHandleEditTrain(formData);
      onClose(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="h-screen flex items-center justify-center px-2 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col border rounded-md p-6 w-96 bg-background"
          >
            <h1 className="text-4xl text-center mb-4">
              {isEditMode ? 'Edit Train' : 'Add Train'}
            </h1>
            {formFields.map(({ name, label, type }) => {
              return (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input
                          type={type}
                          placeholder={`${label}...`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}
            <div className="flex gap-6 justify-center mt-4">
              <Button type="submit">Submit</Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => onClose(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
