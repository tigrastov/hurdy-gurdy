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
import Admin from './pages/Admin';
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
                  <Route path="/" element={<Home />} />
                  <Route path="/afisha" element={<Afisha />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/kitchen" element={<Kitchen />} />
                  <Route path="/photo-events" element={<PhotoEvents />} />
                  <Route path="/login" element={<Login />} />
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute>
                        <Admin />
                      </ProtectedRoute>
                    } 
                  />
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