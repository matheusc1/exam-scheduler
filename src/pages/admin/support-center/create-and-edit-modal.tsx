import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

interface FormFields {
  id?: string
  name: string
  numberOfComputers: number
}

interface CreateAndEditModalProps {
  handleSubmit: UseFormHandleSubmit<FormFields>
  modalAction: 'edit' | 'delete' | 'add' | null
  handleCreateSupportCenter: (data: FormFields) => void
  handleEditSupportCenter: (data: FormFields) => void
  handleCancel: () => void
  isSubmitting: boolean
  register: UseFormRegister<FormFields>
}

export function CreateAndEditModal({
  handleSubmit,
  modalAction,
  handleCancel,
  handleCreateSupportCenter,
  handleEditSupportCenter,
  register,
  isSubmitting,
}: CreateAndEditModalProps) {
  return (
    <DialogContent className="w-96">
      <DialogHeader>
        <DialogTitle>Adicionar novo registro</DialogTitle>
        <DialogDescription>
          Insira as informações para adicionar um novo registro
        </DialogDescription>
      </DialogHeader>
      <div>
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

          <DialogFooter>
            <Button onClick={handleCancel} variant="outline" type="button">
              Cancelar
            </Button>
            <Button disabled={isSubmitting} type="submit">
              Confirmar
            </Button>
          </DialogFooter>
        </form>
      </div>
    </DialogContent>
  )
}
