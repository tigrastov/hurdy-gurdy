import { useState, useEffect } from 'react';
import { eventsAPI } from '../../api/api';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

const EventsManager = () => {
  const [events, setEvents] = useState([]);
  const [isCleaning, setIsCleaning] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventsAPI.getAll();
      setEvents(data);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
  };

  const handleAddEvent = async (formData) => {
    try {
      await eventsAPI.add(formData);
      await fetchEvents();
      return true;
    } catch (error) {
      console.error('Ошибка:', error);
      return false;
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Удалить мероприятие?')) return false;
    
    try {
      await eventsAPI.delete(id);
      await fetchEvents();
      return true;
    } catch (error) {
      console.error('Ошибка:', error);
      return false;
    }
  };

  const handleCleanup = async () => {
    if (!window.confirm('Удалить все прошедшие мероприятия? Это действие нельзя отменить.')) return;
    
    setIsCleaning(true);
    try {
      const result = await eventsAPI.cleanup();
      alert(`Удалено ${result.deleted} прошедших мероприятий`);
      await fetchEvents();
    } catch (error) {
      console.error('Ошибка при очистке:', error);
      alert('Ошибка при очистке');
    } finally {
      setIsCleaning(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-amber-900">Управление афишей</h1>
        <button
          onClick={handleCleanup}
          disabled={isCleaning}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 disabled:opacity-50"
        >
          {isCleaning ? 'Очистка...' : 'Очистить прошедшие'}
        </button>
      </div>

      <EventForm onSubmit={handleAddEvent} />
      <EventList events={events} onDelete={handleDeleteEvent} />
    </div>
  );
};

export default EventsManager;