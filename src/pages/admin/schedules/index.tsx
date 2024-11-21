import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { getSchedules } from '@/http/coordination/get-schedules'
import type { Schedule } from '@/pages/coordination'
import { formatScheduledDate } from '@/utils/format-scheduled-date'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../components/page-header'

export function Schedules() {
  const { supportCenterId } = useParams()

  const { data: schedules } = useQuery<Schedule[]>({
    queryKey: ['get-schedules', supportCenterId],
    queryFn: () => getSchedules({ supportCenterId: supportCenterId! }),
    enabled: !!supportCenterId,
    staleTime: 10 * (60 * 1000), // 10 min
  })

  return (
    <div className="my-5 w-full space-y-5">
      <PageHeader title="Avaliações agendadas" previousPath="schedules" />

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
