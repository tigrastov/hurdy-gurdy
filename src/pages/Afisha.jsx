import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import EventCard from '../components/EventCard';

const Afisha = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const eventsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));


        eventsData.sort((a, b) => a.date.localeCompare(b.date));

        setEvents(eventsData);
      } catch (error) {
        console.error('Ошибка загрузки афиши:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-amber-800">Загрузка афиши...</div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-600">
          Пока нет предстоящих мероприятий
        </h2>
        <p className="text-gray-500 mt-2">
          Скоро мы опубликуем афишу
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-amber-900 mb-8">
        Афиша мероприятий
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {events.map(event => (
          <div key={event.id} className="w-full max-w-sm"> 
            <EventCard key={event.id} event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}; 

export default Afisha;