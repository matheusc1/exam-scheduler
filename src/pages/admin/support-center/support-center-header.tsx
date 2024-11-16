import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'

interface SupportCenterHeaderProps {
  setModalAction: (action: 'edit' | 'delete' | 'add' | null) => void
}

export function SupportCenterHeader({
  setModalAction,
}: SupportCenterHeaderProps) {
  return (
    <div className="space-y-2">
      <h2 className="font-semibold text-lg">Polos</h2>
      <DialogTrigger asChild>
        <Button onClick={() => setModalAction('add')}>Adicionar polo</Button>
      </DialogTrigger>
    </div>
  )
}
