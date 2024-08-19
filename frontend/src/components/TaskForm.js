import React, {useState} from 'react';
import './TaskForm.css';

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({title, isCompleted: false});
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Add a new task' required />
            <button type='submit'>Add Task</button>
        </form>
    );
};

export default TaskForm;