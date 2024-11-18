import { Dialog } from '@/components/ui/dialog'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/components/ui/table'
import { getSupportCenters } from '@/http/coordination/get-support-centers'
import { useQuery } from '@tanstack/react-query'
import { DeleteModal } from '../components/delete-modal'
import { deleteSupportCenter } from '@/http/admin/delete-support-center'
import { queryClient } from '@/lib/react-query'
import { CreateAndEditModal } from '../components/create-and-edit-modal'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { createSupportCenter } from '@/http/admin/create-suppor-center'
import { updateSupportCenter } from '@/http/admin/update-support-center'
import { SupportCenterTableRow } from './support-center-row'
import { PageHeader } from '../components/page-header'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useModalContext } from '@/context/modal-context'
import { triggerToast } from '@/utils/trigger-toast'
import { ModalFooter } from '../components/modal-footer'

interface SupportCenter {
  id: string
  name: string
  numberOfComputers: number
}

const addSupportCenterForm = z.object({
  name: z.string(),
  numberOfComputers: z.number(),
})

type AddSupportCenterForm = z.infer<typeof addSupportCenterForm>

export function SupportCenter() {
  const {
    isModalOpen,
    modalAction,
    resetModalState,
    setIsModalOpen,
    selectedId,
  } = useModalContext()
  const { success, error } = triggerToast()

  const { data: supportCenters } = useQuery<SupportCenter[]>({
    queryKey: ['get-support-centers'],
    queryFn: getSupportCenters,
    staleTime: Number.POSITIVE_INFINITY,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<AddSupportCenterForm>()

  async function handleDelete() {
    try {
      if (selectedId) {
        await deleteSupportCenter({ id: selectedId })
        queryClient.invalidateQueries({ queryKey: ['get-support-centers'] })
      }
      success('Registro excluido com sucesso!')
    } catch (err) {
      error('deletar')
    } finally {
      resetModalState()
    }
  }

  async function handleCreateSupportCenter(data: AddSupportCenterForm) {
    try {
      await createSupportCenter({
        name: data.name,
        numberOfComputers: data.numberOfComputers,
      })
      queryClient.invalidateQueries({ queryKey: ['get-support-centers'] })
      success('Polo registrado com sucesso!')
      reset()
    } catch (err) {
      error('criar')
    }
  }

  async function handleEditSupportCenter(data: AddSupportCenterForm) {
    try {
      if (!selectedId) return

      await updateSupportCenter({
        id: selectedId,
        name: data.name,
        numberOfComputers: data.numberOfComputers,
      })
      queryClient.invalidateQueries({ queryKey: ['get-support-centers'] })
      success('Polo atualizado com sucesso!')
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
        <PageHeader hasAdd title="Polos" text="Adicionar polo" />

        <Table>
          <TableCaption>
            {!supportCenters?.length ? 'Nenhum polo cadastrado!' : 'Polos'}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Número de computadores</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {supportCenters?.map(supportCenter => (
              <SupportCenterTableRow
                key={supportCenter.id}
                supportCenter={supportCenter}
              />
            ))}
          </TableBody>
        </Table>
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
                ? handleCreateSupportCenter
                : handleEditSupportCenter
            )}
          >
            <div className="space-y-1">
              <Label>Nome</Label>
              <Input
                className="w-full"
                type="text"
                placeholder="Nome do polo"
                {...register('name')}
                required
              />
            </div>

            <div className="space-y-1">
              <Label>Número de computadores</Label>
              <Input
                className="w-full"
                type="number"
                placeholder="Quantidade de computadores"
                {...register('numberOfComputers', { valueAsNumber: true })}
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
