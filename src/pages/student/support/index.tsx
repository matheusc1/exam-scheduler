import logo from '@/assets/unifaa-logo.png'
import { LucideMail, LucideMapPinned, LucidePhone } from 'lucide-react'

export function Support() {
  return (
    <>
      <div className="m-10 space-y-10 flex flex-col items-center justify-center mb-20 sm:mb-0">
        <div className="flex flex-col gap-5 items-center justify-center">
          <img src={logo} className="w-12 h-20" alt="unifaa logo" />
          <h2 className="text-lg font-semibold">Entre em contato conosco</h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="w-64 px-4 py-6 space-y-20 border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 rounded-md">
            <LucideMail className="size-6 text-zinc-800 dark:text-zinc-200" />

            <div className="space-y-3">
              <div className="space-y-2">
                <p className="font-semibold">Tire suas dúvidas</p>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Entre em contato por e-mail.
                </p>
              </div>

              <div>
                <a
                  href="mailto:relacionamento@faa.edu.br"
                  className="text-sm underline text-[#2CACDD] hover:text-[#1A8AC4]"
                >
                  relacionamento@faa.edu.br
                </a>
              </div>
            </div>
          </div>

          <div className="w-64 px-4 py-6 space-y-20 border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 rounded-md">
            <LucidePhone className="size-6 text-zinc-800 dark:text-zinc-200" />

            <div className="space-y-3">
              <div className="space-y-2">
                <p className="font-semibold">Suporte pelo whatsapp</p>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Envie uma mensagem.
                </p>
              </div>

              <div>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://api.whatsapp.com/send?phone=552424530770"
                  className="text-sm underline text-[#2CACDD] hover:text-[#1A8AC4]"
                >
                  +552424530770
                </a>
              </div>
            </div>
          </div>

          <div className="w-64 px-4 py-6 space-y-20 border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 rounded-md">
            <LucideMapPinned className="size-6 text-zinc-800 dark:text-zinc-200" />

            <div className="space-y-3">
              <div className="space-y-2">
                <p className="font-semibold">Faça uma visita</p>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Visite nossas filiais
                </p>
              </div>

              <div>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://unifaa.edu.br/polos-ead"
                  className="text-sm underline text-[#2CACDD] hover:text-[#1A8AC4]"
                >
                  https://unifaa.edu.br/polos-ead
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
