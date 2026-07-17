import { useState } from 'react';
import { X, CalendarDays, ChevronLeft, ChevronRight, Plus, Droplets, Wheat, Scissors, Trash2 } from 'lucide-react';

type EventType = 'sowing' | 'irrigation' | 'harvesting';

interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  type: EventType;
  label: string;
}

const EVENT_STYLES: Record<EventType, { color: string; bg: string; icon: React.ReactNode; label: string }> = {
  sowing:     { color: 'text-emerald-700', bg: 'bg-emerald-100', icon: <Wheat className="w-3 h-3" />,    label: 'Sowing' },
  irrigation: { color: 'text-blue-700',    bg: 'bg-blue-100',    icon: <Droplets className="w-3 h-3" />, label: 'Irrigation' },
  harvesting: { color: 'text-amber-700',   bg: 'bg-amber-100',   icon: <Scissors className="w-3 h-3" />, label: 'Harvesting' },
};

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const toKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;

export const FarmCalendar = () => {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [newType, setNewType] = useState<EventType>('sowing');
  const [newLabel, setNewLabel] = useState('');

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const eventsForDate = (dateKey: string) => events.filter(e => e.date === dateKey);

  const addEvent = () => {
    if (!selectedDate || !newLabel.trim()) return;
    setEvents(prev => [...prev, {
      id: Date.now().toString(),
      date: selectedDate,
      type: newType,
      label: newLabel.trim(),
    }]);
    setNewLabel('');
    setShowAddForm(false);
  };

  const deleteEvent = (id: string) => setEvents(prev => prev.filter(e => e.id !== id));

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Upcoming events (next 7 days)
  const upcoming = events
    .filter(e => {
      const d = new Date(e.date);
      const diff = (d.getTime() - today.getTime()) / 86400000;
      return diff >= 0 && diff <= 7;
    })
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  return (
    <>
      {/* Header icon button */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition relative"
        title="Farm Calendar"
      >
        <CalendarDays className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-green-600" />
                <h2 className="font-bold text-gray-800 dark:text-gray-100 text-lg">Farm Calendar</h2>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {/* Legend */}
              <div className="flex flex-wrap gap-3 mb-5">
                {(Object.entries(EVENT_STYLES) as [EventType, typeof EVENT_STYLES[EventType]][]).map(([type, s]) => (
                  <div key={type} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${s.bg} ${s.color}`}>
                    {s.icon} {s.label}
                  </div>
                ))}
              </div>

              {/* Month navigation */}
              <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
                <h3 className="font-bold text-gray-800 dark:text-gray-100">
                  {MONTHS[month]} {year}
                </h3>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-1">
                {DAYS.map(d => (
                  <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {cells.map((day, idx) => {
                  if (!day) return <div key={idx} />;
                  const dateKey = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
                  const dayEvents = eventsForDate(dateKey);
                  const isToday = toKey(today) === dateKey;
                  return (
                    <div
                      key={idx}
                      onClick={() => { setSelectedDate(dateKey); setShowAddForm(true); }}
                      className={`min-h-[52px] p-1 rounded-xl border cursor-pointer transition hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 ${
                        isToday
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                          : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800'
                      }`}
                    >
                      <p className={`text-xs font-semibold text-center mb-1 ${isToday ? 'text-green-600' : 'text-gray-700 dark:text-gray-300'}`}>
                        {day}
                      </p>
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 2).map(ev => {
                          const s = EVENT_STYLES[ev.type];
                          return (
                            <div key={ev.id} className={`flex items-center gap-1 px-1 py-0.5 rounded text-[10px] font-medium truncate ${s.bg} ${s.color}`}>
                              {s.icon}
                              <span className="truncate">{ev.label}</span>
                            </div>
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <p className="text-[10px] text-gray-400 text-center">+{dayEvents.length - 2}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add event form */}
              {showAddForm && (
                <div className="mt-5 p-4 border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 rounded-xl">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                    Add event for {selectedDate}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <select
                      value={newType}
                      onChange={e => setNewType(e.target.value as EventType)}
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="sowing">🌱 Sowing</option>
                      <option value="irrigation">💧 Irrigation</option>
                      <option value="harvesting">🌾 Harvesting</option>
                    </select>
                    <input
                      type="text"
                      value={newLabel}
                      onChange={e => setNewLabel(e.target.value)}
                      placeholder="Crop name or note..."
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      onKeyDown={e => e.key === 'Enter' && addEvent()}
                    />
                    <button
                      onClick={addEvent}
                      className="flex items-center gap-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Upcoming events */}
              {upcoming.length > 0 && (
                <div className="mt-5">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Upcoming (next 7 days)</h4>
                  <div className="space-y-2">
                    {upcoming.map(ev => {
                      const s = EVENT_STYLES[ev.type];
                      return (
                        <div key={ev.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.bg} ${s.color}`}>
                              {s.icon}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{ev.label}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{s.label} · {ev.date}</p>
                            </div>
                          </div>
                          <button onClick={() => deleteEvent(ev.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
