import { useState, useEffect } from 'react';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../../firebase';

const Dashboard = () => {
  const [stats, setStats] = useState({
    events: 0,
    gallery: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const eventsSnapshot = await getCountFromServer(collection(db, 'events'));
        const gallerySnapshot = await getCountFromServer(collection(db, 'gallery'));
        
        setStats({
          events: eventsSnapshot.data().count,
          gallery: gallerySnapshot.data().count
        });
      } catch (error) {
        console.error('Ошибка загрузки статистики:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Загрузка...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-amber-900 mb-8">Дашборд</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Афиши</h2>
          <p className="text-3xl font-bold text-amber-800">{stats.events}</p>
          <p className="text-gray-500 mt-2">всего мероприятий</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Галерея</h2>
          <p className="text-3xl font-bold text-amber-800">{stats.gallery}</p>
          <p className="text-gray-500 mt-2">всего фотографий</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;