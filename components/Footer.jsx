const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-4">
            © {new Date().getFullYear()} Lyle Oliver. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-blue-400 transition">GitHub</a>
            <a href="#" className="hover:text-blue-400 transition">LinkedIn</a>
            <a href="#" className="hover:text-blue-400 transition">Twitter</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;