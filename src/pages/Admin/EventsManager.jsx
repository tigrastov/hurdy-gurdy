import { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

const EventsManager = () => {
  const [events, setEvents] = useState([]);
  const [isCleaning, setIsCleaning] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'events'), (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      eventsData.sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        if (a.time && b.time) return a.time.localeCompare(b.time);
        return 0;
      });
      
      setEvents(eventsData);
    });
    return () => unsubscribe();
  }, []);

  const handleAddEvent = async (formData) => {
    try {
      await addDoc(collection(db, 'events'), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error('Ошибка:', error);
      return false;
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm('Удалить мероприятие?')) {
      try {
        await deleteDoc(doc(db, 'events', id));
        return true;
      } catch (error) {
        console.error('Ошибка:', error);
        return false;
      }
    }
    return false;
  };

  const handleCleanup = async () => {
    if (!window.confirm('Удалить все прошедшие мероприятия? Это действие нельзя отменить.')) return;
    
    setIsCleaning(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const q = query(collection(db, 'events'), where('date', '<', today));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        alert('Нет прошедших мероприятий для удаления');
        return;
      }
      
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      alert(`Удалено ${querySnapshot.size} прошедших мероприятий`);
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