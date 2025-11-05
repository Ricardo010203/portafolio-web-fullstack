import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Contenido principal del footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Columna 1: Info personal */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-blue-400">Jhojan Ricardo Velasco</h3>
            <p className="text-gray-400 leading-relaxed">
              Desarrollador Fullstack especializado en crear soluciones empresariales innovadoras 
              con Node.js, React y tecnologías modernas.
            </p>
            <div className="flex gap-4 mt-6">
              <a 
                href="https://github.com/Ricardo010203" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/JhojanVelasco" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a 
                href="https://wa.me/573125229309" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
          
          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-blue-400">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#sobre-mi" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-blue-400">→</span> Sobre Mí
                </a>
              </li>
              <li>
                <a href="#proyectos" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-blue-400">→</span> Proyectos
                </a>
              </li>
              <li>
                <a href="#skills" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-blue-400">→</span> Skills
                </a>
              </li>
              <li>
                <a href="#stats" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-blue-400">→</span> Estadísticas
                </a>
              </li>
            </ul>
          </div>
          
          {/* Columna 3: Contacto */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-blue-400">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <FaEnvelope className="text-blue-400" />
                <a href="mailto:jvelascolondono99@gmail.com" className="hover:text-white transition-colors">
                  jvelascolondono99@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaPhone className="text-blue-400" />
                <a href="tel:+573125229309" className="hover:text-white transition-colors">
                  +57 312 522 9309
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>Cali, Valle del Cauca, Colombia</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Línea divisoria */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left">
              © {currentYear} Jhojan Ricardo Velasco. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 text-sm text-center md:text-right">
              Hecho usando React, Node.js, Tailwind CSS y Chatbase
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer