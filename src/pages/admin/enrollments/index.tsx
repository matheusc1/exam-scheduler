import { useModalContext } from '@/context/modal-context'
import { deleteEnrollment } from '@/http/admin/delete-enrollment'
import { getEnrollments } from '@/http/admin/get-enrollments'
import { queryClient } from '@/lib/react-query'
import { triggerToast } from '@/utils/trigger-toast'
import { useQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { PageHeader } from '../components/page-header'
import { Dialog } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EnrollmentsTableRow } from './enrollments-row'
import { DeleteModal } from '../components/delete-modal'
import { CreateAndEditModal } from '../components/create-and-edit-modal'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getDisciplines } from '@/http/admin/get-disciplines'
import type { Discipline } from '../disciplines'
import { ModalFooter } from '../components/modal-footer'
import dayjs from 'dayjs'
import { createEnrollments } from '@/http/admin/create-enrollments'
import { updateEnrollment } from '@/http/admin/update-enrollment'
import type { Period } from '../periods'
import { getPeriods } from '@/http/admin/get-period'

interface Enrollment {
  id: string
  studentRa: string
  studentName: string
  discipline: string
  periodStartDate: Date
  periodEndDate: Date
}

const addEnrollmentsForm = z.object({
  studentRa: z.string(),
  disciplineId: z.string(),
  periodId: z.string(),
})

type AddEnrollmentsForm = z.infer<typeof addEnrollmentsForm>

export function Enrollments() {
  const {
    isModalOpen,
    modalAction,
    resetModalState,
    setIsModalOpen,
    selectedId,
  } = useModalContext()
  const { success, error } = triggerToast()

  const { data: enrollments } = useQuery<Enrollment[]>({
    queryKey: ['get-enrollments'],
    queryFn: getEnrollments,
    staleTime: Number.POSITIVE_INFINITY,
  })

  const { data: disciplines } = useQuery<Discipline[]>({
    queryKey: ['get-disciplines'],
    queryFn: getDisciplines,
    staleTime: Number.POSITIVE_INFINITY,
  })

  const { data: periods } = useQuery<Period[]>({
    queryKey: ['get-periods'],
    queryFn: getPeriods,
    staleTime: Number.POSITIVE_INFINITY,
  })

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<AddEnrollmentsForm>()

  async function handleDelete() {
    try {
      if (!selectedId) return

      await deleteEnrollment({ enrollmentId: selectedId })
      queryClient.invalidateQueries({ queryKey: ['get-enrollments'] })
      success('Registro excluido com sucesso!')
    } catch (err) {
      error('excluir')
    } finally {
      resetModalState()
    }
  }

  async function handleCreateEnrollments(data: AddEnrollmentsForm) {
    try {
      const studentRa =
        typeof data.studentRa === 'string'
          ? data.studentRa.split(',').map(item => item.trim())
          : data.studentRa

      await createEnrollments({
        studentRa,
        disciplineId: data.disciplineId,
        periodId: data.periodId,
      })

      queryClient.invalidateQueries({ queryKey: ['get-enrollments'] })
      success('Matrículas registradas com sucesso!')
      reset()
    } catch (err) {
      error('criar')
    }
  }

  async function handleEditEnrollment(data: AddEnrollmentsForm) {
    try {
      if (!selectedId) return

      await updateEnrollment({
        enrollmentId: selectedId,
        studentRa: data.studentRa,
        disciplineId: data.disciplineId,
        periodId: data.periodId,
      })
    } catch (error) {
    } finally {
      resetModalState()
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <div className="my-5 w-full space-y-5">
        <PageHeader hasAdd title="Matrículas" text="Adicionar matrículas" />

        <Table>
          <TableCaption>
            {!enrollments?.length
              ? 'Nenhum matrícula cadastrada'
              : 'Matrículas'}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>RA</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Disciplina</TableHead>
              <TableHead>Data de inicio</TableHead>
              <TableHead>Data de término</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrollments?.map(enrollment => (
              <EnrollmentsTableRow
                key={enrollment.id}
                enrollment={enrollment}
              />
            ))}
          </TableBody>
        </Table>

        {modalAction === 'delete' && (
          <DeleteModal reset={reset} onDelete={handleDelete} />
        )}

        {(modalAction === 'add' || modalAction === 'edit') && (
          <CreateAndEditModal>
            <form
              className="space-y-3"
              onSubmit={handleSubmit(
                modalAction === 'add'
                  ? handleCreateEnrollments
                  : handleEditEnrollment
              )}
            >
              <div className="space-y-1">
                <Label>RAs</Label>
                <Textarea
                  className="max-h-40"
                  placeholder={
                    modalAction === 'add'
                      ? 'Insira os RAs dos alunos'
                      : 'Insira o RA do aluno'
                  }
                  {...register('studentRa')}
                />
              </div>

              <div className="space-y-1">
                <Label>Disciplina</Label>
                <Controller
                  name="disciplineId"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a disciplina" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Disciplinas</SelectLabel>
                          {disciplines?.map(discipline => (
                            <SelectItem
                              key={discipline.id}
                              value={discipline.id}
                            >
                              {discipline.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-1">
                <Label>Período</Label>
                <Controller
                  name="periodId"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Períodos</SelectLabel>
                          {periods?.map(period => (
                            <SelectItem key={period.id} value={period.id}>
                              {dayjs(period.startDate).format('DD/MM/YYYY')} -{' '}
                              {dayjs(period.endDate).format('DD/MM/YYYY')}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <ModalFooter reset={reset} isSubmitting={isSubmitting} />
            </form>
          </CreateAndEditModal>
        )}
      </div>
    </Dialog>
  )
}
