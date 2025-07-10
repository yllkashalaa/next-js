'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewTaskPage() {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === '') {
      alert('Ju lutem shkruani një titull për detyrën.');
      return;
    }

    // Ruaj në localStorage ose backend - shembull i thjeshtë me localStorage
    const existing = localStorage.getItem('tasks');
    const tasks = existing ? JSON.parse(existing) : [];
    const newTask = { id: Date.now(), title, completed: false };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    router.push('/tasks');
  };

  return (
    <main className="max-w-2xl mx-auto p-8 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-8">Krijo Detyrë të Re</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Shkruaj titullin e detyrës..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand"
        />
        <button
          type="submit"
          className="bg-brand hover:bg-brand-dark text-white font-semibold py-3 rounded-md transition-colors"
        >
          Ruaj Detyrën
        </button>
      </form>
      <div className="mt-6">
        <Link href="/tasks" className="text-brand hover:underline">
          ← Kthehu te Lista e Detyrave
        </Link>
      </div>
    </main>
  );
}
