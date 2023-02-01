import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { getItem } from '../services/localStorageService';

interface HabitListProps {
  date: Date;
  onCompletedChange: (completed: number) => void;
}

type HabitsInfo = {
  possibleHabits: Array<{ id: string; title: string; created_at: string }>;
  completedHabits: string[];
};

export function HabitList({ date, onCompletedChange }: HabitListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  useEffect(() => {
    api
      .get('day', {
        params: { date: date.toISOString(), userId: getItem('user-id') },
      })
      .then((response) => {
        setHabitsInfo(response.data);
      });
  }, []);

  const handleToggleHabit = async (habitId: string) => {
    await api.patch(`/habits/${habitId}/toggle`);

    const isHabitAlreadyCompleted =
      habitsInfo!.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }
    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });

    onCompletedChange(completedHabits.length);
  };

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  return (
    <div className='mt-6 flex flex-col gap-3'>
      {habitsInfo?.possibleHabits.map((habitInfo) => (
        <Checkbox.Root
          key={habitInfo.id}
          className='flex items-center gap-3 group disabled:cursor-not-allowed focus:outline-none'
          onCheckedChange={() => {
            handleToggleHabit(habitInfo.id);
          }}
          disabled={isDateInPast}
          checked={habitsInfo.completedHabits.includes(habitInfo.id)}
        >
          <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background'>
            <Checkbox.Indicator>
              <Check size={20} className='text-white' />
            </Checkbox.Indicator>
          </div>
          <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
            {habitInfo.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  );
}
