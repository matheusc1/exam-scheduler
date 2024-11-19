import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { ReactNode } from 'react'

interface CreateAndEditModalProps {
  children: ReactNode
}

export function CreateAndEditModal({ children }: CreateAndEditModalProps) {
  return (
    <DialogContent className="w-96">
      <DialogHeader>
        <DialogTitle>Adicionar/Editar registro</DialogTitle>
        <DialogDescription>
          Insira as informações para adicionar ou editar um registro
        </DialogDescription>
      </DialogHeader>
      <div>{children}</div>
    </DialogContent>
  )
}
