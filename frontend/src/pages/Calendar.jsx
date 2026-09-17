import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const events = [
    { day: 5, title: 'AI Study Session', time: '10:00 AM', location: 'Library' },
    { day: 12, title: 'Project Meeting', time: '02:00 PM', location: 'Conference Room A' },
    { day: 20, title: 'Exam Prep', time: '09:00 AM', location: 'Home' },
    { day: 25, title: 'Gym Workout', time: '06:00 AM', location: 'Fitness Center' }
  ];

  return (
    <div className="flex flex-col h-full gap-lg">
      <div className="flex justify-between items-center card py-4">
        <h2 className="heading-3 flex items-center gap-2"><CalendarIcon /> Calendar View</h2>
        <div className="flex items-center gap-4">
          <button className="p-2 btn-secondary rounded-full" onClick={prevMonth}>
            <ChevronLeft size={20} />
          </button>
          <span className="text-lg font-semibold w-40 text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button className="p-2 btn-secondary rounded-full" onClick={nextMonth}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="card flex-1 p-0 overflow-hidden flex flex-col">
        <div className="grid grid-cols-7 border-b border-[var(--border-light)] bg-[var(--bg-main)]">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-4 text-center font-semibold text-secondary">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 flex-1 auto-rows-fr">
          {blanks.map(blank => (
            <div key={`blank-${blank}`} className="border-b border-r border-[var(--border-light)] bg-[var(--bg-main)] opacity-50 p-2 min-h-[100px]"></div>
          ))}
          {days.map(day => {
            const dayEvents = events.filter(e => e.day === day);
            return (
              <div key={day} className="border-b border-r border-[var(--border-light)] p-2 min-h-[100px] hover:bg-[var(--accent-bg)] transition-colors group">
                <div className="font-semibold text-right text-secondary group-hover:text-[var(--accent)]">{day}</div>
                <div className="mt-2 flex flex-col gap-1">
                  {dayEvents.map((evt, idx) => (
                    <div key={idx} className="text-xs p-2 rounded bg-[var(--accent-primary)] text-white truncate cursor-pointer hover:opacity-90 shadow-sm" title={`${evt.title}\n${evt.time} - ${evt.location}`}>
                      <div className="font-semibold">{evt.title}</div>
                      <div className="flex items-center gap-1 mt-1 opacity-80"><Clock size={10} /> {evt.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
