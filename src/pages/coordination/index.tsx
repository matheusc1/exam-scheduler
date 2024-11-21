import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getSchedules } from '@/http/coordination/get-schedules'
import { formatScheduledDate } from '@/utils/format-scheduled-date'
import { useQuery } from '@tanstack/react-query'
import { LucideChevronLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

export interface Schedule {
  id: string
  studentName: string
  disciplineName: string
  scheduledDate: Date
  type: string
}

export function CoordinationPage() {
  const { supportCenterId } = useParams()

  const { data: schedules } = useQuery<Schedule[]>({
    queryKey: ['get-schedules', supportCenterId],
    queryFn: () => {
      if (supportCenterId) {
        return getSchedules({ supportCenterId })
      }
      return []
    },
    enabled: !!supportCenterId,
    staleTime: 10 * (60 * 1000), // 10 min
  })

  return (
    <div className="my-5 w-full space-y-5">
      <div className="flex items-center gap-2">
        <Link to={'/coordination/select'}>
          <LucideChevronLeft className="size-4 hover:opacity-50" />
        </Link>
        <h2 className="font-semibold text-lg">Avaliações agendadas</h2>
      </div>

      <Table>
        <TableCaption>
          {!schedules?.length ? 'Nenhuma avaliação agendada!' : 'Agendamentos'}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Aluno</TableHead>
            <TableHead>Disciplina</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Tipo</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {schedules?.map(schedule => (
            <TableRow key={schedule.id}>
              <TableCell className="font-medium w-72">
                {schedule.studentName}
              </TableCell>
              <TableCell className="font-medium">
                {schedule.disciplineName}
              </TableCell>
              <TableCell className="font-medium">
                {formatScheduledDate(schedule.scheduledDate)}
              </TableCell>
              <TableCell className="font-medium text-right">
                {schedule.type}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
