import { useState } from 'react';

const PhotoForm = ({ onSubmit }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      alert('Введите ссылку на фото');
      return;
    }

    const success = await onSubmit({ imageUrl, date });
    if (success) {
      setImageUrl('');
      // Дата сбрасывается на сегодня
      setDate(new Date().toISOString().split('T')[0]);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Добавить фото в галерею</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ссылка на фото (Postimages) *
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="https://i.postimg.cc/..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Дата съемки (для сортировки)
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <p className="text-xs text-gray-500 mt-1">
            По умолчанию — сегодня. Новые фото будут сверху.
          </p>
        </div>

        <button
          type="submit"
          className="bg-amber-800 text-white px-6 py-2 rounded hover:bg-amber-900"
        >
          Добавить фото
        </button>
      </form>
    </div>
  );
};

export default PhotoForm;