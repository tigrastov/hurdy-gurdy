import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const navItems = [
    { path: '/admin', label: 'Дашборд', icon: '📊' },
    { path: '/admin/events', label: 'Афиши', icon: '📅' },
    { path: '/admin/gallery', label: 'Галерея', icon: '🖼️' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Верхняя панель */}
      <header className="bg-[#3C1E0F] text-white shadow-md fixed top-0 left-0 right-0 z-30">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-white text-2xl"
            >
              ☰
            </button>
            <h1 className="text-xl font-bold">Харди-Гарди | Админ-панель</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
          >
            Выйти
          </button>
        </div>
      </header>

      {/* Боковое меню (десктоп - всегда видно, мобильное - выезжает) */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 pt-16 transition-transform duration-300
        lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map(item => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-amber-100 text-amber-900 font-semibold' 
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Затемнение для мобильного меню */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-35 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Основной контент */}
      <main className="lg:ml-64 pt-16 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;