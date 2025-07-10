'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  // Load tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      setTasks([]);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks !== null) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const startEditing = (task: Task) => {
    setEditId(task.id);
    setEditText(task.title);
  };

  const saveEdit = () => {
  if (editId === null) return;
  setTasks(tasks!.map(t => t.id === editId ? { ...t, title: editText } : t));
  setEditId(null);
  setEditText('');
};

const deleteTask = (id: number) => {
  setTasks(tasks!.filter(t => t.id !== id));
};

  const cancelEdit = () => {
    setEditId(null);
    setEditText('');
  };

  if (tasks === null) {
    return <p>Loading...</p>;
  }

  return (
    <main className="tasks-page">
      <h2>Task List</h2>

      {tasks.length > 0 ? (
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Task</th>
              <th style={{ width: '150px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>
                  {editId === task.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') saveEdit();
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      autoFocus
                    />
                  ) : (
                    task.title
                  )}
                </td>
                <td>
                  {editId === task.id ? (
                    <>
                      <button onClick={saveEdit} className="btn-save">Save</button>
                      <button onClick={cancelEdit} className="btn-cancel">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEditing(task)} className="btn-edit">Edit</button>
                      <button onClick={() => deleteTask(task.id)} className="btn-delete">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks saved.</p>
      )}
      <div>
        <Link href="/tasks/new" className="new-task-backlink">
          Add new task
        </Link>
      </div>
    </main>
  );
}
