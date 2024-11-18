import { Button } from '@/components/ui/button'
import { useModalContext } from '@/context/modal-context'
import type { UseFormReset } from 'react-hook-form'

export interface DialogFooterProps {
  isSubmitting?: boolean
  onConfirm?: () => void
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  reset: UseFormReset<any>
}

export function ModalFooter({
  isSubmitting,
  onConfirm,
  reset,
}: DialogFooterProps) {
  const { resetModalState } = useModalContext()

  return (
    <div className="flex justify-end gap-4">
      <Button
        onClick={() => {
          resetModalState()
          reset()
        }}
        variant="outline"
        type="button"
      >
        Cancelar
      </Button>

      <Button disabled={isSubmitting} onClick={onConfirm} type="submit">
        Confirmar
      </Button>
    </div>
  )
}
