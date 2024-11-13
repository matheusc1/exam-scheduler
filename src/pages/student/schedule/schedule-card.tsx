import { useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { formatDate } from '@/utils/formatDate'
import { useAuth } from '@/context/authContext'
import { getAvailableDates } from '@/http/student/get-available-dates'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getSlots } from '@/http/student/get-slots'
import { createSchedule } from '@/http/student/create-schedule'
import { updateSchedule } from '@/http/student/update-schedule'

import { ScheduleAction } from './schedule-actions'
import { ScheduleCardHeader } from './schedule-card-header'
import { ScheduleDatePicker } from './schedule-date-picker'
import { ScheduleTimePicker } from './schedule-time-picker'
import { toast } from '@/hooks/use-toast'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'

dayjs.locale('pt-br')

export interface Slot {
  id: string
  time: string
  availableSlots: number
}

interface ScheduleCardProps {
  discipline: string
  type: string
  enrollmentId: string
  scheduledDate?: Date
  isScheduled?: boolean
  scheduleId?: string
}

const scheduleForm = z.object({
  date: z.date(),
  selectedHour: z.string(),
})

type ScheduleForm = z.infer<typeof scheduleForm>

export function ScheduleCard({
  discipline,
  type,
  enrollmentId,
  scheduledDate,
  isScheduled,
  scheduleId,
}: ScheduleCardProps) {
  const queryClient = useQueryClient()
  const { student } = useAuth()

  const [isEditing, setIsEditing] = useState(false)

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<ScheduleForm>()

  const { date } = watch()

  const { data: availableDates } = useQuery<Date[]>({
    queryKey: ['get-available-dates'],
    queryFn: async () => {
      const availableDates = await getAvailableDates({
        supportCenterId: student?.supportCenter.id!,
      })
      return availableDates.map((date: string) => dayjs(date).toISOString())
    },
    enabled: !!student?.supportCenter.id,
    staleTime: Number.POSITIVE_INFINITY,
  })

  const { data: slots } = useQuery<Slot[]>({
    queryKey: ['get-slots'],
    queryFn: () =>
      getSlots({
        supportCenterId: student?.supportCenter.id!,
        selectedDate: date,
      }),
    enabled: !!student?.supportCenter.id && !!date,
  })

  async function handleSchedule({ date, selectedHour }: ScheduleForm) {
    try {
      const selectedDate = dayjs(date)
        .set('hour', Number.parseInt(selectedHour.split(':')[0]))
        .set('minute', Number.parseInt(selectedHour.split(':')[1]))
        .set('second', 0)

      const scheduledDate = selectedDate.format()

      if (isEditing) {
        await updateSchedule({
          scheduleId: scheduleId!,
          newScheduledDate: scheduledDate,
        })
        setIsEditing(false)
      } else {
        await createSchedule({
          enrollmentId,
          type,
          scheduledDate,
        })
      }
      toast({
        title: 'Avaliação agendada com sucesso!',
      })
      reset()
    } catch (err) {
      console.error(err)
      toast({
        variant: 'destructive',
        title: 'Error ao agendar avaliação',
        description:
          'Ocorreu um erro ao agendar a avaliação, tente novamente mais tarde!',
      })
    } finally {
      queryClient.invalidateQueries({ queryKey: ['get-enrollments'] })
      queryClient.invalidateQueries({ queryKey: ['get-scheduled-exams'] })
      queryClient.invalidateQueries({ queryKey: ['get-slots'] })
    }
  }

  return (
    <div className="bg-zinc-100 dark:bg-zinc-900 space-y-6 w-89 sm:w-96 p-10 rounded-lg">
      <ScheduleCardHeader
        isScheduled={isScheduled || false}
        isEditing={isEditing}
        discipline={discipline}
        type={type}
        selectedDate={
          scheduledDate && formatDate(dayjs(scheduledDate).format())
        }
      />

      {isScheduled && !isEditing ? (
        <ScheduleAction
          scheduledDate={scheduledDate}
          onReSchedule={() => setIsEditing(true)}
          isScheduled={true}
        />
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit(handleSchedule)}>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <ScheduleDatePicker
                availableDates={availableDates!}
                date={field.value}
                setDate={(value: Date) => setValue('date', value)}
              />
            )}
          />
          <Controller
            name="selectedHour"
            control={control}
            render={({ field }) => (
              <ScheduleTimePicker
                slots={slots}
                selectedHour={field.value}
                onSelect={hour => setValue('selectedHour', hour)}
              />
            )}
          />

          <ScheduleAction isSubmitting={isSubmitting} isScheduled={false} />
        </form>
      )}
    </div>
  )
}
