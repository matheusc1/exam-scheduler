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
import { useState } from 'react'
import { DeleteModal } from './delete-modal'
import { deleteSupportCenter } from '@/http/admin/delete-support-center'
import { queryClient } from '@/lib/react-query'
import { toast } from '@/hooks/use-toast'
import { CreateAndEditModal } from './create-and-edit-modal'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { createSupportCenter } from '@/http/admin/create-suppor-center'
import { updateSupportCenter } from '@/http/admin/update-support-center'
import { SupportCenterTableRow } from './support-center-table'
import { SupportCenterHeader } from './support-center-header'

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalAction, setModalAction] = useState<
    'add' | 'edit' | 'delete' | null
  >(null)
  const [selectedSupportCenterId, setSelectedSupportCenterId] = useState<
    string | null
  >(null)

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

  function handleError(error: unknown, action: string) {
    console.error(error)
    toast({
      variant: 'destructive',
      title: `Erro ao ${action} registro`,
      description: `Ocorreu um erro ao ${action} o registro, tente novamente mais tarde!`,
    })
  }

  function resetModalState() {
    setModalAction(null)
    setSelectedSupportCenterId(null)
    setIsModalOpen(false)
  }

  async function handleDelete() {
    try {
      if (selectedSupportCenterId) {
        await deleteSupportCenter({ id: selectedSupportCenterId })
        queryClient.invalidateQueries({ queryKey: ['get-support-centers'] })
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

  async function handleCreateSupportCenter(data: AddSupportCenterForm) {
    try {
      await createSupportCenter({
        name: data.name,
        numberOfComputers: data.numberOfComputers,
      })
      queryClient.invalidateQueries({ queryKey: ['get-support-centers'] })
      toast({
        title: 'Polo registrado com sucesso!',
      })
      reset()
    } catch (error) {
      handleError(error, 'criar')
    }
  }

  async function handleEditSupportCenter(data: AddSupportCenterForm) {
    try {
      if (!selectedSupportCenterId) return

      await updateSupportCenter({
        id: selectedSupportCenterId,
        name: data.name,
        numberOfComputers: data.numberOfComputers,
      })
      queryClient.invalidateQueries({ queryKey: ['get-support-centers'] })

      toast({
        title: 'Polo atualizado com sucesso!',
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
        <SupportCenterHeader setModalAction={setModalAction} />

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
                setModalAction={setModalAction}
                setSelectedSupportCenterId={setSelectedSupportCenterId}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {modalAction === 'delete' && (
        <DeleteModal onCancel={resetModalState} onDelete={handleDelete} />
      )}
      {modalAction === 'add' || modalAction === 'edit' ? (
        <CreateAndEditModal
          handleSubmit={handleSubmit}
          handleCancel={resetModalState}
          handleCreateSupportCenter={handleCreateSupportCenter}
          handleEditSupportCenter={handleEditSupportCenter}
          isSubmitting={isSubmitting}
          modalAction={modalAction}
          register={register}
        />
      ) : null}
    </Dialog>
  )
}
