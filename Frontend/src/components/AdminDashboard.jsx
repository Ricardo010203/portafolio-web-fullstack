import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FaSignOutAlt, FaSearch, FaCalendar, FaChartBar, 
  FaDownload, FaComments, FaClock 
} from 'react-icons/fa'
import { API_URL } from '../config/api'
import axios from 'axios'

const AdminDashboard = ({ token, onLogout }) => {
  const [activeTab, setActiveTab] = useState('all') // all, search, stats
  const [logs, setLogs] = useState([])
  const [stats, setStats] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  }

  // Cargar todos los logs al inicio
  useEffect(() => {
    if (activeTab === 'all') {
      fetchAllLogs()
    } else if (activeTab === 'stats') {
      fetchStats()
    }
  }, [activeTab])

  const fetchAllLogs = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${API_URL}/api/logs/all`, axiosConfig)
      setLogs(response.data.conversaciones)
    } catch (error) {
      console.error('Error al cargar logs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStats = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${API_URL}/api/logs/stats`, axiosConfig)
      setStats(response.data)
    } catch (error) {
      console.error('Error al cargar estadísticas:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    try {
      const url = selectedDate 
        ? `${API_URL}/api/logs/search?q=${searchQuery}&fecha=${selectedDate}`
        : `${API_URL}/api/logs/search?q=${searchQuery}`
      
      const response = await axios.get(url, axiosConfig)
      setSearchResults(response.data.resultados)
    } catch (error) {
      console.error('Error en búsqueda:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async (fecha) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/logs/download/${fecha}`,
        { 
          ...axiosConfig,
          responseType: 'blob'
        }
      )
      
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `conversaciones_${fecha}.json`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Error al descargar:', error)
    }
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Panel de Administración</h1>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-6 font-semibold border-b-2 transition-colors ${
                activeTab === 'all' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <FaComments className="inline mr-2" />
              Todas las Conversaciones
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`py-4 px-6 font-semibold border-b-2 transition-colors ${
                activeTab === 'search' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <FaSearch className="inline mr-2" />
              Buscar
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-4 px-6 font-semibold border-b-2 transition-colors ${
                activeTab === 'stats' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <FaChartBar className="inline mr-2" />
              Estadísticas
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tab: Todas las conversaciones */}
        {activeTab === 'all' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Últimas 100 Conversaciones
                </h2>
                <button
                  onClick={fetchAllLogs}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Actualizar
                </button>
              </div>

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">Cargando logs...</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {logs.map((log, index) => (
                    <div key={log.id || index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-gray-500 flex items-center gap-2">
                          <FaClock /> {formatDate(log.timestamp)}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {log.conversationId?.substring(0, 8) || 'N/A'}
                        </span>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm font-semibold text-gray-700 mb-1">👤 Usuario:</p>
                        <p className="text-gray-800 bg-gray-100 p-2 rounded">{log.userMessage}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">🤖 Asistente:</p>
                        <p className="text-gray-800 bg-blue-50 p-2 rounded">{log.botResponse}</p>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        IP: {log.ip} | User Agent: {log.userAgent?.substring(0, 50)}...
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Tab: Búsqueda */}
        {activeTab === 'search' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Buscar en Logs</h2>
              
              <form onSubmit={handleSearch} className="mb-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar en conversaciones..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center gap-2"
                >
                  <FaSearch /> Buscar
                </button>
              </form>

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : searchResults.length > 0 ? (
                <div>
                  <p className="text-gray-600 mb-4">
                    Se encontraron {searchResults.length} resultado(s)
                  </p>
                  <div className="space-y-4">
                    {searchResults.map((log, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm text-gray-500">
                            {formatDate(log.timestamp)}
                          </span>
                        </div>
                        <div className="mb-2">
                          <p className="text-sm font-semibold text-gray-700">👤 Usuario:</p>
                          <p className="text-gray-800 bg-gray-100 p-2 rounded">{log.userMessage}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700">🤖 Asistente:</p>
                          <p className="text-gray-800 bg-blue-50 p-2 rounded">{log.botResponse}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : searchQuery && (
                <p className="text-gray-500 text-center py-8">
                  No se encontraron resultados
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* Tab: Estadísticas */}
        {activeTab === 'stats' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <FaComments className="text-3xl text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Conversaciones</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {stats?.totalConversaciones || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-4 rounded-full">
                    <FaCalendar className="text-3xl text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Días Registrados</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {stats?.diasRegistrados || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-4 rounded-full">
                    <FaChartBar className="text-3xl text-purple-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Promedio / Día</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {stats?.promedioConversacionesPorDia || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Conversaciones por Día</h3>
              <div className="space-y-2">
                {stats?.conversacionesPorDia && Object.entries(stats.conversacionesPorDia).map(([fecha, count]) => (
                  <div key={fecha} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <FaCalendar className="text-blue-600" />
                      <span className="font-medium">{fecha}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                        {count} conversaciones
                      </span>
                      <button
                        onClick={() => handleDownload(fecha)}
                        className="text-blue-600 hover:text-blue-700"
                        title="Descargar logs"
                      >
                        <FaDownload />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard