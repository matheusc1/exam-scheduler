import { TableRow, TableCell } from '@/components/ui/table'
import { DropdownMenuActions } from '../components/dropdown-menu'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

export interface OperatingHoursTableRowProps {
  operatingHour: {
    id: string
    weekDay: number
    openTime: string
    closeTime: string
  }
  setModalAction: (action: 'edit' | 'delete' | 'add' | null) => void
  setId: (id: string) => void
}

export function OperatingHoursTableRow({
  operatingHour,
  setModalAction,
  setId,
}: OperatingHoursTableRowProps) {
  return (
    <TableRow key={operatingHour.id}>
      <TableCell className="font-medium capitalize">
        {dayjs().day(operatingHour.weekDay).format('dddd')}
      </TableCell>
      <TableCell className="font-medium">
        {dayjs(`1970-01-01T${operatingHour.openTime}`).format('HH:mm')}
      </TableCell>
      <TableCell className="font-medium">
        {dayjs(`1970-01-01T${operatingHour.closeTime}`).format('HH:mm')}
      </TableCell>
      <TableCell className="font-medium">
        <DropdownMenuActions
          hasDelete
          hasEdit
          setModalAction={setModalAction}
          setId={setId}
          itemId={operatingHour.id}
        />
      </TableCell>
    </TableRow>
  )
}
