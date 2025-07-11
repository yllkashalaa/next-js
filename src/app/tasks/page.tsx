'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

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
    setTasks(tasks!.map(t => (t.id === editId ? { ...t, title: editText } : t)));
    setEditId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText('');
  };

  const deleteTask = (id: number) => {
    setTasks(tasks!.filter(t => t.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks!.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  if (tasks === null) {
    return <p>Loading...</p>;
  }

  // Filter and search tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active' && task.completed) return false;
    if (filter === 'completed' && !task.completed) return false;

    if (!task.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;

    return true;
  });

  return (
    <main className="tasks-page">
      <h2>Task List</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-md"
      />

      {/* Filter Buttons */}
      <div className="mb-6 flex gap-4">
        <button
          className={`btn-filter ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`btn-filter ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`btn-filter ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {filteredTasks.length > 0 ? (
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Done</th>
              <th>Task</th>
              <th style={{ width: '180px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <tr key={task.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                  />
                </td>
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
                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                      {task.title}
                    </span>
                  )}
                </td>
                <td className="action-cell">
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
        <p>No tasks found.</p>
      )}

      <div>
        <Link href="/tasks/new" className="new-task-backlink">
          Add new task
        </Link>
      </div>
    </main>
  );
}
