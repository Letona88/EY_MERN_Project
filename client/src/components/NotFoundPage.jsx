function NotFoundPage(){
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="text-xl md:text-3xl font-semibold text-gray-700 mt-4">
          Oops! Página no encontrada.
        </p>
        <p className="mt-2 text-gray-600">
          Lo sentimos, pero la página que buscas no existe o fue movida.
        </p>
        <a href="/dashboard" className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
