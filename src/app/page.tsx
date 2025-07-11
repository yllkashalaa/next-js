import Link from "next/link";

export default function Home() {
  return (
    <main className="dashboard">
      <h1>Dashboard for Task Management</h1>
      <div>
        <Link href="/tasks">Go to tasks</Link>
      </div>
      <div>
        <Link href="/tasks/new">Add new task</Link>
      </div>
    </main>
  );
}
