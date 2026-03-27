const EventCard = ({ event }) => {
  // Форматируем дату из YYYY-MM-DD в DD.MM.YYYY
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      {event.image_url && (
        <img 
          src={event.image_url} 
          alt={event.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x200?text=Нет+фото';
          }}
        />
      )}
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-amber-900 mb-2">
          {event.title}
        </h3>
        
        <div className="space-y-2 text-gray-600 mb-4 flex-grow">
          <p className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(event.date)} в {event.time}
          </p>
          
          {event.venue && (
            <p className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.venue}
            </p>
          )}
          
          {event.description && (
            <p className="text-sm text-gray-500 mt-2">
              {event.description}
            </p>
          )}
        </div>
        
        <a
          href={event.ticket_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-amber-800 text-white py-2 rounded hover:bg-amber-900 transition-colors mt-auto"
        >
          Купить билеты
        </a>
      </div>
    </div>
  );
};

export default EventCard;