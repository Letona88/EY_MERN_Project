function Navbar() {
  return (
    <nav className="bg-blue-500">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src="/logo.svg"
                alt="Your Logo"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="/logo.svg"
                alt="Your Logo"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Add Purchase
                </a>
                <a
                  href="#"
                  className="text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  List Purchases
                </a>
                <a
                  href="#"
                  className="text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  View Charts
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
