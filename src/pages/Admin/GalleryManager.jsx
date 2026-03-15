import { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import PhotoForm from './components/PhotoForm';
import PhotoList from './components/PhotoList';

const GalleryManager = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'gallery'), (snapshot) => {
      const photosData = snapshot.docs.map(doc => ({
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
    });
    return () => unsubscribe();
  }, []);

  const handleAddPhoto = async (formData) => {
    try {
      await addDoc(collection(db, 'gallery'), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error('Ошибка:', error);
      return false;
    }
  };

  const handleDeletePhoto = async (id) => {
    if (window.confirm('Удалить фотографию?')) {
      try {
        await deleteDoc(doc(db, 'gallery', id));
        return true;
      } catch (error) {
        console.error('Ошибка:', error);
        return false;
      }
    }
    return false;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-amber-900 mb-6">Управление галереей</h1>
      <PhotoForm onSubmit={handleAddPhoto} />
      <PhotoList photos={photos} onDelete={handleDeletePhoto} />
    </div>
  );
};

export default GalleryManager;