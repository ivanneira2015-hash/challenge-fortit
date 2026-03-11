import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTasks, deleteTask, updateTask } from '../api';
import TaskItem from '../components/TaskItem';
import EmptyState from '../components/EmptyState';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (task) => {
    try {
      const updated = await updateTask(task.id, { ...task, completed: !task.completed });
      setTasks((prev) => prev.map((t) => t.id === task.id ? updated : t));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Mis tareas</h1>
        </div>
        <Link className="button" to="/new">+ Nueva tarea</Link>
      </div>
      {loading && <p>Cargando tareas...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && tasks.length === 0 && <EmptyState />}
      <div className="task-grid">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={handleDelete} onToggle={handleToggle} />
        ))}
      </div>
    </section>
  );
}
