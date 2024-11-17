import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'

interface SupportCenterHeaderProps {
  title: string
  text: string
  setModalAction: (action: 'edit' | 'delete' | 'add' | null) => void
}

export function PageHeader({
  title,
  text,
  setModalAction,
}: SupportCenterHeaderProps) {
  return (
    <div className="space-y-2">
      <h2 className="font-semibold text-lg">{title}</h2>
      <DialogTrigger asChild>
        <Button onClick={() => setModalAction('add')}>{text}</Button>
      </DialogTrigger>
    </div>
  )
}
