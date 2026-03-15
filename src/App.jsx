import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Afisha from './pages/Afisha';
import Contacts from './pages/Contacts';
import Kitchen from './pages/Kitchen';
import PhotoEvents from './pages/PhotoEvents'; 
import Login from './pages/Login';

// Импорты для админки
import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import EventsManager from './pages/Admin/EventsManager';
import GalleryManager from './pages/Admin/GalleryManager';
import AdminIndex from './pages/Admin/index';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-amber-50/30">
          <Header />
          
          <div className="pt-20">
            <main className="container mx-auto px-4 py-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6">
                <Routes>
                  {/* Публичные маршруты */}
                  <Route path="/" element={<Home />} />
                  <Route path="/afisha" element={<Afisha />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/kitchen" element={<Kitchen />} />
                  <Route path="/photo-events" element={<PhotoEvents />} />
                  <Route path="/login" element={<Login />} />
                  
                  {/* Защищенные маршруты админки */}
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }>
                    <Route index element={<AdminIndex />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="events" element={<EventsManager />} />
                    <Route path="gallery" element={<GalleryManager />} />
                  </Route>
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;