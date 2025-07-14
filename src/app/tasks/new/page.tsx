'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewTaskPage() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [priority, setPriority] = useState('normal');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === '') {
      setError('Please enter a title for the task.');
      return;
    }
    setError('');

    const existing = localStorage.getItem('tasks');
    const tasks = existing ? JSON.parse(existing) : [];
    const newTask = { id: Date.now(), title: title.trim(), completed: false, priority };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    router.push('/tasks');
  };

  return (
    <main className="new-task-page">
      <h2>Create a New Task</h2>
      <form onSubmit={handleSubmit} className="new-task-form">
        <input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={priority}
        onChange={(e) => setPriority (e.target.value)}
        className='"priority-select'>
        <option value="low">Low Priority</option>
        <option value="normal">Normal Priority</option>
        <option value="high">High priority</option>
        </select>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={title.trim() === ''}>
          Save Task
        </button>
      </form>
      <div>
        <Link href="/tasks" className="new-task-backlink">
          Back to Task List
        </Link>
      </div>
    </main>
  );
}
