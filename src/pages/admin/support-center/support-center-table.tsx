import { TableRow, TableCell } from '@/components/ui/table'
import { DropdownMenuActions } from '../components/dropdown-menu'

export interface SupportCenterTableRowProps {
  supportCenter: {
    id: string
    name: string
    numberOfComputers: number
  }
  setModalAction: (action: 'edit' | 'delete' | 'add' | null) => void
  setId: (id: string) => void
}

export function SupportCenterTableRow({
  supportCenter,
  setModalAction,
  setId,
}: SupportCenterTableRowProps) {
  return (
    <TableRow key={supportCenter.id}>
      <TableCell className="font-medium">{supportCenter.name}</TableCell>
      <TableCell className="font-medium">
        {supportCenter.numberOfComputers}
      </TableCell>
      <TableCell className="font-medium">
        <DropdownMenuActions
          hasDelete
          hasEdit
          setModalAction={setModalAction}
          setId={setId}
          itemId={supportCenter.id}
        />
      </TableCell>
    </TableRow>
  )
}
