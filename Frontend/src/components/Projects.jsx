import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaNodeJs, FaReact, FaDatabase, FaAngular } from 'react-icons/fa'
import { SiExpress, SiSocketdotio, SiPhp, SiMysql } from 'react-icons/si'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { X, ChevronLeft, ChevronRight, ExternalLink, Github, Folder, Calendar } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const swiperStyles = `
  .swiper-button-next,
  .swiper-button-prev {
    background-color: rgba(255, 255, 255, 0.9);
    width: 40px !important;
    height: 40px !important;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  
  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    background-color: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }
  
  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 20px !important;
  }
  
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: #3b82f6;
    opacity: 0.5;
    transition: all 0.3s ease;
  }
  
  .swiper-pagination-bullet-active {
    opacity: 1;
    transform: scale(1.2);
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
  }
`

const Projects = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentProjectImages, setCurrentProjectImages] = useState([])
  const [hoveredProject, setHoveredProject] = useState(null)

  const projects = [
    {
      title: "Sistema de Chat Asistente Virtual con IA",
      description: "Plataforma empresarial de chat con asistente virtual para atención al cliente, integrada con RAG (Chatbase + AWS Bedrock). Permite gestionar conversaciones en tiempo real, subir y analizar logs de errores para que la IA los interprete, clasifique y proponga soluciones, y desviar casos de baja complejidad fuera del equipo de soporte para reducir el tráfico y los tiempos de respuesta.",
      images: [
        "/screenshots/Chat.jpeg",
        "/screenshots/Chat-2.jpeg",
        "/screenshots/Chat-3.jpeg"
      ],
      tech: [
        { name: "Php", icon: SiPhp },
        { name: "React", icon: FaReact },
        { name: "MySQL", icon: SiMysql },
        { name: "WebSockets", icon: SiSocketdotio }
      ],
      features: [
        "Chat multiusuario en tiempo real",
        "Asistente virtual con IA",
        "Bandeja unificada, asignación por colas/SLAs, macros de respuesta y notas internas.",
        "Respuestas basadas en documentos y KBs curados; trazabilidad de fuentes citadas.",
        "Creación/actualización de tickets con contexto (logs, pasos probados, enlaces RAG).",
        "Flujos automáticos para FAQs, procedimientos estándar y troubleshooting guiado."
      ],
      category: "Inteligencia Artificial",
      status: "En Producción"
    },
    {
      title: "Panel de Monitoreo y Analytics",
      description: "Sistema centralizado que permite observar, orientar y corregir las conversaciones de un asistente de IA en una página de soporte. Facilita la tipificación, marcado y redirección de chats cuando sea necesario, además de integrar un repositorio de conocimiento (RAG) y tableros de KPI. Todo orientado a garantizar que cada cliente reciba una experiencia consistente, segura y de alta calidad.",
      images: [
        "/screenshots/Panel-monitoreo.png",
        "/screenshots/Panel-monitoreo-2.jpeg"
      ],
      tech: [
        { name: "Php", icon: SiPhp },
        { name: "React", icon: FaReact },
        { name: "MySQL", icon: SiMysql },
        { name: "WebSockets", icon: SiSocketdotio }
      ],
      features: [
        "Descarga de tráfico por rangos de fecha",
        "Visualización de datos en tiempo real",
        "Sistema de filtros avanzados por sistema",
        "Exportación de reportes",
        "Dashboard interactivo con métricas",
        "Análisis de rendimiento"
      ],
      category: "Analytics & Dashboard",
      status: "En Producción"
    },
    {
      title: "Formulario de perfilamiento MAF",
      description: "Herramienta para capturar, clasificar y almacenar datos de usuarios MAF(Movimiento Antilavado de Financiamiento) durante la atención comercial. Permite identificar el tipo de perfil, conservar la información de forma segura para contactos futuros y habilitar seguimientos desde un repositorio de perfiles potenciales.",
      images: [
        "/screenshots/Encuesta-perfil.jpeg",
        "/screenshots/Encuesta-perfil-2.jpeg",
        "/screenshots/Encuesta-perfil-3.jpeg"
      ],
      tech: [
        { name: "Node.js", icon: FaNodeJs },
        { name: "Express", icon: SiExpress },
        { name: "Angular", icon: FaAngular},
        { name: "SQL Server", icon: FaDatabase }
      ],
      features: [
        "Registro en repositorio de perfiles potenciales con versión y trazabilidad.",
        "Descarga CSV/Excel y panel básico de conversión por segmento.",
        "Datos personales, contacto, producto de interés, situación financiera, preferencias y consentimiento."
      ],
      category: "Formularios & CRM",
      status: "En Producción"
    }
  ]

  const openImagePopup = (images, index) => {
    setCurrentProjectImages(images)
    setCurrentImageIndex(index)
    setSelectedImage(images[index])
    document.body.style.overflow = 'hidden'
  }

  const closeImagePopup = () => {
    setSelectedImage(null)
    setCurrentProjectImages([])
    setCurrentImageIndex(0)
    document.body.style.overflow = 'unset'
  }

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % currentProjectImages.length
      : (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length
    
    setCurrentImageIndex(newIndex)
    setSelectedImage(currentProjectImages[newIndex])
  }

  return (
    <>
      <style>{swiperStyles}</style>
      <section id="proyectos" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Header mejorado */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2"
              >
                <Folder className="w-4 h-4" />
                Portafolio
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Proyectos Destacados
              </h2>
            </div>

            <div className="space-y-20">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setHoveredProject(index)}
                  onHoverEnd={() => setHoveredProject(null)}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100">
                    <div className="md:flex">
                      {/* Carrusel de Imágenes */}
                      <div className="md:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8 relative">
                        {/* Badge de categoría */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-semibold shadow-md border border-gray-200">
                            {project.category}
                          </span>
                        </div>

                        {/* Badge de estado */}
                        <div className="absolute top-4 right-4 z-10">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            {project.status}
                          </span>
                        </div>

                        <div className="w-full max-w-2xl">
                          <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={10}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{
                              delay: 5000,
                              disableOnInteraction: false,
                            }}
                            className="rounded-xl shadow-lg"
                            style={{
                              '--swiper-navigation-color': '#3b82f6',
                              '--swiper-pagination-color': '#3b82f6',
                              '--swiper-pagination-bottom': '12px',
                            }}
                          >
                            {project.images.map((image, imgIndex) => (
                              <SwiperSlide key={imgIndex} className="flex items-center justify-center">
                                <div 
                                  className="cursor-pointer group/img relative w-full flex items-center justify-center bg-white rounded-lg"
                                  onClick={() => openImagePopup(project.images, imgIndex)}
                                >
                                  <img 
                                    src={image} 
                                    alt={`${project.title} - Screenshot ${imgIndex + 1}`}
                                    className="w-full h-auto max-h-[400px] object-contain rounded-lg transition-all duration-300 group-hover/img:scale-[1.02]"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      e.target.parentElement.parentElement.innerHTML = `
                                        <div class="text-gray-400 text-center p-8 bg-gray-100 rounded-lg h-64 flex items-center justify-center w-full">
                                          <div>
                                            <p class="text-sm font-medium">Imagen no disponible</p>
                                            <p class="text-xs mt-2 text-gray-400">${image}</p>
                                          </div>
                                        </div>
                                      `;
                                    }}
                                  />
                                  {/* Overlay de zoom mejorado */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-all duration-300 rounded-lg flex items-center justify-center">
                                    <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transform translate-y-4 group-hover/img:translate-y-0 transition-transform duration-300">
                                      <ExternalLink className="w-4 h-4" />
                                      Ver en grande
                                    </div>
                                  </div>
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                      </div>

                      {/* Contenido */}
                      <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
                        <div>
                          {/* Header del proyecto */}
                          <div className="mb-6">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                {project.title}
                              </h3>
                            </div>

                            <p className="text-gray-600 leading-relaxed">
                              {project.description}
                            </p>
                          </div>

                          {/* Stack Técnico mejorado */}
                          <div className="mb-6">
                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                              <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
                              Stack Técnico
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {project.tech.map((tech, i) => (
                                <motion.span
                                  key={i}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium border border-blue-100 hover:border-blue-200 transition-all"
                                >
                                  <tech.icon className="text-base" />
                                  {tech.name}
                                </motion.span>
                              ))}
                            </div>
                          </div>

                          {/* Características mejoradas */}
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                              <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
                              Características Principales
                            </h4>
                            <ul className="space-y-2.5">
                              {project.features.map((feature, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: i * 0.05 }}
                                  viewport={{ once: true }}
                                  className="flex items-start gap-3 text-gray-600 text-sm group/item"
                                >
                                  <span className="text-blue-600 mt-0.5 group-hover/item:scale-110 transition-transform">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </span>
                                  <span className="flex-1">{feature}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Footer con contador de imágenes */}
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                            </span>
                            <motion.button
                              whileHover={{ x: 5 }}
                              className="text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
                              onClick={() => openImagePopup(project.images, 0)}
                            >
                              Ver galería
                              <ChevronRight className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Indicador de proyecto activo - sutil */}
                  {hoveredProject === index && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-4 mx-auto"
                      style={{ width: '60%' }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Popup de Imagen Ampliada - mejorado */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
              onClick={closeImagePopup}
            >
              {/* Botón de cerrar mejorado */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeImagePopup}
                className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10 backdrop-blur-sm"
              >
                <X size={24} />
              </motion.button>

              {/* Botones de navegación mejorados */}
              {currentProjectImages.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      navigateImage('prev')
                    }}
                    className="absolute left-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-10 backdrop-blur-sm"
                  >
                    <ChevronLeft size={28} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      navigateImage('next')
                    }}
                    className="absolute right-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-10 backdrop-blur-sm"
                  >
                    <ChevronRight size={28} />
                  </motion.button>
                </>
              )}

              {/* Indicador de imagen actual mejorado */}
              {currentProjectImages.length > 1 && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-medium border border-white/20">
                    {currentImageIndex + 1} / {currentProjectImages.length}
                  </div>
                </div>
              )}

              {/* Imagen ampliada */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt="Vista ampliada"
                  className="w-full h-full object-contain rounded-lg"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}

export default Projects