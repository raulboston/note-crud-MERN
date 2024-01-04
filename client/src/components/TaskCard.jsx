import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

function TaskCard({task}){
    const {deleteTask} = useTasks();

    const cardStyle = {
        backgroundColor: task.color || '#e5e7eb', // Usa el color de la tarea o un valor predeterminado
      };

      const handleEditClick = (e) => {
        // Manejar la lógica de editar aquí
        // Detener la propagación del evento para evitar que alcance el contenedor Link
        e.stopPropagation();
      };
    
      const handleDeleteClick = (e) => {
        // Manejar la lógica de eliminar aquí
        // Detener la propagación del evento para evitar que alcance el contenedor Link
        e.stopPropagation();
        deleteTask(task._id);
      };

      return (
        <div
          className="container p-10 w-80 mx-auto my-3 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 duration-500"
          style={cardStyle}
        >
          <Link to={`/tasks/${task._id}`}>
            <h1 className="text-slate-600 uppercase text-2xl font-bold tracking-wider">
              {task.title}
            </h1>
            <p className="text-slate-500 my-2 overflow-hidden line-clamp-3">
              {task.description}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {new Date(task.date).toLocaleDateString()}
            </p>
          </Link>
          <div className="flex gap-x-2 items-center mt-5">
            <button
              className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md"
              onClick={handleEditClick}
            >
              Editar
            </button>
            <button
              className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
              onClick={handleDeleteClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Icono de eliminar */}
              </svg>
              Eliminar
            </button>
          </div>
        </div>
      );
    }

export default TaskCard