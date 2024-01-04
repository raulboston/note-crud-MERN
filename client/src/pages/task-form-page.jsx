import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TaskContext';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    CalendarIcon,
    CheckIcon,
    ChevronDownIcon,
    CurrencyDollarIcon,
    LinkIcon,
    MapPinIcon,
    PencilIcon,
  } from '@heroicons/react/20/solid'
  import { Menu, Transition } from '@headlessui/react'

  const availableColors = [
    { name: 'Default', color: '#e5e7eb' },
    { name: 'Amarillo', color: '#fef9c3' },
    { name: 'Verde Amarillo', color: '#ecfccb' },
    { name: 'Verde', color: '#bbf7d0' },
    { name: 'Azul', color: '#bae6fd' },
    { name: 'Morado', color: '#d8b4fe' },
    { name: 'Naranja', color: '#fed7aa' },
    { name: 'Rosa', color: '#fbcfe8'},
  ];
  
  function TaskFormPage({ task }) {
    const { register, handleSubmit, setValue } = useForm();
    const { createTask, getTask, updateTask } = useTasks();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [selectedColor, setSelectedColor] = useState('#e5e7eb'); // Valor predeterminado
    const navigate = useNavigate();
    const params = useParams();

    const cardStyle = {
        backgroundColor: selectedColor,
      };

      useEffect(() => {
        async function loadTask() {
          if (params.id) {
            const loadedTask = await getTask(params.id);       // Si hay un ID, obtén la tarea correspondiente llamando a la función getTask

            setTitle(loadedTask.title);
            setValue('description', loadedTask.description);
            setSelectedColor(loadedTask.color || '#e5e7eb');
            setIsEditing(true);
          }
        }
        loadTask();
      }, [params.id, getTask, setValue]);
    
      const handleColorChange = (color) => {
        setSelectedColor(color);
      };
    
      const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
          await updateTask(params.id, { title, ...data, color: selectedColor });
        } else {
          await createTask({ title, ...data, color: selectedColor });
        }
        setIsEditing(false);
        navigate('/tasks');
      });

      return (
        <div className='items-center justify-center flex'>
          <div className="max-w w-full h-max font-semibold p-10 rounded-md li text-slate-700 leading-snug relative" style={cardStyle}>
          <form onSubmit={onSubmit} className=''>
            <div className='lg:flex lg:items-center lg:justify-between'>
                
              <div className='min-w-0 flex-1'>
                {/* Input editable */}
                <input
                  type='text'
                  placeholder='Titulo'
                  {...register('title')}
                  autoFocus
                  className='placeholder-slate-600 text-2xlfont-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight w-full focus:outline-none' 
                  style={cardStyle}
                  defaultValue={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
    
                <div className='mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6'>
                  <div className='mt-2 flex items-center text-sm text-gray-500'>
                    <MapPinIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                    Remote
                  </div>
                  <div className='mt-2 flex items-center text-sm text-gray-500'>
                    <CurrencyDollarIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                    $120k &ndash; $140k
                  </div>
                  <div className='mt-2 flex items-center text-sm text-gray-500'>
                    <CalendarIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                    Actualizada el January 9, 2020
                  </div>
                </div>
              </div>
    
              <div className='mt-5 flex lg:ml-4 lg:mt-0'>
                
              <div className="flex items-center space-x-3">
            {availableColors.map((colorOption, index) => (
                <div
                key={index}
                className={`w-8 h-8 rounded-full cursor-pointer border-2 border-gray-400 transition-all duration-300 transform hover:scale-x-150 hover:scale-y-110${
                    selectedColor === colorOption.color
                    ? 'border-gray-400'
                    : 'border-gray-200'
                }`}
                style={{
                    backgroundColor: colorOption.color,
                    transformOrigin: 'center', // Establecer el origen de la transformación en el centro
                }}
                onClick={() => handleColorChange(colorOption.color)}
                ></div>
            ))}
            </div>
                <span className='sm:ml-3'>
                  <button
                    type='submit'
                    className='ml-4 inline-flex items-center rounded-md bg-gray-800 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-100 hover:text-gray-800'
                  >
                    <CheckIcon className='-ml-0.5 mr-1.5 h-5 w-5' aria-hidden='true' />
                    Publicar
                  </button>
                </span>
    
                {/* Dropdown */}
                <Menu as='div' className='relative ml-3 sm:hidden'>
                  <Menu.Button className='inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400'>
                    More
                    <ChevronDownIcon className='-mr-1 ml-1.5 h-5 w-5 text-gray-400' aria-hidden='true' />
                  </Menu.Button>
    
                  <Transition></Transition>
                </Menu>
              </div>
            </div>
    
              <textarea
                rows='20'
                className='mt-1 px-1 py-2 text-xl text-gray-600 placeholder-slate-500 focus:outline-none block w-full rounded-md '
                style={cardStyle}
                placeholder='Descripción'
                {...register('description')}
              />
            </form>
          </div>
        </div>
      );
    }
    
    export default TaskFormPage;