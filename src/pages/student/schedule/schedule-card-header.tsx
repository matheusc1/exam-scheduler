interface ScheduleCardHeaderProps {
  discipline: string
  type: string
  selectedDate: string | undefined
  isEditing: boolean
  isScheduled: boolean
}

export function ScheduleCardHeader({
  discipline,
  type,
  selectedDate,
  isEditing,
  isScheduled,
}: ScheduleCardHeaderProps) {
  const formattedType = isScheduled ? type : type === 'mandatory' ? 'A2' : 'A3'

  return (
    <div className="space-y-2">
      <h2 className="font-bold text-lg">
        {discipline} | {formattedType}
      </h2>
      <p className="text-zinc-800 dark:text-zinc-200 text-sm">
        {selectedDate && !isEditing
          ? `Sua avaliação está agendada para o dia ${selectedDate}.`
          : 'Selecione data e horário para agendar sua avaliação:'}
      </p>
    </div>
  )
}
