const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-amber-900">Главная страница</h1>
      <p className="mt-4 text-amber-800/70">Добро пожаловать в Харди-Гарди!</p>
      
      {/* Пример контента */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-amber-100/50 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-amber-900">Новости</h2>
          <p className="mt-2 text-amber-800/70">Скоро здесь появятся новости...</p>
        </div>
        <div className="bg-amber-100/50 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-amber-900">События</h2>
          <p className="mt-2 text-amber-800/70">Следите за афишей!</p>
        </div>
      </div>
    </div>
  );
};

export default Home;