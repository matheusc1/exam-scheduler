import { Dialog } from '@/components/ui/dialog'
import { useModalContext } from '@/context/modal-context'
import { getPeriods } from '@/http/admin/get-period'
import { triggerToast } from '@/utils/trigger-toast'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { PageHeader } from '../components/page-header'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import dayjs from 'dayjs'
import { DropdownMenuActions } from '../components/dropdown-menu'
import { DeleteModal } from '../components/delete-modal'
import { deletePeriod } from '@/http/admin/delete-period'
import { queryClient } from '@/lib/react-query'
import { createPeriod } from '@/http/admin/create-period'
import { useForm } from 'react-hook-form'
import { CreateAndEditModal } from '../components/create-and-edit-modal'
import { Calendar } from '@/components/ui/calendar'
import { ModalFooter } from '../components/modal-footer'
import { updatePeriod } from '@/http/admin/update-period'
import { Label } from '@/components/ui/label'

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
  const [startAndEndDates, setStartAndEndDates] = useState<DateRange>()

  const { data: periods } = useQuery<Period[]>({
    queryKey: ['get-periods'],
    queryFn: getPeriods,
    staleTime: Number.POSITIVE_INFINITY,
  })

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm()

  async function handleDelete() {
    try {
      if (!selectedId) return

      await deletePeriod({ periodId: selectedId })
      queryClient.invalidateQueries({ queryKey: ['get-periods'] })
      success('Registro excluido com sucesso!')
    } catch (err) {
      error('deletar')
    } finally {
      resetModalState()
    }
  }

  async function handleCreatePeriod() {
    try {
      const startDate = dayjs(startAndEndDates?.from).toDate()
      const endDate = dayjs(startAndEndDates?.to).toDate()

      await createPeriod({ startDate, endDate })
      queryClient.invalidateQueries({ queryKey: ['get-periods'] })
      success('Período cadastrado com sucesso')
      handleReset()
    } catch (err) {
      error('criar')
    }
  }

  async function handleEditPeriod() {
    try {
      if (!selectedId) return

      const startDate = dayjs(startAndEndDates?.from).toDate()
      const endDate = dayjs(startAndEndDates?.to).toDate()

      await updatePeriod({ periodId: selectedId, startDate, endDate })

      queryClient.invalidateQueries({ queryKey: ['get-periods'] })
      success('Registro editado com sucesso!')
      handleReset()
    } catch (err) {
      error('editar')
    } finally {
      resetModalState()
    }
  }

  function handleReset() {
    setStartAndEndDates(undefined)
    console.log(startAndEndDates)
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <div className="my-5 w-full space-y-5">
        <PageHeader hasAdd title="Períodos" text="Adicionar período" />

        {!periods?.length ? (
          <div className="text-center font-medium">
            Nenhum período cadastrado!
          </div>
        ) : (
          <Table>
            <TableCaption>Períodos</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Data de início</TableHead>
                <TableHead>Data de término</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {periods?.map(period => (
                <TableRow key={period.id}>
                  <TableCell className="font-medium">
                    {dayjs(period.startDate).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell className="font-medium">
                    {dayjs(period.endDate).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenuActions hasDelete hasEdit itemId={period.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {modalAction === 'delete' && (
          <DeleteModal reset={reset} onDelete={handleDelete} />
        )}

        {(modalAction === 'add' || modalAction === 'edit') && (
          <CreateAndEditModal>
            <form
              className="space-y-3"
              onSubmit={handleSubmit(
                modalAction === 'add' ? handleCreatePeriod : handleEditPeriod
              )}
            >
              <div className="space-y-1">
                <Label>Selecione a data de início e fim</Label>
                <Calendar
                  mode="range"
                  selected={startAndEndDates}
                  onSelect={e => setStartAndEndDates(e)}
                />
              </div>
              <ModalFooter reset={handleReset} isSubmitting={isSubmitting} />
            </form>
          </CreateAndEditModal>
        )}
      </div>
    </Dialog>
  )
}
