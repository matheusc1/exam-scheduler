import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { LucideMoreHorizontal, LucideEdit2, LucideTrash2 } from 'lucide-react'

interface DropdownMenuActionsProps {
  setModalAction: (action: 'edit' | 'delete' | null) => void
  setId: (id: string) => void
  itemId: string
  hasEdit: boolean
  hasDelete: boolean
}

export function DropdownMenuActions({
  setModalAction,
  setId,
  itemId,
  hasEdit,
  hasDelete,
}: DropdownMenuActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <LucideMoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {hasEdit && (
          <DialogTrigger
            asChild
            onClick={() => {
              setModalAction('edit')
              setId(itemId)
            }}
          >
            <DropdownMenuItem>
              <LucideEdit2 className="size-4" />
              <span>Editar</span>
            </DropdownMenuItem>
          </DialogTrigger>
        )}

        <Separator className="my-1" />
        {hasDelete && (
          <DialogTrigger
            asChild
            onClick={() => {
              setModalAction('delete')
              setId(itemId)
            }}
          >
            <DropdownMenuItem>
              <LucideTrash2 className="size-4 text-red-500" />
              <span className="text-red-500">Excluir</span>
            </DropdownMenuItem>
          </DialogTrigger>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
