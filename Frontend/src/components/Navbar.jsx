// Crear src/components/Navbar.jsx
import { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className={`text-2xl font-bold ${
          isScrolled ? 'text-blue-600' : 'text-white'
        }`}>
          JRV
        </a>
        
        <div className="flex gap-6">
          <a href="#sobre-mi" className={`hover:text-blue-600 transition-colors ${
            isScrolled ? 'text-gray-700' : 'text-white'
          }`}>
            Sobre mí
          </a>
          <a href="#proyectos" className={`hover:text-blue-600 transition-colors ${
            isScrolled ? 'text-gray-700' : 'text-white'
          }`}>
            Proyectos
          </a>
          <a href="#skills" className={`hover:text-blue-600 transition-colors ${
            isScrolled ? 'text-gray-700' : 'text-white'
          }`}>
            Skills
          </a>
          <a href="#stats" className={`hover:text-blue-600 transition-colors ${
            isScrolled ? 'text-gray-700' : 'text-white'
          }`}>
            Estadísticas
          </a>
        </div>

        <div className="flex gap-4">
          <a href="https://github.com/Ricardo010203" target="_blank" rel="noopener noreferrer"
             className={`hover:text-blue-600 transition-colors ${
               isScrolled ? 'text-gray-700' : 'text-white'
             }`}>
            <FaGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/JhojanVelasco" target="_blank" rel="noopener noreferrer"
             className={`hover:text-blue-600 transition-colors ${
               isScrolled ? 'text-gray-700' : 'text-white'
             }`}>
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar