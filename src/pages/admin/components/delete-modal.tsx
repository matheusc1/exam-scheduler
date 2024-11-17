import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface deleteModalProps {
  onCancel: () => void
  onDelete: () => void
}

export function DeleteModal({ onCancel, onDelete }: deleteModalProps) {
  return (
    <DialogContent className="w-96">
      <DialogHeader>
        <DialogTitle>Deseja deletar este(s) registro(s)?</DialogTitle>
        <DialogDescription>
          Essa ação não pode ser desfeita. Tem certeza que deseja deletar
          permanentemente este(s) registro(s) do servidor?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={onCancel} variant="outline" type="button">
          Cancelar
        </Button>
        <Button onClick={onDelete} type="submit">
          Confirmar
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
