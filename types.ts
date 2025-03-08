type Subtask = {
  title: string;
  isCompleted: boolean;
};

type Task = {
  title: string;
  description: string;
  status: string;
  id: number;
  subtasks: Subtask[];
};

type Column = {
  id: number;
  title: string;
  tasks: Task[];
};

type Board = {
  title: string;
  isActive: boolean;
  columns: Column[];
};

type BoardData = {
  boards: Board[];
};
