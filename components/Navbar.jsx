const Navbar = () => {
    return (
      <nav className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-bold text-blue-600">Lyle Oliver</span>
            <div className="hidden sm:flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition">Home</a>
              <a href="/projects" className="text-gray-600 hover:text-blue-600 transition">Projects</a>
              <a href="/contact" className="text-gray-600 hover:text-blue-600 transition">Contact</a>
            </div>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;