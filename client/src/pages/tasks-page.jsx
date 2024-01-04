import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from '../components/TaskCard';

function TasksPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) {
    return (
      <div>
        <h1 className="text-2xl text-gray-800 font-semibold">Ups, luce un poco vacío por aquí, comienza agregando una tarea</h1>
      </div>
    );
  }

  // Ordena las tareas por fecha de forma descendente (de la más reciente a la más antigua)
  const sortedTasks = tasks.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <div>
        <div className="grid grid-cols-4">
          {sortedTasks.map((task) => (
            <TaskCard task={task} key={task._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TasksPage;
