import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTask, updateTask, getTasks } from '../api';

export default function TaskForm({ mode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = mode === 'edit';
  const [form, setForm] = useState({ title: '', description: '', completed: false });
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        setLoading(true);
        const data = await getTasks();
        const task = data.find((t) => t.id === id);
        if (!task) {
          setError('Tarea no encontrada');
          return;
        }
        setForm({
          title: task.title,
          description: task.description,
          completed: task.completed
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim()) {
      setError('El título es obligatorio');
      return;
    }
    try {
      if (isEdit) {
        await updateTask(id, form);
      } else {
        await createTask(form);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Cargando tarea...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">{isEdit ? 'Editar tarea' : 'Crear tarea'}</p>
          <h1>{isEdit ? 'Actualiza la tarea' : 'Crea una nueva tarea'}</h1>
        </div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Título</span>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Ej: Armar propuesta"
            required
          />
        </label>
        <label className="form-field">
          <span>Descripción</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Detalles de la tarea"
          />
        </label>
        <label className="checkbox">
          <input type="checkbox" name="completed" checked={form.completed} onChange={handleChange} />
          <span>Marcar como completada</span>
        </label>
        {error && <p className="error">{error}</p>}
        <div className="form-actions">
          <button type="submit" className="button">
            {isEdit ? 'Guardar cambios' : 'Crear tarea'}
          </button>
          <button type="button" className="ghost" onClick={() => navigate('/')}>Cancelar</button>
        </div>
      </form>
    </section>
  );
}
