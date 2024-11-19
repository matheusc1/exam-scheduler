import { TableCell, TableRow } from '@/components/ui/table'
import { DropdownMenuActions } from '../components/dropdown-menu'

interface StudentTableRowProps {
  student: {
    id: string
    ra: string
    name: string
    email: string
    birthDate: Date
    supportCenter: string
  }
}

export function StudentTableRow({ student }: StudentTableRowProps) {
  return (
    <TableRow key={student.id}>
      <TableCell className="font-medium">{student.ra}</TableCell>
      <TableCell className="font-medium">{student.name}</TableCell>
      <TableCell className="font-medium">{student.email}</TableCell>
      <TableCell className="font-medium">
        {student.birthDate.toString()}
      </TableCell>
      <TableCell className="font-medium">{student.supportCenter}</TableCell>
      <TableCell>
        <DropdownMenuActions hasDelete hasEdit itemId={student.ra} />
      </TableCell>
    </TableRow>
  )
}
