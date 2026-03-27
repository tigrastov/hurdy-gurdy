
import { useState } from 'react';

const PhotoList = ({ photos, onDelete }) => {
  const [previewPhoto, setPreviewPhoto] = useState(null);

  if (photos.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-500 text-center py-8">Пока нет фотографий</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
      {previewPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewPhoto(null)}
        >
          <button 
            onClick={() => setPreviewPhoto(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
          >
            &times;
          </button>
          <img 
            src={previewPhoto} 
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}

      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        Все фотографии ({photos.length})
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {photos.map(photo => (
          <div key={photo.id} className="relative group">
            <div 
              onClick={() => setPreviewPhoto(photo.image_url)}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer bg-gray-100"
            >
              <img 
                src={photo.image_url} 
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <button
              onClick={() => onDelete(photo.id)}
              className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-sm"
            >
              ×
            </button>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(photo.date || photo.created_at).toLocaleDateString('ru-RU')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoList;