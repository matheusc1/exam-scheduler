import { toast } from '@/hooks/use-toast'

export function triggerToast() {
  return {
    success: (title: string) => toast({ title }),
    error: (action: string) =>
      toast({
        variant: 'destructive',
        title: `Erro ao ${action}`,
        description: `Ocorreu um erro ao ${action} o(s) registro(s). Tente novamente!`,
      }),
  }
}
