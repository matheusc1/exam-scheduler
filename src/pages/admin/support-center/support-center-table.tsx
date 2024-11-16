import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { TableRow, TableCell } from '@/components/ui/table'

import { LucideMoreHorizontal, LucideEdit2, LucideTrash2 } from 'lucide-react'

export interface SupportCenterTableRowProps {
  supportCenter: {
    id: string
    name: string
    numberOfComputers: number
  }
  setModalAction: (action: 'edit' | 'delete' | 'add' | null) => void
  setSelectedSupportCenterId: (id: string) => void
}

export function SupportCenterTableRow({
  supportCenter,
  setModalAction,
  setSelectedSupportCenterId,
}: SupportCenterTableRowProps) {
  return (
    <TableRow key={supportCenter.id}>
      <TableCell className="font-medium">{supportCenter.name}</TableCell>
      <TableCell className="font-medium">
        {supportCenter.numberOfComputers}
      </TableCell>
      <TableCell className="font-medium">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <LucideMoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DialogTrigger
              asChild
              onClick={() => {
                setModalAction('edit')
                setSelectedSupportCenterId(supportCenter.id)
              }}
            >
              <DropdownMenuItem>
                <LucideEdit2 className="size-4" />
                <span>Editar</span>
              </DropdownMenuItem>
            </DialogTrigger>

            <Separator className="my-1" />

            <DialogTrigger
              asChild
              onClick={() => {
                setModalAction('delete')
                setSelectedSupportCenterId(supportCenter.id)
              }}
            >
              <DropdownMenuItem>
                <LucideTrash2 className="size-4 text-red-500" />
                <span className="text-red-500">Excluir</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
