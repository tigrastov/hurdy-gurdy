import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isCleaning, setIsCleaning] = useState(false);
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    ticket_url: '',
    image_url: '',
    venue: ''
  });

  // Загружаем и сортируем события
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'events'), (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Сортировка по дате (ближайшие сначала)
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

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time || !form.ticketUrl || !form.imageUrl) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    try {
      await addDoc(collection(db, 'events'), {
        ...form,
        createdAt: new Date().toISOString()
      });
      setForm({
        title: '',
        date: '',
        time: '',
        description: '',
        ticket_url: '',
        image_url: '',
        venue: ''
      });
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при добавлении');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Удалить мероприятие?')) {
      try {
        await deleteDoc(doc(db, 'events', id));
      } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при удалении');
      }
    }
  };

  const handleCleanup = async () => {
    if (!window.confirm('Удалить все прошедшие мероприятия? Это действие нельзя отменить.')) return;
    
    setIsCleaning(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Находим все мероприятия с датой меньше сегодня
      const q = query(
        collection(db, 'events'), 
        where('date', '<', today)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        alert('Нет прошедших мероприятий для удаления');
        setIsCleaning(false);
        return;
      }
      
      // Удаляем каждое
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="px-2 sm:px-0">
      {/* Заголовок с кнопками */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-amber-900">
          Управление афишей
        </h1>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
          <button
            onClick={handleCleanup}
            disabled={isCleaning}
            className="w-full sm:w-auto bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 disabled:opacity-50 transition-colors"
          >
            {isCleaning ? 'Очистка...' : 'Очистить прошедшие'}
          </button>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Выйти
          </button>
        </div>
      </div>

      {/* Форма добавления */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Добавить мероприятие</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Название *
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 border rounded text-sm sm:text-base"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Дата *
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-2 border rounded text-sm sm:text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Время *
              </label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full p-2 border rounded text-sm sm:text-base"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Место
            </label>
            <input
              type="text"
              name="venue"
              value={form.venue}
              onChange={handleChange}
              className="w-full p-2 border rounded text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Описание
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border rounded text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ссылка на билеты *
            </label>
            <input
              type="url"
              name="ticketUrl"
              value={form.ticketUrl}
              onChange={handleChange}
              className="w-full p-2 border rounded text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ссылка на изображение *
            </label>
            <input
              type="url"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              className="w-full p-2 border rounded text-sm sm:text-base"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-amber-800 text-white px-6 py-2 rounded hover:bg-amber-900 transition-colors"
          >
            Добавить мероприятие
          </button>
        </form>
      </div>

      {/* Список мероприятий */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Текущие мероприятия ({events.length})
        </h2>
        
        {events.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Пока нет мероприятий</p>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {events.map(event => (
              <div key={event.id} className="border rounded-lg overflow-hidden">
                {/* Адаптивная карточка */}
                <div className="flex flex-col sm:flex-row">
                  
                  {/* Картинка - на мобильных сверху, на десктопе слева */}
                  {event.image_url && (
                    <div className="w-full sm:w-32 h-40 sm:h-24 flex-shrink-0">
                      <img 
                        src={event.image_url} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Контент */}
                  <div className="flex-1 p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      
                      {/* Информация о мероприятии */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg mb-1">
                          {event.title}
                        </h3>
                        
                        <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                          <p className="flex items-center gap-1">
                            <span className="font-medium">Дата:</span> {event.date} в {event.time}
                          </p>
                          {event.venue && (
                            <p className="flex items-center gap-1 truncate">
                              <span className="font-medium">Место:</span> {event.venue}
                            </p>
                          )}
                          {event.description && (
                            <p className="text-gray-500 line-clamp-2 text-xs sm:text-sm">
                              {event.description}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* Кнопка удаления - на мобильных под контентом, на десктопе справа */}
                      <div className="flex sm:items-center justify-end mt-2 sm:mt-0">
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;