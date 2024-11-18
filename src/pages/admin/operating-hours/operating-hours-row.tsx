import { TableRow, TableCell } from '@/components/ui/table'
import { DropdownMenuActions } from '../components/dropdown-menu'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import type { ModalAction } from '@/context/modal-context'
dayjs.locale('pt-br')

export interface OperatingHoursTableRowProps {
  operatingHour: {
    id: string
    weekDay: number
    openTime: string
    closeTime: string
  }
  setModalAction: (action: ModalAction) => void
}

export function OperatingHoursRow({
  operatingHour,
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
        <DropdownMenuActions hasDelete hasEdit itemId={operatingHour.id} />
      </TableCell>
    </TableRow>
  )
}
