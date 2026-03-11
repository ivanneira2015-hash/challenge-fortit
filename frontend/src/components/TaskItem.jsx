import { Link } from 'react-router-dom';

export default function TaskItem({ task, onDelete, onToggle }) {
  return (
    <article className="task-card">
      <header className="task-header">
        <div>
          <p className="task-title">{task.title}</p>
          <p className="task-date">Creada el {new Date(task.createdAt).toLocaleString()}</p>
        </div>
        <span className={`badge ${task.completed ? 'success' : 'warning'}`}>
          {task.completed ? 'Completada' : 'Pendiente'}
        </span>
      </header>
      <p className="task-description">{task.description || 'Sin descripción'}</p>
      <div className="task-actions">
        <button onClick={() => onToggle(task)}>{task.completed ? 'Marcar pendiente' : 'Marcar completa'}</button>
        <Link className="ghost" to={`/edit/${task.id}`}>Editar</Link>
        <button className="danger" onClick={() => onDelete(task.id)}>Eliminar</button>
      </div>
    </article>
  );
}
