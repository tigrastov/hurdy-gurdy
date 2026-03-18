import { useState, useEffect } from 'react';
import { db } from '../../firebase'; 


const KitchenManager = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    image_url: '',
    title: '',
    sort_order: 0
  });

  // Загружаем фото с нашего API
  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await fetch('https://v3072312.hosted-by-vdsina.ru/api/kitchen.php');
      const data = await res.json();
      setPhotos(data);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.image_url || !form.title) {
      alert('Заполните все поля');
      return;
    }

    try {
      const res = await fetch('https://v3072312.hosted-by-vdsina.ru/api/kitchen/add.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (res.ok) {
        setForm({ image_url: '', title: '', sort_order: 0 });
        fetchPhotos(); // перезагружаем список
      }
    } catch (error) {
      console.error('Ошибка добавления:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить фото?')) return;
    
    try {
      await fetch('https://v3072312.hosted-by-vdsina.ru/api/kitchen/delete.php', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      fetchPhotos();
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-amber-900 mb-6">Управление кухней</h1>
      
      {/* Форма добавления */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Добавить фото</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Ссылка на фото *</label>
            <input
              type="url"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Название *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Порядок сортировки</label>
            <input
              type="number"
              name="sort_order"
              value={form.sort_order}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-amber-800 text-white px-4 py-2 rounded"
          >
            Добавить
          </button>
        </form>
      </div>

      {/* Список фото */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Все фото ({photos.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map(photo => (
            <div key={photo.id} className="border rounded-lg overflow-hidden">
              <img 
                src={photo.image_url} 
                alt={photo.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-2">
                <p className="text-sm truncate">{photo.title}</p>
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="mt-2 w-full bg-red-500 text-white text-sm py-1 rounded"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KitchenManager;