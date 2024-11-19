import { useModalContext } from '@/context/modal-context'
import { getPeriods } from '@/http/admin/get-period'
import { triggerToast } from '@/utils/trigger-toast'
import { useQuery } from '@tanstack/react-query'

export interface Period {
  id: string
  startDate: Date
  endDate: Date
}

export function Periods() {
  const {
    isModalOpen,
    modalAction,
    resetModalState,
    setIsModalOpen,
    selectedId,
  } = useModalContext()
  const { success, error } = triggerToast()

  const { data: periods } = useQuery<Period[]>({
    queryKey: ['get-periods'],
    queryFn: getPeriods,
    staleTime: Number.POSITIVE_INFINITY,
  })

  return (
    <div>
      <span>periods</span>
    </div>
  )
}
