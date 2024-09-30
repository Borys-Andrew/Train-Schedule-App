'use client';

import { useState } from 'react';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';
import { ArrowUpDown } from 'lucide-react';

import { useRemoveTrain } from '@/hooks/useRemoveTrain';
import { useEditTrain } from '@/hooks/useEditTrain';
import { Train } from '@/types/Train';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TrainModal from '@/components/trainModal';
import Loader from '@/components/loader';

const ActionsMenu = ({ row }: CellContext<Train, unknown>) => {
  const [isModal, setIsModal] = useState(false);
  const [trainToEdit, setTrainToEdit] = useState<Train | undefined>(undefined);
  const { mutateAsync: editTrain, isPending: isLoading } = useEditTrain(
    trainToEdit?.id as string,
  );
  const { mutateAsync: removeTrainById, isPending } = useRemoveTrain();

  const train = row.original;
  return (
    <>
      {isModal && (
        <TrainModal
          onClose={setIsModal}
          isEditMode={true}
          train={trainToEdit}
          onHandleEditTrain={editTrain}
        />
      )}
      {(isPending || isLoading) && <Loader />}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setIsModal(true);
              setTrainToEdit(train);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              removeTrainById(train.id as string);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const columns: ColumnDef<Train>[] = [
  {
    accessorKey: 'number',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'route',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Route
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'track',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Track
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: 'arrival',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Arrival
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'departure',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Departure
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: () => 'Actions',
    id: 'actions',
    cell: ActionsMenu,
  },
];
