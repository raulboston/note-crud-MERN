import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";

import RegisterPage from "./pages/register-page";
import LoginPage from "./pages/login-page";
import TaskFormPage from "./pages/task-form-page";
import ProfilePage from "./pages/profile-page";
import HomePage from "./pages/home-page";
import ProtectedRoute from "./protectedRoute";
import TasksPage from "./pages/tasks-page";
import Navbar from "./components/Nav";
import "./App.css";

function App() {
  return (
      <AuthProvider>
        <TaskProvider>
          <BrowserRouter>
            <Navbar />
            <header className="bg-white">
              <div className="mx-auto max-w-screen-2xl py-6 lg:px-8">
                <h1 className="text-5xl font-semibold  text-gray-900">Inicio</h1>
              </div>
            </header>
            <main className="mx-auto max-w-screen-2xl py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              </Routes>
              </main>
            </BrowserRouter>
          </TaskProvider>
        </AuthProvider>
  );
}

export default App;
