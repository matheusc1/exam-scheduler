import { Button } from '@/components/ui/button'
import { ModalAction, useModalContext } from '@/context/modal-context'
import { LucideChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

interface SupportCenterHeaderProps {
  previousPath?: string
  title: string
  text: string
  hasAdd?: boolean
  hasDeleteAll?: boolean
}

export function PageHeader({
  previousPath,
  title,
  text,
  hasAdd,
  hasDeleteAll,
}: SupportCenterHeaderProps) {
  const { setModalAction, setIsModalOpen } = useModalContext()

  return (
    <div className="space-y-2">
      {previousPath ? (
        <div className="flex items-center gap-2">
          <Link to={`/admin/${previousPath}`}>
            <LucideChevronLeft className="size-4 hover:opacity-50" />
          </Link>
          <h2 className="font-semibold text-lg">{title}</h2>
        </div>
      ) : (
        <h2 className="font-semibold text-lg">{title}</h2>
      )}

      {hasAdd && hasDeleteAll ? (
        <div className="flex items-center justify-between gap-4">
          <Button
            onClick={() => {
              setModalAction(ModalAction.Add)
              setIsModalOpen(true)
            }}
          >
            {text}
          </Button>

          <Button
            variant="destructive"
            onClick={() => {
              setModalAction(ModalAction.DeleteAll)
              setIsModalOpen(true)
            }}
          >
            Deletar todos os registros
          </Button>
        </div>
      ) : (
        <>
          {hasAdd && (
            <Button
              onClick={() => {
                setModalAction(ModalAction.Add)
                setIsModalOpen(true)
              }}
            >
              {text}
            </Button>
          )}
          {hasDeleteAll && (
            <Button
              variant="destructive"
              onClick={() => {
                setModalAction(ModalAction.DeleteAll)
                setIsModalOpen(true)
              }}
            >
              Deletar todos os registros
            </Button>
          )}
        </>
      )}
    </div>
  )
}
