import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { getPastSchedules } from '@/http/admin/get-past-schedules'
import type { Schedule } from '@/pages/coordination'
import { formatScheduledDate } from '@/utils/format-scheduled-date'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../components/page-header'

export function PastSchedules() {
  const { supportCenterId } = useParams()

  const { data: schedules } = useQuery<Schedule[]>({
    queryKey: ['get-past-schedules', supportCenterId],
    queryFn: () => getPastSchedules({ supportCenterId: supportCenterId! }),
    enabled: !!supportCenterId,
    staleTime: 10 * (60 * 1000), // 600 min
  })

  return (
    <div className="my-5 w-full space-y-5">
      <PageHeader title="Avaliações passadas" previousPath="past-schedules" />

      {!schedules?.length ? (
        <div className="text-center font-medium">
          Nenhum avaliação passada encontrada!
        </div>
      ) : (
        <Table>
          <TableCaption>Avaliações passadas</TableCaption>
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
      )}
    </div>
  )
}
