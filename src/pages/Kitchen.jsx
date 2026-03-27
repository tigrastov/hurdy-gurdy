import { useState, useEffect } from 'react';
import { kitchenAPI } from '../api/api';

const Kitchen = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const data = await kitchenAPI.getAll();
                setPhotos(data);
            } catch (error) {
                console.log('Ошибка:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    if (loading) {
        return <div className="text-center py-12">Загрузка...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-amber-900 mb-8">Кухня</h1>

            {photos.length === 0 ? (
                <p className="text-gray-500">Пока нет фотографий</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map(photo => (
                        <div key={photo.id} className="aspect-square overflow-hidden rounded-lg">
                            <img
                                src={photo.image_url}
                                alt={photo.title || 'Фото кухни'}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Kitchen;