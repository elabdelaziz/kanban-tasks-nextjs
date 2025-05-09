import Image from 'next/image'
import useLocalStorage from '../../hooks/useLocalStorage'

const NewTaskModal = () => {
  const [, setNewTaskMode] = useLocalStorage('newTaskMode', false)

  return (
    <>
      <div
        onClick={() => {
          setNewTaskMode(false)
        }}
        className="absolute z-[3] overlay w-[100vw] h-[100vh] bg-black bg-opacity-[0.5]"
      ></div>
      <form
        onSubmit={() => {}}
        className="absolute flex items-center justify-center w-[100vw] h-[100vh]"
      >
        <div className="rounded-[10px] z-[4] flex flex-col [&>div]:mb-[1rem] [&>div>label]:mb-[0.5rem] p-[2rem] bg-white dark:bg-mainDark w-[100%] max-w-[30rem] max-h-[60rem] h-[fit]">
          <div className="flex flex-col">
            <label htmlFor="title">title</label>
            <input
              className="bg-transparent text-[0.8125rem] p-[0.7rem_0.5rem] rounded-[4px] border-[1px] border-solid border-inputBorder transition-[border_.2s_ease]"
              id="title"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="textarea">Description</label>
            <textarea
              className="bg-transparent text-[.8125rem] p-[0.5rem_1rem] rounded-[4px] border-[2px] border-solid border-inputBorder transition-[border_.2s_ease]"
              id="textarea"
              rows={4}
              spellCheck="false"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="subtasks">Subtasks</label>
            <div className="flex flex-col items-center mb-[1rem]"></div>
          </div>
          <div className="flex flex-col relative">
            <div
              id="myDropdown"
              onClick={() => {}}
              className="flex items-center w-[100%] font-[500] justify-between text-[.8125rem] p-[0.7rem_0.5rem] bg-transparent rounded-[4px] border-[2px] border-solid border-inputBorder capitalize transition-[border_.2s_ease]"
            >
              <span></span>
              <Image
                alt="drop"
                width={10}
                height={10}
                className="w-[10px] h-[7px]"
                src="/assets/icon-chevron-down.svg"
              />
            </div>
            <button
              type="submit"
              className="mt-[1rem] rounded-[20px] text-white bg-mainText text-[.8125rem] p-[0.5rem_1rem] h-auto font-[700] transition-[all_.2s_ease]"
            >
              Create Task
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default NewTaskModal
