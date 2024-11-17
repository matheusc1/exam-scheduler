import { Link, useParams } from 'react-router-dom'
import { Dialog, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getOperatingHours } from '@/http/admin/get-operating-hours'
import { LucideChevronLeft } from 'lucide-react'
import { deleteOperatingHours } from '@/http/admin/delete-operating-hours'
import { toast } from '@/hooks/use-toast'
import { queryClient } from '@/lib/react-query'
import { DeleteModal } from '../components/delete-modal'
import { OperatingHoursTableRow } from './operating-hours-row'
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalAction, setModalAction] = useState<
    'add' | 'edit' | 'delete' | 'deleteAll' | null
  >(null)
  const [selectedOperatingHoursId, setSelectedOperatingHoursId] = useState<
    string | null
  >(null)

  const { data: operatingHours } = useQuery<OperatingHours[]>({
    queryKey: ['get-operating-hours'],
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

  function resetModalState() {
    setModalAction(null)
    setSelectedOperatingHoursId(null)
    setIsModalOpen(false)
  }

  function handleError(error: unknown, action: string) {
    console.error(error)
    toast({
      variant: 'destructive',
      title: `Erro ao ${action} registro`,
      description: `Ocorreu um erro ao ${action} o registro, tente novamente mais tarde!`,
    })
  }

  async function handleDelete() {
    try {
      if (selectedOperatingHoursId) {
        await deleteOperatingHours({
          supportCenterId: supportCenterId!,
          operatingHoursId: selectedOperatingHoursId,
        })
        queryClient.invalidateQueries({ queryKey: ['get-operating-hours'] })
      }
      toast({
        title: 'Registro deletado com sucesso!',
      })
    } catch (error) {
      handleError(error, 'deletar')
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
      toast({
        title: 'Horários registrados com sucesso!',
      })
      reset()
    } catch (error) {
      handleError(error, 'criar')
    }
  }

  async function handleEditOperatingHours(data: AddOperatingHoursForm) {
    try {
      if (!supportCenterId || !selectedOperatingHoursId) return

      await updateOperatingHours({
        supportCenterId,
        operatingHoursId: selectedOperatingHoursId,
        weekDay: Number(data.weekDays),
        openTime: data.openTime,
        closeTime: data.closeTime,
      })
      queryClient.invalidateQueries({ queryKey: ['get-operating-hours'] })

      toast({
        title: 'Horário atualizado com sucesso!',
      })

      reset()
    } catch (error) {
      handleError(error, 'editar')
    } finally {
      resetModalState()
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <div className="my-5 w-full space-y-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Link to="/admin/operating-hours">
              <LucideChevronLeft className="size-4 hover:opacity-50" />
            </Link>
            <h2 className="font-semibold text-lg">Horários de funcionamento</h2>
          </div>
          <DialogTrigger asChild>
            <Button onClick={() => setModalAction('add')}>
              Adicionar horário de funcionamento
            </Button>
          </DialogTrigger>
        </div>

        <Table>
          <TableCaption>
            {operatingHours?.length
              ? 'Nenhum horário cadastado!'
              : 'Horários de funcionamento'}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Dia da semana</TableHead>
              <TableHead>Horário de abertura</TableHead>
              <TableHead>Horário de fechamento</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {operatingHours?.map(operatingHour => (
              <OperatingHoursTableRow
                key={operatingHour.id}
                operatingHour={operatingHour}
                setId={setSelectedOperatingHoursId}
                setModalAction={setModalAction}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {modalAction === 'delete' && (
        <DeleteModal onCancel={resetModalState} onDelete={handleDelete} />
      )}

      {modalAction === 'add' || modalAction === 'edit' ? (
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
                  </>
                )}
              />
            </div>

            <div className="space-y-1">
              <Label>Horário de abertura</Label>
              <Input
                className="w-full"
                type="text"
                placeholder="Informe o horário de abetura. Ex: 10:00"
                {...register('openTime')}
                required
              />
            </div>

            <div className="space-y-1">
              <Label>Número de computadores</Label>
              <Input
                className="w-full"
                type="text"
                placeholder="Informe o horário de fechamento. Ex: 18:00"
                {...register('closeTime')}
                required
              />
            </div>

            <DialogFooter>
              <Button onClick={resetModalState} variant="outline" type="button">
                Cancelar
              </Button>
              <Button disabled={isSubmitting} type="submit">
                Confirmar
              </Button>
            </DialogFooter>
          </form>
        </CreateAndEditModal>
      ) : null}
    </Dialog>
  )
}
