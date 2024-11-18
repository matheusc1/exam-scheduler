import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { useModalContext, ModalAction } from '@/context/modal-context'
import { LucideMoreHorizontal, LucideEdit2, LucideTrash2 } from 'lucide-react'

interface DropdownMenuActionsProps {
  itemId: string
  hasEdit: boolean
  hasDelete: boolean
}

export function DropdownMenuActions({
  itemId,
  hasEdit,
  hasDelete,
}: DropdownMenuActionsProps) {
  const { setModalAction, setSelectedId, setIsModalOpen } = useModalContext()

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
          <DropdownMenuItem
            onClick={() => {
              setModalAction(ModalAction.Edit)
              setIsModalOpen(true)
              setSelectedId(itemId)
            }}
          >
            <LucideEdit2 className="size-4" />
            <span>Editar</span>
          </DropdownMenuItem>
        )}

        <Separator className="my-1" />
        {hasDelete && (
          <DropdownMenuItem
            onClick={() => {
              setModalAction(ModalAction.Delete)
              setIsModalOpen(true)
              setSelectedId(itemId)
            }}
          >
            <LucideTrash2 className="size-4 text-red-500" />
            <span className="text-red-500">Excluir</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
