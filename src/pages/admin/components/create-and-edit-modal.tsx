import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModalContext } from '@/context/modal-context'
import type { ReactNode } from 'react'

interface CreateAndEditModalProps {
  children: ReactNode
}

export function CreateAndEditModal({ children }: CreateAndEditModalProps) {
  const { modalAction } = useModalContext()

  return (
    <DialogContent className="w-96">
      <DialogHeader>
        <DialogTitle>
          {modalAction === 'add' ? 'Adicionar' : 'Editar'} registro
        </DialogTitle>
        <DialogDescription>
          Insira as informações para{' '}
          {modalAction === 'add' ? 'adicionar' : 'editar'} um registro
        </DialogDescription>
      </DialogHeader>
      <div>{children}</div>
    </DialogContent>
  )
}
