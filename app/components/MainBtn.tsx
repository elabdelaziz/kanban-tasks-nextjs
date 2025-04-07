const MainBtn = ({
  text,
  actionFn,
}: {
  text: string
  actionFn?: () => void
}) => {
  return (
    <button
      onClick={actionFn}
      className="p-[0.7rem_1rem] text-white rounded-[24px] bg-buttonsMain font-[500]"
    >
      {text}
    </button>
  )
}

export default MainBtn
