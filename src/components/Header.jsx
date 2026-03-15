import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Классы для активных ссылок в десктопном меню
  const getDesktopNavClass = ({ isActive }) =>
    isActive
      ? "text-white font-semibold border-b-2 border-white pb-1"
      : "text-white/90 hover:text-white transition-colors";

  // Классы для ссылок в мобильном меню
  const getMobileNavClass = ({ isActive }) =>
    `block py-2 px-4 rounded-lg transition-colors ${isActive
      ? 'bg-white/20 text-white font-semibold'
      : 'text-white/80 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <>
      <header className="bg-[#3C1E0F] shadow-md fixed top-0 left-0 right-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Логотип */}
            <Link to="/" className="text-2xl font-bold text-white" onClick={closeMenu}>
              Харди-Гарди
            </Link>

            {/* Десктопное меню (скрыто на мобильных) */}
            <ul className="hidden md:flex space-x-6">
              <li>
                <NavLink to="/" className={getDesktopNavClass}>
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={getDesktopNavClass}>
                  О нас
                </NavLink>
              </li>

              <li>
                <NavLink to="/kitchen" className={getDesktopNavClass}>
                  Кухня
                </NavLink>
              </li>

              <li>
                <NavLink to="/photo-events" className={getDesktopNavClass}>
                  Галерея
                </NavLink>
              </li>

              

              <li>
                <NavLink to="/afisha" className={getDesktopNavClass}>
                  Афиша
                </NavLink>
              </li>

              <li>
                <NavLink to="/contacts" className={getDesktopNavClass}>
                  Контакты
                </NavLink>
              </li>

              {user && (
                <li>
                  <NavLink to="/admin" className={getDesktopNavClass}>
                    Админка
                  </NavLink>
                </li>
              )}
            </ul>

            {/* Кнопка бургер (только на мобильных) */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
              onClick={toggleMenu}
              aria-label="Меню"
            >
              {isMenuOpen ? (
                // Крестик
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Бургер
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Затемнение фона при открытом меню */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity"
          onClick={closeMenu}
        />
      )}

      {/* Боковое меню (слайдер) */}
      <div className={`
        fixed top-0 right-0 h-full w-64 bg-[#3C1E0F] shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-6">
          {/* Заголовок меню */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold text-white">Меню</h2>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
              aria-label="Закрыть меню"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Навигация в боковом меню */}
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/"
                className={getMobileNavClass}
                onClick={closeMenu}
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={getMobileNavClass}
                onClick={closeMenu}
              >
                О нас
              </NavLink>
            </li>
            

            <li>
              <NavLink
                to="/kitchen"
                className={getMobileNavClass}
                onClick={closeMenu}
              >
                Кухня
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/photo-events"
                className={getMobileNavClass}
                onClick={closeMenu}
              >
                Галерея
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/afisha"
                className={getMobileNavClass}
                onClick={closeMenu}
              >
                Афиша
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacts"
                className={getMobileNavClass}
                onClick={closeMenu}
              >
                Контакты
              </NavLink>

            </li>

            {user && (
              <li>
                <NavLink
                  to="/admin"
                  className={getMobileNavClass}
                  onClick={closeMenu}
                >
                  Админка
                </NavLink>
              </li>
            )}

          </ul>

          {/* Дополнительная информация */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="border-t border-white/20 pt-4">
              <p className="text-sm text-white/60 text-center">
                © 2026 Харди-Гарди
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;