import { Routes, Route, Link, Navigate } from 'react-router-dom';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';

function Layout({ children }) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="logo">?</span>
          <div>
            <p className="brand-title">ForIT Tasks</p>
            <p className="brand-sub">CRUD + React + Express</p>
          </div>
        </div>
        <nav className="nav">
          <Link to="/">Listado</Link>
          <Link className="button" to="/new">Nueva tarea</Link>
        </nav>
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">Demo challenge ForIT 2025 · React + Express</footer>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/new" element={<TaskForm mode="create" />} />
        <Route path="/edit/:id" element={<TaskForm mode="edit" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
