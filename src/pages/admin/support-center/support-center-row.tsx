import { TableRow, TableCell } from '@/components/ui/table'
import { DropdownMenuActions } from '../components/dropdown-menu'

export interface SupportCenterTableRowProps {
  supportCenter: {
    id: string
    name: string
    numberOfComputers: number
  }
}

export function SupportCenterTableRow({
  supportCenter,
}: SupportCenterTableRowProps) {
  return (
    <TableRow key={supportCenter.id}>
      <TableCell className="font-medium">{supportCenter.name}</TableCell>
      <TableCell className="font-medium">
        {supportCenter.numberOfComputers}
      </TableCell>
      <TableCell className="font-medium">
        <DropdownMenuActions hasDelete hasEdit itemId={supportCenter.id} />
      </TableCell>
    </TableRow>
  )
}
