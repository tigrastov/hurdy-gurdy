import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const PhotoEvents = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'gallery'));
        const photosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Сортируем по дате (новые сверху)
        photosData.sort((a, b) => {
          const dateA = a.date || a.createdAt;
          const dateB = b.date || b.createdAt;
          return dateB.localeCompare(dateA);
        });
        
        setPhotos(photosData);
      } catch (error) {
        console.error('Ошибка загрузки фотографий:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-amber-800">Загрузка фотографий...</div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-600">
          Пока нет фотографий
        </h2>
        <p className="text-gray-500 mt-2">
          Скоро появятся фото с мероприятий
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Модальное окно для просмотра фото */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button 
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
          >
            &times;
          </button>
          <img 
            src={selectedPhoto} 
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}

      <h1 className="text-3xl font-bold text-amber-900 mb-8">
        Фото мероприятий
      </h1>

      {/* Сетка фотографий */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
        {photos.map(photo => (
          <div 
            key={photo.id}
            onClick={() => setSelectedPhoto(photo.imageUrl)}
            className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition bg-gray-100"
          >
            <img 
              src={photo.imageUrl} 
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Всего фотографий: {photos.length}
      </p>
    </div>
  );
};

export default PhotoEvents;