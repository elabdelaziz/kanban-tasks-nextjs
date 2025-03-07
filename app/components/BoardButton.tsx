import Image from "next/image";
import useLocalStorage from "../hooks/useLocalStorage";

type BoardProps = {
  title: string;
  boardId: number;
};

const BoardButton = ({ title, boardId }: BoardProps) => {
  const [activeBoardId, setActiveBoardId] = useLocalStorage("activeBoardId", 1);

  const handleClick = () => {
    setActiveBoardId(boardId);
  };

  return (
    <button
      onClick={handleClick}
      className={`${
        activeBoardId === boardId
          ? "bg-buttonsMain text-white font-medium w-full md:w-[17rem]"
          : "opacity-[0.7] dark:opacity-[1]"
      } flex items-center mb-[0.2rem] px-[2rem] py-[0.8rem] w-[17rem] text-[16px] font-normal rounded-r-[25px]`}
    >
      <Image
        width={20}
        height={20}
        alt="Board Icon"
        className="mr-[1rem]"
        src="assets/icon-board.svg"
      ></Image>
      <span>{title}</span>
    </button>
  );
};

export default BoardButton;
