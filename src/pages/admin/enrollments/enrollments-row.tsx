import { TableRow, TableCell } from '@/components/ui/table'
import { DropdownMenuActions } from '../components/dropdown-menu'
import dayjs from 'dayjs'

interface EnrollmentsTableRowProps {
  enrollment: {
    id: string
    studentRa: string
    studentName: string
    discipline: string
    periodStartDate: Date
    periodEndDate: Date
  }
}

export function EnrollmentsTableRow({ enrollment }: EnrollmentsTableRowProps) {
  return (
    <TableRow key={enrollment.id}>
      <TableCell className="font-medium">{enrollment.studentRa}</TableCell>
      <TableCell className="font-medium">{enrollment.studentName}</TableCell>
      <TableCell className="font-medium">{enrollment.discipline}</TableCell>
      <TableCell className="font-medium">
        {dayjs(enrollment.periodStartDate).format('DD/MM/YYYY')}
      </TableCell>
      <TableCell className="font-medium">
        {dayjs(enrollment.periodEndDate).format('DD/MM/YYYY')}
      </TableCell>
      <TableCell>
        <DropdownMenuActions hasDelete hasEdit itemId={enrollment.id} />
      </TableCell>
    </TableRow>
  )
}
