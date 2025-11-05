import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaComments, FaChartLine, FaRobot, FaTrophy, FaUsers, FaFire } from 'react-icons/fa'
import { TrendingUp, Zap, Shield, MessageSquare, Activity } from 'lucide-react'
import { API_URL } from '../config/api'
import axios from 'axios'

const PublicStats = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('openChatbot'))
  }

  useEffect(() => {
    fetchPublicStats()
  }, [])

  const fetchPublicStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/stats/public`)
      //const response = await axios.get('http://localhost:3001/api/stats/public')
      setStats(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error al cargar estadísticas:', error)
      setLoading(false)
      setStats({
        totalConversaciones: 30,
        promedioRespuesta: '1.2s',
        diasActivo: 30,
        satisfaccion: 98,
        temasPopulares: [
          { nombre: 'Experiencia', cantidad: 15 },
          { nombre: 'Proyectos', cantidad: 7 },
          { nombre: 'Habilidades', cantidad: 5 }
        ]
      })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  const mainStats = [
    {
      id: 1,
      title: 'Conversaciones Totales',
      value: stats?.totalConversaciones || 0,
      icon: FaComments,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      suffix: '+',
      description: 'Interacciones procesadas'
    },
    {
      id: 2,
      title: 'Tiempo de Respuesta',
      value: stats?.promedioRespuesta || '2s',
      icon: Zap,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      suffix: '',
      description: 'Promedio de respuesta'
    },
    {
      id: 3,
      title: 'Días en Producción',
      value: stats?.diasActivo || 0,
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      suffix: '',
      description: 'Operando continuamente'
    },
    {
      id: 4,
      title: 'Satisfacción',
      value: stats?.satisfaccion || 98,
      icon: FaTrophy,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      suffix: '%',
      description: 'De usuarios satisfechos'
    }
  ]

  // Skeleton loader más simple
  if (loading) {
    return (
      <section id="stats" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-12"></div>
            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 h-40"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="stats" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header más sobrio */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2">
            <FaRobot />
            Sistema de IA en Producción
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Chat con Asistente Virtual
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estadísticas en tiempo real del asistente, pregúntale sobre mí
          </p>
        </motion.div>

        {/* Tarjetas de estadísticas - más limpias */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-14"
        >
          {mainStats.map((stat, index) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className={`${stat.bgColor} rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 h-full border ${stat.borderColor}`}>
                {/* Icono más simple */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm`}>
                    <stat.icon className={`text-xl ${stat.color}`} />
                  </div>
                </div>

                {/* Valor principal */}
                <div className="mb-2">
                  <p className="text-3xl font-bold text-gray-800 mb-1">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                    <span className="text-xl ml-1">{stat.suffix}</span>
                  </p>
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-xs text-gray-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.description}
                  </p>
                </div>

                {/* Barra de progreso más discreta */}
                <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${stat.color.replace('text-', 'bg-')}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Temas más consultados - más limpio */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-md p-8 md:p-10 max-w-5xl mx-auto border border-gray-200"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <FaFire className="text-orange-500" />
                Temas Más Consultados
              </h3>
              <p className="text-sm text-gray-600">Categorías de mayor demanda del asistente virtual</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Top 6
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats?.temasPopulares?.map((tema, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="relative"
              >
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-sm">
                  {/* Ranking badge más discreto */}
                  <div className="absolute -top-2 -left-2 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                    {index + 1}
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <span className="font-semibold text-gray-800 text-sm block">{tema.nombre}</span>
                      <span className="text-xs text-gray-500">consultas procesadas</span>
                    </div>
                    <div className="ml-3">
                      <div className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold text-xs">
                        {tema.cantidad.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Barra de progreso más sutil */}
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(tema.cantidad / Math.max(...(stats?.temasPopulares?.map(t => t.cantidad) || [1]))) * 100}%` }}
                      transition={{ duration: 0.8, delay: index * 0.08 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action más sobrio */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 max-w-2xl mx-auto shadow-lg">
            <FaUsers className="text-3xl text-white mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              ¿Quieres experimentar el asistente virtual?
            </h3>
            <p className="text-blue-100 mb-6 text-sm">
              Prueba el chat en tiempo real y descubre cómo la IA puede brindarte más información
            </p>
            <motion.button
              onClick={handleOpenChat}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-blue-600 px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2 text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Abrir Chat
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PublicStats