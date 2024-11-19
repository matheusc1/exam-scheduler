import { Dialog } from '@/components/ui/dialog'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/components/ui/table'
import { getDisciplines } from '@/http/admin/get-disciplines'
import { useQuery } from '@tanstack/react-query'
import { DeleteModal } from '../components/delete-modal'
import { deleteDiscipline } from '@/http/admin/delete-discipline'
import { queryClient } from '@/lib/react-query'
import { CreateAndEditModal } from '../components/create-and-edit-modal'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { createDiscipline } from '@/http/admin/create-discipline'
import { updateDiscipline } from '@/http/admin/update-discipline'
import { DisciplinesTableRow } from './disciplines-row'
import { PageHeader } from '../components/page-header'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useModalContext } from '@/context/modal-context'
import { triggerToast } from '@/utils/trigger-toast'
import { ModalFooter } from '../components/modal-footer'

export interface Discipline {
  id: string
  name: string
}

const addDisciplineForm = z.object({
  name: z.string(),
})

type AddDisciplineForm = z.infer<typeof addDisciplineForm>

export function Disciplines() {
  const {
    isModalOpen,
    modalAction,
    resetModalState,
    setIsModalOpen,
    selectedId,
  } = useModalContext()
  const { success, error } = triggerToast()

  const { data: disciplines } = useQuery<Discipline[]>({
    queryKey: ['get-disciplines'],
    queryFn: getDisciplines,
    staleTime: Number.POSITIVE_INFINITY,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<AddDisciplineForm>()

  async function handleDelete() {
    try {
      if (selectedId) {
        await deleteDiscipline({ disciplineId: selectedId })
        queryClient.invalidateQueries({ queryKey: ['get-disciplines'] })
      }
      success('Registro excluido com sucesso!')
    } catch (err) {
      error('deletar')
    } finally {
      resetModalState()
    }
  }

  async function handleCreateDiscipline(data: AddDisciplineForm) {
    try {
      await createDiscipline({
        name: data.name,
      })
      queryClient.invalidateQueries({ queryKey: ['get-disciplines'] })
      success('Disciplina registrada com sucesso!')
      reset()
    } catch (err) {
      error('criar')
    }
  }

  async function handleEditDiscipline(data: AddDisciplineForm) {
    try {
      if (!selectedId) return

      await updateDiscipline({
        disciplineId: selectedId,
        name: data.name,
      })
      queryClient.invalidateQueries({ queryKey: ['get-disciplines'] })
      success('Disciplina atualizada com sucesso!')
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
        <PageHeader hasAdd title="Disciplina" text="Adicionar disciplina" />

        <Table>
          <TableCaption>
            {!disciplines?.length
              ? 'Nenhuma disciplina cadastrada!'
              : 'Disciplinas'}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {disciplines?.map(discipline => (
              <DisciplinesTableRow
                key={discipline.id}
                discipline={discipline}
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
                ? handleCreateDiscipline
                : handleEditDiscipline
            )}
          >
            <div className="space-y-1">
              <Label>Nome</Label>
              <Input
                className="w-full"
                type="text"
                placeholder="Nome da disciplina"
                {...register('name')}
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
