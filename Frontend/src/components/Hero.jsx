import { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'

const Hero = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleOpenChat = () => {
    // Disparar evento personalizado para abrir el chat
    window.dispatchEvent(new CustomEvent('openChatbot'))
  }

  return (
    <section 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden"
    >
      {/* Círculos decorativos con efecto parallax */}
      <div 
        className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full opacity-20 blur-3xl"
        style={{ transform: `translate(${scrollY * 0.3}px, ${scrollY * 0.3}px)` }}
      ></div>
      <div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl"
        style={{ transform: `translate(-${scrollY * 0.2}px, ${scrollY * 0.2}px)` }}
      ></div>
      <div 
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-400 rounded-full opacity-10 blur-3xl"
        style={{ transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.001})` }}
      ></div>

      {/* Contenido principal */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-4 relative z-10"
        style={{ transform: `translateY(-${scrollY * 0.5}px)` }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Jhojan Ricardo Velasco Londoño
        </h1>
        
        {/* TypeAnimation component */}
        <TypeAnimation
          sequence={[
            'Desarrollador Web Fullstack',
            2000,
            'Especialista en Node.js',
            2000,
            'Desarrollador Backend PHP',
            2000,
          ]}
          wrapper="h2"
          speed={50}
          repeat={Infinity}
          className="text-2xl md:text-3xl mb-6 text-blue-200"
        />
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl mb-8 max-w-2xl mx-auto text-blue-100"
        >
          Especializado en PHP, Node.js, React y bases de datos SQL. 
          Creando soluciones empresariales escalables y eficientes.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex gap-6 justify-center mb-8"
        >
          <motion.a 
            href="https://github.com/Ricardo010203" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="hover:text-blue-200 transition-colors"
          >
            <FaGithub size={32} />
          </motion.a>
          <motion.a 
            href="https://www.linkedin.com/in/JhojanVelasco" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            className="hover:text-blue-200 transition-colors"
          >
            <FaLinkedin size={32} />
          </motion.a>
          <motion.a 
            href="mailto:jvelascolondono99@gmail.com"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="hover:text-blue-200 transition-colors"
          >
            <FaEnvelope size={32} />
          </motion.a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col gap-4 items-center"
        >
          <motion.a 
            href="#proyectos" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors w-full max-w-md shadow-lg"
          >
            Ver Proyectos
          </motion.a>
          <motion.button
            onClick={handleOpenChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors w-full max-w-md shadow-lg"
          >
            Pregúntale a la IA sobre mí
          </motion.button>
          <motion.a 
            href="#stats" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors w-full max-w-md shadow-lg"
          >
            Ver estadísticas de conversaciones con la IA
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 mt-16"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero