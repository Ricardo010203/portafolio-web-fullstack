import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin, Code, Award, TrendingUp } from 'lucide-react'

const About = () => {
  const experiencia = [
    {
      año: '2024 - Actual',
      titulo: 'Desarrollador Fullstack',
      empresa: 'Siesa',
      ubicacion: 'Cali, Colombia',
      tipo: 'Tiempo Completo',
      descripcion: 'Lideré la integración de IA conversacional con Chatbase y AWS Bedrock para automatizar consultas de soporte. Participé en migración de CRM y desarrollo de microservicios usando APIs externas.',
      tecnologias: ['PHP', 'React', 'MySQL', 'AWS Bedrock', 'Chatbase'],
      logros: [
        'Reducción del 47% en tráfico en los canales de soporte',
        'Implementación exitosa de RAG con AWS Bedrock',
        'Reducción del 40% en tiempo de respuesta de soporte'
      ]
    },
    {
      año: '2023',
      titulo: 'Desarrollador Frontend',
      empresa: 'Freelance',
      ubicacion: 'Remoto',
      tipo: 'Proyecto',
      descripcion: 'Desarrollé un formulario para el perfilamiento de un usuario MAF (Movimiento Antilavado de Financiamiento). Captura, clasificación y almacenamiento de datos de usuarios para la atención comercial.',
      tecnologias: ['Angular', 'Node.js', 'Express', 'SQL Server'],
      logros: [
        'Sistema de perfilamiento con trazabilidad completa',
        'Exportación automatizada de reportes',
        'Integración con CRM existente'
      ]
    },
    {
      año: '2022',
      titulo: 'Desarrollador Fullstack',
      empresa: 'Freelance',
      ubicacion: 'Remoto',
      tipo: 'Proyecto',
      descripcion: 'Desarrollé una solución de mensajería masiva en WhatsApp para ofertar productos bancarios a clientes segmentados. Se incorporó un chatbot que automatiza la respuesta, optimizando la conversión y los tiempos de atención.',
      tecnologias: ['Angular', 'Node.js', 'Express', 'SQL Server'],
      logros: [
        'Chatbot con respuestas automáticas',
        'Segmentación de clientes efectiva',
        'Mejora en tasas de conversión'
      ]
    }
  ]

  const stats = [
    { icon: Briefcase, value: '4+', label: 'Años de Experiencia' },
    { icon: Code, value: '20+', label: 'Proyectos Completados' },
    { icon: Award, value: '8+', label: 'Tecnologías' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="sobre-mi" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="text-center mb-14">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              Trayectoria Profesional
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Sobre Mí
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          </div>

          {/* Descripción introductoria */}
          <div className="max-w-4xl mx-auto text-gray-700 mb-16">
          </div>
          
          {/* Descripción introductoria mejorada */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="max-w-4xl mx-auto text-gray-700 mb-16">
              <p className="text-lg leading-relaxed mb-4">
                Soy <span className="font-semibold text-blue-600">desarrollador Full-Stack</span> orientado a negocio. 
                Diseño y construyo aplicaciones web escalables con{" "}
                <span className="font-semibold text-blue-600">Node.js</span>,{" "}
                <span className="font-semibold text-blue-600">PHP</span>,{" "}
                <span className="font-semibold text-blue-600">React</span>,{" "}
                <span className="font-semibold text-blue-600">Java</span> y{" "}
                <span className="font-semibold text-blue-600">bases de datos SQL</span>.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                He liderado la integración de una IA conversacional (
                <span className="font-semibold text-blue-600">Chatbase</span> y{" "}
                <span className="font-semibold text-blue-600">AWS Bedrock</span>) para derivar consultas de soporte, 
                he participado en migraciones de CRM y en la creación de microservicios que consumen APIs externas. 
                Trabajo con <span className="font-semibold text-blue-600">Scrum</span> y aplico buenas prácticas de análisis, 
                diseño e implementación para entregar software mantenible y de alto impacto. Estoy acostumbrado a trabajar en 
                entornos heterogéneos y a adoptar rápidamente el lenguaje o framework que mejor resuelva el caso de uso.
              </p>
            </div>
          </motion.div>

          {/* Stats rápidos */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center"
              >
                <stat.icon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Timeline de Experiencia */}
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Experiencia Profesional
          </h3>
          
          <div className="relative">
            {/* Línea vertical del timeline - más discreta */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-300 hidden sm:block"></div>
            
            {experiencia.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`mb-12 flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-start md:items-center gap-8 relative`}
              >
                {/* Espaciador para desktop */}
                <div className="hidden md:block md:w-1/2"></div>
                
                {/* Punto central del timeline - más discreto */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-sm z-10 hidden sm:block"></div>
                
                {/* Contenido de la experiencia */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-16 sm:pl-0`}>
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-200"
                  >
                    {/* Header de la card */}
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                        <Calendar className="w-3 h-3" />
                        {exp.año}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-medium">
                        {exp.tipo}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-1">{exp.titulo}</h3>
                    
                    <div className="flex items-center gap-2 text-blue-600 font-semibold mb-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{exp.empresa}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                      <MapPin className="w-3 h-3" />
                      <span>{exp.ubicacion}</span>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      {exp.descripcion}
                    </p>

                    {/* Logros destacados */}
                    {exp.logros && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          Logros Destacados
                        </h4>
                        <ul className="space-y-1">
                          {exp.logros.map((logro, i) => (
                            <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                              <span className="text-green-600 mt-0.5">✓</span>
                              <span>{logro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Tecnologías */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tecnologias.map((tech, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-medium border border-blue-100"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
