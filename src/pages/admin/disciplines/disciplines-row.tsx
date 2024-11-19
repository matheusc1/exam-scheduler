import { TableRow, TableCell } from '@/components/ui/table'
import { DropdownMenuActions } from '../components/dropdown-menu'

export interface DisciplinesTableRowProps {
  discipline: {
    id: string
    name: string
  }
}

export function DisciplinesTableRow({
  discipline,
}: DisciplinesTableRowProps) {
  return (
    <TableRow key={discipline.id}>
      <TableCell className="font-medium">{discipline.name}</TableCell>
      <TableCell className="font-medium">
        <DropdownMenuActions hasDelete hasEdit itemId={discipline.id} />
      </TableCell>
    </TableRow>
  )
}
