const EventList = ({ events, onDelete }) => {
  if (events.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-500 text-center py-8">Пока нет мероприятий</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        Текущие мероприятия ({events.length})
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {events.map(event => (
          <div key={event.id} className="border rounded-lg overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              {event.image_url && (
                <div className="w-full sm:w-32 h-40 sm:h-24 flex-shrink-0">
                  <img 
                    src={event.image_url} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base sm:text-lg mb-1">
                      {event.title}
                    </h3>
                    <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                      <p>Дата: {event.date} в {event.time}</p>
                      {event.venue && <p className="truncate">Место: {event.venue}</p>}
                    </div>
                  </div>
                  <button
                    onClick={() => onDelete(event.id)}
                    className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;