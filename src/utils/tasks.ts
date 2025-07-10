export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export const tasks: Task[] = [
  { id: 1, title: 'Mëso Next.js', completed: false },
  { id: 2, title: 'Punë në portofolio', completed: true },
  { id: 3, title: 'Pushim me kafe ☕', completed: false },
];
