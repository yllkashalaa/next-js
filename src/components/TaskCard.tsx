'use client';


import { motion } from 'framer-motion';
import { Task } from 'utils/tasks';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex justify-between items-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <span className={task.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-gray-100'}>
        {task.title}
      </span>
    </motion.li>
  );
}
