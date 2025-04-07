'use client'
import useLocalStorage from '@/app/hooks/useLocalStorage'
import NewTaskModal from '../NewTask'

const OverlayModalRenderer = () => {
  const [newTaskMode] = useLocalStorage('newTaskMode', false)
  return <>{newTaskMode && <NewTaskModal />}</>
}

export default OverlayModalRenderer
