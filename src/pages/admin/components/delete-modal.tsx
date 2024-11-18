import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ModalFooter } from './modal-footer'

interface deleteModalProps {
  onDelete: () => void
  reset: () => void
}

export function DeleteModal({ onDelete, reset }: deleteModalProps) {
  return (
    <DialogContent className="w-96">
      <DialogHeader>
        <DialogTitle>Deseja deletar este(s) registro(s)?</DialogTitle>
        <DialogDescription>
          Essa ação não pode ser desfeita. Tem certeza que deseja deletar
          permanentemente este(s) registro(s) do servidor?
        </DialogDescription>
      </DialogHeader>
      <ModalFooter reset={reset} onConfirm={onDelete} />
    </DialogContent>
  )
}
