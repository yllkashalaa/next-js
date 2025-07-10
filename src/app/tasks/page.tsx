'use client';

import TaskCard from 'components/TaskCard';
import { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-8 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h2 className="text-3xl font-semibold mb-8">Lista e Detyrave</h2>
      <ul className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p>Nuk ka detyra të ruajtura.</p>
        )}
      </ul>
    </main>
  );
}
