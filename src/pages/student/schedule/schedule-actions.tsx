import dayjs from 'dayjs'
import { Button } from '../../../components/ui/button'

interface ScheduleActionProps {
  onReSchedule?: () => void
  onCancel: () => void
  isScheduled: boolean
  isSubmitting?: boolean
  scheduledDate?: Date
}

export function ScheduleAction({
  onReSchedule,
  isScheduled,
  isSubmitting,
  scheduledDate,
  onCancel,
}: ScheduleActionProps) {
  const isWithin24Hours = dayjs(scheduledDate).diff(dayjs(), 'hour') < 24

  return isScheduled ? (
    <Button
      type="button"
      disabled={isWithin24Hours}
      onClick={onReSchedule}
      className="w-full transition-colors uppercase bg-gradient-to-r from-[#2CACDD] to-[#0FB091] hover:from-[#1A8AC4] hover:to-[#0C926A]"
    >
      Re-agendar
    </Button>
  ) : (
    <div className="flex items-center gap-3 pt-2">
      <Button
        type="button"
        onClick={onCancel}
        variant="outline"
        className="uppercase py-5 w-button"
      >
        Cancelar
      </Button>
      <Button
        disabled={isSubmitting}
        type="submit"
        className="w-button transition-colors uppercase bg-gradient-to-r from-[#2CACDD] to-[#0FB091] hover:from-[#1A8AC4] hover:to-[#0C926A]"
      >
        Agendar
      </Button>
    </div>
  )
}
