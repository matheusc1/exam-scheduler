import { Button } from '../../../components/ui/button'

interface ScheduleActionProps {
  onSchedule?: () => void
  onReSchedule?: () => void
  isScheduled: boolean
}

export function ScheduleAction({
  onSchedule,
  onReSchedule,
  isScheduled,
}: ScheduleActionProps) {
  return isScheduled ? (
    <Button
      onClick={onReSchedule}
      className="w-full transition-colors uppercase bg-gradient-to-r from-[#2CACDD] to-[#0FB091] hover:from-[#1A8AC4] hover:to-[#0C926A]"
    >
      Re-agendar
    </Button>
  ) : (
    <div className="flex items-center gap-3 pt-2">
      <Button variant="outline" className="uppercase py-5 w-button">
        Cancelar
      </Button>
      <Button
        onClick={onSchedule}
        className="w-button transition-colors uppercase bg-gradient-to-r from-[#2CACDD] to-[#0FB091] hover:from-[#1A8AC4] hover:to-[#0C926A]"
      >
        Agendar
      </Button>
    </div>
  )
}
