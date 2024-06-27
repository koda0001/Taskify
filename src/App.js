import './App.css';
import React, { useState } from 'react';
import { format, addDays, subDays, differenceInCalendarDays } from 'date-fns';

function App() {
  const [tasks, setTasks] = useState({});
  const [taskInput, setTaskInput] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  const formattedDate = format(currentDate, 'EEEE dd.MM.yyyy');
  const today = new Date();

  const addTask = () => {
    if (taskInput.trim() !== '') {
      const dateKey = format(currentDate, 'dd.MM.yyyy');
      setTasks({
        ...tasks,
        [dateKey]: [...(tasks[dateKey] || []), taskInput],
      });
      setTaskInput('');
    }
  };

  const deleteTask = (index) => {
    const dateKey = format(currentDate, 'dd.MM.yyyy');
    const newTasksForDate = tasks[dateKey].filter((_, i) => i !== index);
    setTasks({
      ...tasks,
      [dateKey]: newTasksForDate,
    });
  };

  const changeDate = (days) => {
    setCurrentDate(addDays(currentDate, days));
  };


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  const tasksForCurrentDate = tasks[format(currentDate, 'dd.MM.yyyy')] || [];
  const tasksForBeforeDate = tasks[format(subDays(currentDate, 1), 'dd.MM.yyyy')] || [];
  const tasksForLaterDate = tasks[format(addDays(currentDate, 1), 'dd.MM.yyyy')] || [];

  const getDateStateText = () => {
    const diff = differenceInCalendarDays(currentDate, today);
    if (diff === 0) {
      return `Today is ${formattedDate}`;
    } else if (diff === 1) {
      return `Tomorrow is ${formattedDate}`;
    } else if (diff === -1) {
      return `Yesterday was ${formattedDate}`;
    } else if (diff > 1) {
      return `In ${diff} days is ${formattedDate}`;
    } else {
      return `${Math.abs(diff)} days ago was ${formattedDate}`;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="title">TASKIFY</div>
        <div className="dateState">{getDateStateText()}</div>
      </header>
      <div className="date-navigation">
        <button onClick={() => changeDate(-1)}>Previous Day</button>
        <button onClick={() => changeDate(1)}>Next Day</button>
      </div>
      <div className="task-input">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a new task"
        />
      </div>
      .
      <div className='task-list-before'>
      {tasksForBeforeDate.map((task, index) => (
          <div key={index} className="task">
            {task}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="task-list">
        {tasksForCurrentDate.map((task, index) => (
          <div key={index} className="task">
            {task}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="task-list-later">
        {tasksForLaterDate.map((task, index) => (
          <div key={index} className="task">
            {task}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;