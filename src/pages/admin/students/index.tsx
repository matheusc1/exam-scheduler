import { Dialog } from '@/components/ui/dialog'
import { useModalContext } from '@/context/modal-context'
import { getStudents } from '@/http/admin/get-students'
import { triggerToast } from '@/utils/trigger-toast'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { PageHeader } from '../components/page-header'
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Controller, useForm } from 'react-hook-form'
import { deleteStudent } from '@/http/admin/delete-student'
import { queryClient } from '@/lib/react-query'
import { StudentTableRow } from './student-row'
import { DeleteModal } from '../components/delete-modal'
import { CreateAndEditModal } from '../components/create-and-edit-modal'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ModalFooter } from '../components/modal-footer'
import { getSupportCenters } from '@/http/coordination/get-support-centers'
import type { SupportCenter } from '@/pages/coordination/select-support-center'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createStudents } from '@/http/admin/create-students'
import { Input } from '@/components/ui/input'
import { updateStudent } from '@/http/admin/update-student'

interface Student {
  id: string
  ra: string
  name: string
  email: string
  birthDate: Date
  supportCenter: string
}

const studentForm = z.object({
  studentsData: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  supportCenterId: z.string().min(1, 'Selecione o polo'),
})

type StudentForm = z.infer<typeof studentForm>

export function Students() {
  const {
    isModalOpen,
    modalAction,
    resetModalState,
    setIsModalOpen,
    selectedId,
  } = useModalContext()
  const { success, error } = triggerToast()

  const { data: students } = useQuery<Student[]>({
    queryKey: ['get-students'],
    queryFn: getStudents,
    staleTime: Number.POSITIVE_INFINITY,
  })
  const { data: supportCenters } = useQuery<SupportCenter[]>({
    queryKey: ['get-support-centers'],
    queryFn: getSupportCenters,
    staleTime: Number.POSITIVE_INFINITY,
  })

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<StudentForm>()

  async function handleDelete() {
    try {
      if (!selectedId) return

      await deleteStudent({ studentRa: selectedId })
      queryClient.invalidateQueries({ queryKey: ['get-students'] })

      success('Registro excluido com sucesso!')
    } catch (err) {
      error('excluir')
    } finally {
      resetModalState()
    }
  }

  async function handleCreateStudents(data: StudentForm) {
    try {
      const { studentsData, supportCenterId } = data

      if (!studentsData) return

      const studentsToAdd = studentsData
        .split('\n') // Divide por linhas
        .filter(line => line.trim()) // Remove linhas vazias
        .map(line => {
          const [ra, name, email, birthDate] = line.split(',')

          if (!ra || !name || !email || !birthDate) {
            throw new Error(`Dados incompletos na linha: ${line}`)
          }

          return {
            ra: ra.trim(),
            name: name.trim(),
            email: email.trim(),
            birthDate: new Date(birthDate.trim()),
            supportCenter: supportCenterId,
          }
        })

      console.log(studentsToAdd)

      await createStudents({ students: studentsToAdd })

      queryClient.invalidateQueries({ queryKey: ['get-students'] })
      success('Estudantes registrados com sucesso!')
      reset()
    } catch (err) {
      error('criar')
    }
  }

  async function handleEditStudent(data: StudentForm) {
    try {
      if (!selectedId || !data.name || !data.email) return

      await updateStudent({
        studentRa: selectedId,
        name: data.name,
        email: data.email,
        supportCenter: data.supportCenterId,
      })

      queryClient.invalidateQueries({ queryKey: ['get-students'] })
      success('Estudante atualizado com sucesso!')
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
        <PageHeader hasAdd title="Estudantes" text="Adicionar estudantes" />

        <Table>
          <TableCaption>
            {!students?.length ? 'Nenhum estudante registrado' : 'Estudantes'}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>RA</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Data de nascimento</TableHead>
              <TableHead>Polo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students?.map(student => (
              <StudentTableRow key={student.id} student={student} />
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
                modalAction === 'add' ? handleCreateStudents : handleEditStudent
              )}
            >
              {modalAction === 'add' && (
                <div className="space-y-1">
                  <Label>Dados do aluno</Label>
                  <p className="text-sm text-zinc-500">Envie os dados no seguinte formato pulando linhas:</p>
                  <p className="text-sm text-zinc-500">
                    RA, nome, email, data de nascimento (YYYY-MM-DD)
                  </p>

                  <Textarea
                    className="max-h-40"
                    placeholder="Insira os dados dos alunos no formato correto"
                    {...register('studentsData')}
                  />
                </div>
              )}

              {modalAction === 'edit' && (
                <>
                  <div className="space-y-1">
                    <Label>Nome</Label>
                    <Input
                      className="w-full"
                      type="text"
                      placeholder="Nome do aluno"
                      {...register('name')}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label>E-mail</Label>
                    <Input
                      className="w-full"
                      type="text"
                      placeholder="Email do aluno"
                      {...register('email')}
                    />
                  </div>
                </>
              )}

              <div className="space-y-1">
                <Controller
                  name="supportCenterId"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o polo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Polos</SelectLabel>
                          {supportCenters?.map(supportCenter => (
                            <SelectItem
                              key={supportCenter.id}
                              value={supportCenter.id}
                            >
                              {supportCenter.name}
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
