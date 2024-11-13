import { LucideChevronDown } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Label } from '../../../components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover'
import { Calendar } from '../../../components/ui/calendar'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

interface ScheduleDatePickerProps {
  availableDates: Date[]
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

export function ScheduleDatePicker({
  availableDates,
  date,
  setDate,
}: ScheduleDatePickerProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">Data</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex justify-between p-3 items-center w-full"
          >
            <span className="text-zinc-500 dark:text-zinc-400 text-sm font-semibold">
              {!date && 'Selecione a data da sua avaliação'}
              {date && dayjs(date).format('DD [de] MMMM [de] YYYY')}
            </span>
            <LucideChevronDown className="size-4 text-zinc-500" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            initialFocus
            selected={date}
            onSelect={setDate}
            disabled={date => {
              return (
                !availableDates?.some(availableDate =>
                  dayjs(date).isSame(availableDate, 'day')
                ) || dayjs(date).isBefore(dayjs(), 'day')
              )
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
