import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { randomUUID } from 'crypto';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

const corsOptions = CORS_ORIGIN === '*'
  ? { origin: true }
  : { origin: CORS_ORIGIN.split(',').map((o) => o.trim()) };

app.use(cors(corsOptions));
app.use(express.json());

const tasks = [];

const findTaskIndex = (id) => tasks.findIndex((task) => task.id === id);
const validateTaskPayload = (payload, { requireTitle } = { requireTitle: true }) => {
  const errors = [];
  if (requireTitle) {
    if (!payload.title || typeof payload.title !== 'string' || payload.title.trim() === '') {
      errors.push('title es obligatorio');
    }
  } else if (payload.title !== undefined && (typeof payload.title !== 'string' || payload.title.trim() === '')) {
    errors.push('title debe ser texto no vacio');
  }
  if (payload.description !== undefined && typeof payload.description !== 'string') {
    errors.push('description debe ser texto');
  }
  if (payload.completed !== undefined && typeof payload.completed !== 'boolean') {
    errors.push('completed debe ser boolean');
  }
  return errors;
};

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.get('/api/tasks', (_req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const errors = validateTaskPayload(req.body, { requireTitle: true });
  if (errors.length) {
    return res.status(400).json({ message: 'Payload invalido', errors });
  }

  const newTask = {
    id: randomUUID(),
    title: req.body.title.trim(),
    description: req.body.description?.trim() || '',
    completed: typeof req.body.completed === 'boolean' ? req.body.completed : false,
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  return res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = findTaskIndex(id);
  if (index === -1) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }
  const errors = validateTaskPayload(req.body, { requireTitle: false });
  if (errors.length) {
    return res.status(400).json({ message: 'Payload invalido', errors });
  }
  const current = tasks[index];
  const updated = {
    ...current,
    title: req.body.title?.trim() ?? current.title,
    description: req.body.description?.trim() ?? current.description,
    completed: typeof req.body.completed === 'boolean' ? req.body.completed : current.completed
  };
  tasks[index] = updated;
  return res.json(updated);
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = findTaskIndex(id);
  if (index === -1) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }
  tasks.splice(index, 1);
  return res.status(204).send();
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Error inesperado' });
});

app.listen(PORT, () => {
  console.log(`API escuchando en puerto ${PORT}`);
});
