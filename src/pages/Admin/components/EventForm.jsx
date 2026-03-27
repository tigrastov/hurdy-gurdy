import { useState } from 'react';

const EventForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    ticket_url: '',
    image_url: '',
    venue: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time || !form.ticket_url || !form.image_url) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    const success = await onSubmit(form);
    if (success) {
      setForm({
        title: '',
        date: '',
        time: '',
        description: '',
        ticket_url: '',
        image_url: '',
        venue: ''
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
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
            className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ссылка на билеты *
          </label>
          <input
            type="url"
            name="ticket_url"
            value={form.ticket_url}
            onChange={handleChange}
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-amber-800 text-white px-6 py-2 rounded hover:bg-amber-900"
        >
          Добавить мероприятие
        </button>
      </form>
    </div>
  );
};

export default EventForm;