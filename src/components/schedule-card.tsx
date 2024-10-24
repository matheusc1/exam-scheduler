import { LucideChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Calendar } from './ui/calendar'
import { useState } from 'react'
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
} from './ui/select'
import { formatDate } from '@/utils/formatDate'

dayjs.locale('pt-br')

interface ScheduleCardProps {
  discpline: string
  type: string
  availableSlots: {
    time: string
    spots: number
  }[]
}

export function ScheduleCard({
  discpline,
  type,
  availableSlots,
}: ScheduleCardProps) {
  const [date, setDate] = useState<Date | undefined>()
  const [selectedHour, setSelectedHour] = useState('')
  const [cardOpen, setCardOpen] = useState(true)
  const [examScheduled, setExamScheduled] = useState(false)

  function handleSchedule() {
    setCardOpen(false)
    setExamScheduled(true)
  }

  function handleReSchedule() {
    setCardOpen(true)
    setExamScheduled(false)
  }

  function handleSelect(value: string) {
    setSelectedHour(value)
  }

  const selectedDate = date && formatDate(date, selectedHour)

  return (
    <div className="bg-zinc-100 dark:bg-zinc-900 space-y-6 w-89 sm:w-96 p-10 rounded-lg">
      <div className="space-y-2">
        <h2 className="font-bold text-lg">
          {discpline} | {type}
        </h2>
        {cardOpen && (
          <p className="text-zinc-800 dark:text-zinc-200 text-sm">
            Selecione data e horário para agendar sua avaliação:
          </p>
        )}
        {examScheduled && (
          <p className="text-zinc-800 dark:text-zinc-200 text-sm">
            Sua avaliação <span className="font-bold">{type}</span> está
            agendada para o dia{' '}
            <span className="font-bold">{selectedDate}.</span>
          </p>
        )}
      </div>

      {cardOpen && (
        <>
          <div className="space-y-3">
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
                    disabled={[{ dayOfWeek: [0] }, { before: new Date() }]}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Horário</Label>
              <Select onValueChange={handleSelect}>
                <SelectTrigger className="text-zinc-500 dark:text-zinc-400 text-sm font-semibold hover:bg-accent">
                  <SelectValue placeholder="Selecione o horário da sua avaliação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Horários disponíveis</SelectLabel>
                    {availableSlots.map(({ time, spots }) => (
                      <>
                        <SelectItem
                          key={time}
                          value={time}
                          disabled={spots === 0}
                        >
                          {time}
                        </SelectItem>
                      </>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button variant="outline" className="uppercase py-5 w-button">
              Cancelar
            </Button>
            <Button
              onClick={handleSchedule}
              className="w-button transition-colors uppercase bg-gradient-to-r from-[#2CACDD] to-[#0FB091] hover:from-[#1A8AC4] hover:to-[#0C926A]"
            >
              Agendar
            </Button>
          </div>
        </>
      )}

      {examScheduled && (
        <Button
          onClick={handleReSchedule}
          className="w-full transition-colors uppercase bg-gradient-to-r from-[#2CACDD] to-[#0FB091] hover:from-[#1A8AC4] hover:to-[#0C926A]"
        >
          Re-agendar
        </Button>
      )}
    </div>
  )
}
