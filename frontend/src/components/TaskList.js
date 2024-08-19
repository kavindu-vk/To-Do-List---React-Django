import React, { useState, useEffect} from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import Task from './Task';
import './TaskList.css'; 

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axios.get('http://127.0.0.1:8000/api/todo/')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the tasks!', error);
            });
    };

    const addTasks = (task) => {
        axios.post('http://127.0.0.1:8000/api/todo/', task)
            .then(response => {
                setTasks([...tasks, response.data]);
            })
            .catch(error => {
                console.error('There was an error adding the task!', error);
            });
    };

    const updateTasks = (id, updatedTask) => {
        axios.put(`http://127.0.0.1:8000/api/todo/${id}/`, updatedTask)
            .then(response => {
                setTasks(tasks.map(task => (task.id === id ? response.data : task)));
            })
            .catch(error => {
                console.error('There was an error updating the task!', error);
            });
    };

    const deleteTasks = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the task!', error);
            });
    };

    return (
        <div className='task-list-container'>
            <h1>To-Do List</h1>
            <TaskForm addTask={addTasks} />
                <ul className="task-list">
                    {tasks.map(task => (
                        <Task key={task.id} task={task} updateTask={updateTasks} deleteTask={deleteTasks} />
                    ))}
                </ul>
        </div>
    );
};

export default TaskList;