import React, { useState } from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

const initialTasks = [
  {
    start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),
    end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 2, 0),
    name: 'Requirement Analysis',
    id: 'Task 1',
    type: 'task',
    progress: 100,
    isDisabled: false,
    styles: { progressColor: '#4f46e5', progressSelectedColor: '#312e81' },
  },
  {
    start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 2, 0),
    end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 6, 0),
    name: 'UI Design',
    id: 'Task 2',
    type: 'task',
    progress: 45,
    dependencies: ['Task 1'],
    isDisabled: false,
    styles: { progressColor: '#e11d48', progressSelectedColor: '#9f1239' },
  },
  {
    start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 6, 0),
    end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 11, 0),
    name: 'API Development',
    id: 'Task 3',
    type: 'task',
    progress: 20,
    dependencies: ['Task 2'],
    isDisabled: false,
    styles: { progressColor: '#e11d48', progressSelectedColor: '#9f1239' },
  },
  {
    start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),
    end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 3, 0),
    name: 'Database Design',
    id: 'Task 4',
    type: 'task',
    progress: 80,
    isDisabled: false,
    styles: { progressColor: '#0ea5e9', progressSelectedColor: '#0369a1' },
  },
];

const Timeline = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [view, setView] = useState(ViewMode.Hour);

  const handleTaskChange = (task) => {
    let newTasks = tasks.map(t => (t.id === task.id ? task : t));
    setTasks(newTasks);
  };

  const handleTaskDelete = (task) => {
    const conf = window.confirm(`Are you sure about deleting ${task.name} ?`);
    if (conf) {
      setTasks(tasks.filter(t => t.id !== task.id));
    }
  };

  const handleProgressChange = async (task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
  };

  const handleExpanderClick = (task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="heading-1">Advanced Gantt Timeline</h1>
        <div className="flex gap-2">
          <button className={`btn-${view === ViewMode.Hour ? 'primary' : 'secondary'} text-sm px-3 py-1`} onClick={() => setView(ViewMode.Hour)}>Hour</button>
          <button className={`btn-${view === ViewMode.HalfDay ? 'primary' : 'secondary'} text-sm px-3 py-1`} onClick={() => setView(ViewMode.HalfDay)}>Half Day</button>
          <button className={`btn-${view === ViewMode.Day ? 'primary' : 'secondary'} text-sm px-3 py-1`} onClick={() => setView(ViewMode.Day)}>Day</button>
        </div>
      </div>
      
      <div className="card flex-1 overflow-auto bg-[var(--bg-main)] p-0 border border-[var(--border-light)]">
        <div className="min-w-[800px] h-full p-4">
           {tasks.length > 0 ? (
            <Gantt
              tasks={tasks}
              viewMode={view}
              onDateChange={handleTaskChange}
              onDelete={handleTaskDelete}
              onProgressChange={handleProgressChange}
              onExpanderClick={handleExpanderClick}
              listCellWidth="155px"
              columnWidth={65}
              ganttHeight={300}
            />
           ) : (
            <div className="text-center text-secondary mt-10">No tasks available</div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
