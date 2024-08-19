import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck, faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
import './Task.css';

const Task = ({task, updateTask, deleteTask}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(task.title);

    const handleUpdate = () => {
        updateTask(task.id, {...task, title: updatedTitle});
        setIsEditing(false);
    };

    const handleToggleComplete = () => {
        updateTask(task.id, { ...task, isCompleted: !task.isCompleted });
    }

    return (
        <li className='task'>
            {isEditing ? (
                <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} className='task-input'/>
            ): (
                <span className={task.isCompleted ? 'task-completed' : ''}>{task.title}</span>
            )}
            <div className="task-buttons">
                {isEditing ? (
                    <>
                        <button onClick={() => setIsEditing(false)} className='task-button'>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <button onClick={handleUpdate} className='task-button'>
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)} className="task-button">
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button onClick={() => deleteTask(task.id)} className="task-button">
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button onClick={handleToggleComplete} className="task-button">
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                    </>
                )}
            </div>
        </li>
    );
};

export default Task;