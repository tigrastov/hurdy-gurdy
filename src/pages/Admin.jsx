import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    ticketUrl: '',
    imageUrl: '',
    venue: ''
  });

  // Загружаем события в реальном времени
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'events'), (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
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
    
    // Проверяем, что все поля заполнены
    if (!form.title || !form.date || !form.time || !form.ticketUrl || !form.imageUrl) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    try {
      await addDoc(collection(db, 'events'), {
        ...form,
        createdAt: new Date().toISOString()
      });
      
      // Очищаем форму
      setForm({
        title: '',
        date: '',
        time: '',
        description: '',
        ticketUrl: '',
        imageUrl: '',
        venue: ''
      });
      
      alert('Мероприятие добавлено!');
    } catch (error) {
      console.error('Ошибка при добавлении:', error);
      alert('Ошибка при добавлении мероприятия');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить это мероприятие?')) {
      try {
        await deleteDoc(doc(db, 'events', id));
      } catch (error) {
        console.error('Ошибка при удалении:', error);
        alert('Ошибка при удалении');
      }
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-amber-900">
          Управление афишей
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Выйти
        </button>
      </div>

      {/* Форма добавления */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Добавить мероприятие</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Название мероприятия *
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Дата *
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-amber-500"
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
                className="w-full p-2 border rounded focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Место проведения
            </label>
            <input
              type="text"
              name="venue"
              value={form.venue}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-amber-500"
              placeholder="Название клуба или адрес"
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
              className="w-full p-2 border rounded focus:ring-2 focus:ring-amber-500"
              placeholder="Краткое описание мероприятия"
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
              className="w-full p-2 border rounded focus:ring-2 focus:ring-amber-500"
              placeholder="https://ticketsite.com/event"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ссылка на изображение (Postimages) *
            </label>
            <input
              type="url"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-amber-500"
              placeholder="https://i.postimg.cc/xyz/image.jpg"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-amber-800 text-white px-6 py-2 rounded hover:bg-amber-900 transition-colors"
          >
            Добавить мероприятие
          </button>
        </form>
      </div>

      {/* Список мероприятий */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Текущие мероприятия</h2>
        
        {events.length === 0 ? (
          <p className="text-gray-500">Пока нет мероприятий</p>
        ) : (
          <div className="space-y-4">
            {events.map(event => (
              <div key={event.id} className="border rounded-lg p-4 flex justify-between items-start">
                <div className="flex gap-4">
                  {event.imageUrl && (
                    <img 
                      src={event.imageUrl} 
                      alt={event.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <p className="text-gray-600">
                      {event.date} в {event.time}
                    </p>
                    {event.venue && (
                      <p className="text-sm text-gray-500">{event.venue}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;