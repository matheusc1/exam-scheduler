import { Label } from '../../../components/ui/label'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import type { Slot } from './schedule-card'

dayjs.locale('pt-br')

interface ScheduleTimePickerProps {
  slots: Slot[] | undefined
  selectedHour: string
  onSelect: (value: string) => void
}

export function ScheduleTimePicker({
  slots,
  selectedHour,
  onSelect,
}: ScheduleTimePickerProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">Horário</Label>
      <Select value={selectedHour} onValueChange={onSelect}>
        <SelectTrigger className="text-zinc-500 dark:text-zinc-400 text-sm font-semibold hover:bg-accent">
          <SelectValue placeholder="Selecione o horário da sua avaliação" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Horários disponíveis</SelectLabel>
            {slots?.map(({ id, time, availableSlots }) => (
              <SelectItem key={id} value={time} disabled={availableSlots < 1}>
                {dayjs(`1970-01-01T${time}`).format('HH:mm')}
              </SelectItem>
            ))}
            {!slots?.length && (
              <SelectItem value="null" disabled>
                Nenhum horário disponível
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
