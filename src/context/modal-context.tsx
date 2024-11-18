import { createContext, useContext, useState, type ReactNode } from 'react'

export enum ModalAction {
  Add = 'add',
  Edit = 'edit',
  Delete = 'delete',
  DeleteAll = 'deleteAll',
}

interface ModalContextProps {
  isModalOpen: boolean
  modalAction: ModalAction | null
  selectedId: string | null
  setModalAction: (action: ModalAction) => void
  setSelectedId: (id: string) => void
  resetModalState: () => void
  setIsModalOpen: (isOpen: boolean) => void
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalAction, setModalAction] = useState<ModalAction | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const resetModalState = () => {
    setIsModalOpen(false)
    setModalAction(null)
    setSelectedId(null)
  }

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalAction,
        selectedId,
        setModalAction,
        setSelectedId,
        resetModalState,
        setIsModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider')
  }
  return context
}
