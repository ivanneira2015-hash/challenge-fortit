const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const handleResponse = async (res) => {
  const contentType = res.headers.get('content-type');
  const hasJson = contentType && contentType.includes('application/json');
  const data = hasJson ? await res.json() : null;
  if (!res.ok) {
    const message = data?.message || 'Error en la solicitud';
    const errors = data?.errors || [];
    const err = new Error(message);
    err.errors = errors;
    err.status = res.status;
    throw err;
  }
  return data;
};

export async function getTasks() {
  const res = await fetch(`${API_URL}/api/tasks`);
  return handleResponse(res);
}

export async function createTask(task) {
  const res = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  return handleResponse(res);
}

export async function updateTask(id, task) {
  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  return handleResponse(res);
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/api/tasks/${id}`, { method: 'DELETE' });
  if (res.status === 204) return true;
  return handleResponse(res);
}
