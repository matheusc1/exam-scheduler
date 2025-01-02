import { useParams } from 'react-router-dom'
import { Dialog } from '@/components/ui/dialog'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { getOperatingHours } from '@/http/admin/get-operating-hours'
import { deleteOperatingHours } from '@/http/admin/delete-operating-hours'
import { queryClient } from '@/lib/react-query'
import { DeleteModal } from '../components/delete-modal'
import { OperatingHoursRow } from './operating-hours-row'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { CreateAndEditModal } from '../components/create-and-edit-modal'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@/components/ui/multi-select'
import { createOperatingHours } from '@/http/admin/create-operating-hours'
import { updateOperatingHours } from '@/http/admin/update-operating-hours'
import { weekDays } from '@/utils/weekDays'
import { useModalContext } from '@/context/modal-context'
import { triggerToast } from '@/utils/trigger-toast'
import { PageHeader } from '../components/page-header'
import { ModalFooter } from '../components/modal-footer'

interface OperatingHours {
  id: string
  weekDay: number
  openTime: string
  closeTime: string
}

const addOperatingHoursForm = z.object({
  weekDays: z.string().array(),
  openTime: z.string().time(),
  closeTime: z.string().time(),
})

type AddOperatingHoursForm = z.infer<typeof addOperatingHoursForm>

export function OperatingHours() {
  const { supportCenterId } = useParams()
  const {
    isModalOpen,
    modalAction,
    resetModalState,
    setModalAction,
    setIsModalOpen,
    selectedId,
  } = useModalContext()
  const { success, error } = triggerToast()

  const { data: operatingHours } = useQuery<OperatingHours[]>({
    queryKey: ['get-operating-hours', supportCenterId],
    queryFn: () => getOperatingHours({ supportCenterId: supportCenterId! }),
    enabled: !!supportCenterId,
    staleTime: Number.POSITIVE_INFINITY,
  })

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<AddOperatingHoursForm>({
    defaultValues: {
      weekDays: [],
      openTime: '',
      closeTime: '',
    },
  })

  async function handleDelete() {
    try {
      if (selectedId) {
        await deleteOperatingHours({
          supportCenterId: supportCenterId!,
          operatingHoursId: selectedId,
        })
        queryClient.invalidateQueries({ queryKey: ['get-operating-hours'] })
      }
      success('Registro excluído com sucesso!')
    } catch (err) {
      error('deletar')
    } finally {
      resetModalState()
    }
  }

  async function handleCreateOperatingHours(data: AddOperatingHoursForm) {
    try {
      const weekDays = data.weekDays.map(day => Number(day))
      if (!supportCenterId) return

      await createOperatingHours({
        supportCenterId,
        weekDays,
        openTime: data.openTime,
        closeTime: data.closeTime,
      })
      queryClient.invalidateQueries({ queryKey: ['get-operating-hours'] })
      success('Horários registrados com sucesso!')
      reset()
    } catch (err) {
      error('criar')
    }
  }

  async function handleEditOperatingHours(data: AddOperatingHoursForm) {
    try {
      if (!supportCenterId || !selectedId) return

      await updateOperatingHours({
        supportCenterId,
        operatingHoursId: selectedId,
        weekDay: Number(data.weekDays),
        openTime: data.openTime,
        closeTime: data.closeTime,
      })
      queryClient.invalidateQueries({ queryKey: ['get-operating-hours'] })
      success('Horário atualizado com sucesso!')
      reset()
    } catch (err) {
      error('editar')
    } finally {
      resetModalState()
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <div className="my-5 w-full space-y-5">
        <PageHeader
          previousPath="operating-hours"
          hasAdd
          title="Horários de funcionamento"
          text="Adicionar horário de funcionamento"
        />

        {!operatingHours?.length ? (
          <div className="text-center font-medium">
            Nenhum horário cadastrado!
          </div>
        ) : (
          <Table>
            <TableCaption>Horários de funcionamento</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Dia da semana</TableHead>
                <TableHead>Horário de abertura</TableHead>
                <TableHead>Horário de fechamento</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {operatingHours?.map(operatingHour => (
                <OperatingHoursRow
                  key={operatingHour.id}
                  operatingHour={operatingHour}
                  setModalAction={setModalAction}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {modalAction === 'delete' && (
        <DeleteModal reset={reset} onDelete={handleDelete} />
      )}

      {(modalAction === 'add' || modalAction === 'edit') && (
        <CreateAndEditModal>
          <form
            className="space-y-3"
            onSubmit={handleSubmit(
              modalAction === 'add'
                ? handleCreateOperatingHours
                : handleEditOperatingHours
            )}
          >
            <div className="space-y-1">
              <Controller
                name="weekDays"
                control={control}
                render={({ field }) => (
                  <div className="space-y-1">
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
                  </div>
                )}
              />
            </div>

            <div className="space-y-1">
              <Label>Horário de abertura</Label>
              <Input
                className="w-full"
                type="text"
                placeholder="Informe o horário de abertura. Ex: 10:00"
                {...register('openTime')}
                required
              />
            </div>

            <div className="space-y-1">
              <Label>Horário de fechamento</Label>
              <Input
                className="w-full"
                type="text"
                placeholder="Informe o horário de fechamento. Ex: 18:00"
                {...register('closeTime')}
                required
              />
            </div>

            <ModalFooter reset={reset} isSubmitting={isSubmitting} />
          </form>
        </CreateAndEditModal>
      )}
    </Dialog>
  )
}
