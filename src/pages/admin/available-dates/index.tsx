import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table'
import { LucideMoreHorizontal, LucideTrash2 } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getAvailableDates } from '@/http/student/get-available-dates'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { DeleteModal } from '../components/delete-modal'
import { queryClient } from '@/lib/react-query'
import { deleteAvailableDate } from '@/http/admin/delete-available-date'
import { deleteAllDates } from '@/http/admin/delete-all-dates'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from '@/components/ui/multi-select'
import { weekDays } from '@/utils/weekDays'
import { CreateAndEditModal } from '../components/create-and-edit-modal'
import { Label } from '@/components/ui/label'
import type { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { createAvailableDates } from '@/http/admin/create-available-date'
import { PageHeader } from '../components/page-header'
import { ModalAction, useModalContext } from '@/context/modal-context'
import { ModalFooter } from '../components/modal-footer'
import { triggerToast } from '@/utils/trigger-toast'

const addDatesForm = z.object({
  supportCenterId: z.string(),
  weekDays: z.string().array(),
})

type AddDatesForm = z.infer<typeof addDatesForm>

export function AvailableDates() {
  const { supportCenterId } = useParams()
  const {
    isModalOpen,
    modalAction,
    resetModalState,
    setModalAction,
    setIsModalOpen,
  } = useModalContext()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [startAndEndDates, setStartAndEndDates] = useState<DateRange>()
  const { success, error } = triggerToast()

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<AddDatesForm>({
    defaultValues: {
      weekDays: [],
    },
  })

  const { data: availableDates } = useQuery<Date[]>({
    queryKey: ['get-available-dates', supportCenterId],
    queryFn: async () => {
      return getAvailableDates({ supportCenterId: supportCenterId! })
    },
    enabled: !!supportCenterId,
    staleTime: Number.POSITIVE_INFINITY,
  })

  async function handleCreate(data: AddDatesForm) {
    try {
      const startDate = dayjs(startAndEndDates?.from).toDate()
      const endDate = dayjs(startAndEndDates?.to).toDate()
      const weekDays = data.weekDays.map(day => Number(day))

      if (!supportCenterId) return

      await createAvailableDates({
        supportCenterId,
        weekDays,
        startDate,
        endDate,
      })
      queryClient.invalidateQueries({ queryKey: ['get-available-dates'] })
      success('Datas registradas com sucesso!')
      reset()
    } catch (err) {
      error('criar')
    }
  }

  async function handleDelete() {
    try {
      if (modalAction === 'delete') {
        await deleteAvailableDate({
          supportCenterId: supportCenterId!,
          selectedDate: selectedDate!,
        })
      }
      if (modalAction === 'deleteAll') {
        await deleteAllDates({ supportCenterId: supportCenterId! })
      }
      queryClient.invalidateQueries({ queryKey: ['get-available-dates'] })
      success('Registro(s) deletado(s) com sucesso!')
    } catch (err) {
      error('deletar')
    } finally {
      resetModalState()
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <div className="my-5 w-full space-y-5">
        <PageHeader
          hasAdd
          hasDeleteAll
          title="Datas disponíveis"
          text="Adicionar datas"
        />

        <Table>
          <TableCaption>
            {availableDates?.length
              ? 'Nenhuma data cadastrada!'
              : 'Datas disponíveis'}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {availableDates?.map((availableDate, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <TableRow key={i}>
                <TableCell className="font-medium">
                  {dayjs(availableDate).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell className="font-medium text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <LucideMoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DialogTrigger
                        asChild
                        onClick={() => {
                          setModalAction(ModalAction.Delete)
                          setSelectedDate(availableDate)
                        }}
                      >
                        <DropdownMenuItem>
                          <LucideTrash2 className="size-4 text-red-500" />
                          <span className="text-red-500">Excluir</span>
                        </DropdownMenuItem>
                      </DialogTrigger>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {(modalAction === 'delete' || modalAction === 'deleteAll') && (
        <DeleteModal reset={reset} onDelete={handleDelete} />
      )}

      {modalAction === 'add' && (
        <CreateAndEditModal>
          <form className="space-y-3" onSubmit={handleSubmit(handleCreate)}>
            <div className="space-y-1">
              <Controller
                name="weekDays"
                control={control}
                render={({ field }) => (
                  <>
                    <Label>Dia(s) da semana</Label>
                    <MultiSelector
                      onValuesChange={field.onChange}
                      values={field.value}
                    >
                      <MultiSelectorTrigger className="text-zinc-500 dark:text-zinc-400 text-sm font-semibold hover:bg-accent">
                        <MultiSelectorInput
                          className="cursor-pointer"
                          placeholder="Selecione o(s) dia(s) da semana"
                        />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {weekDays.map(day => (
                            <MultiSelectorItem
                              key={day.value}
                              value={day.value}
                            >
                              {day.name}
                            </MultiSelectorItem>
                          ))}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>

                    <Label>Data de início e fim</Label>
                    <Calendar
                      mode="range"
                      selected={startAndEndDates}
                      onSelect={e => setStartAndEndDates(e)}
                    />
                  </>
                )}
              />
            </div>

            <ModalFooter reset={reset} isSubmitting={isSubmitting} />
          </form>
        </CreateAndEditModal>
      )}
    </Dialog>
  )
}
