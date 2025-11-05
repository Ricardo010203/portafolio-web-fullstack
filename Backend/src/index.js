const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
//app.use(cors());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://portafolio-web-frontend-seven.vercel.app',
    'https://portafolio-backend-53f1.onrender.com'
  ],
  credentials: true
}));
app.use(express.json());

// ========================================
// FUNCIONES DE LOGGING
// ========================================

// Registrar conversación en formato JSON
const registrarConversacionJSON = (userMessage, botResponse, conversationId, req) => {
  const fecha = new Date();
  const nombreArchivo = `conversaciones_${fecha.toISOString().split('T')[0]}.json`;
  
  const logDir = path.join(__dirname, 'logs');
  const jsonFile = path.join(logDir, nombreArchivo);

  // Crear carpeta logs si no existe
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const entry = {
    id: Date.now().toString(),
    timestamp: fecha.toISOString(),
    fechaLocal: fecha.toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
    conversationId: conversationId || null,
    userMessage,
    botResponse,
    ip: req.ip || 'unknown',
    userAgent: req.get('User-Agent') || 'unknown'
  };

  let conversaciones = [];
  
  if (fs.existsSync(jsonFile)) {
    conversaciones = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
  }

  conversaciones.push(entry);
  fs.writeFileSync(jsonFile, JSON.stringify(conversaciones, null, 2));
  
  console.log(`✅ Conversación registrada en logs/${nombreArchivo}`);
};

// Registrar conversación en formato TXT (legible)
const registrarConversacionTXT = (userMessage, botResponse, conversationId) => {
  const fecha = new Date();
  const fechaStr = fecha.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
  const nombreArchivo = `conversaciones_${fecha.toISOString().split('T')[0]}.txt`;
  
  const logDir = path.join(__dirname, 'logs');
  const txtFile = path.join(logDir, nombreArchivo);

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const logEntry = `
═══════════════════════════════════════════════════════
📅 Fecha: ${fechaStr}
🆔 Conversation ID: ${conversationId || 'N/A'}
👤 Usuario: ${userMessage}
🤖 Asistente: ${botResponse}
═══════════════════════════════════════════════════════

`;

  fs.appendFile(txtFile, logEntry, (err) => {
    if (err) {
      console.error('Error al guardar el log TXT:', err);
    }
  });
};

// ========================================
// MIDDLEWARE DE AUTENTICACIÓN
// ========================================

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

// ========================================
// RUTAS DE AUTENTICACIÓN
// ========================================

// Login para obtener token
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
    }

    // Validar credenciales
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      // Generar token JWT
      const token = jwt.sign(
        { username, role: 'admin' },
        process.env.ADMIN_TOKEN,
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        token,
        expiresIn: '24h'
      });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// ========================================
// RUTAS DEL CHAT
// ========================================

app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'El mensaje es requerido' });
    }

    console.log('Enviando a Chatbase:', {
      message,
      conversationId,
      chatbotId: process.env.CHATBASE_CHATBOT_ID
    });

    // Llamada a Chatbase API
    const response = await axios.post(
      'https://www.chatbase.co/api/v1/chat',
      {
        messages: [
          {
            content: message,
            role: 'user'
          }
        ],
        chatbotId: process.env.CHATBASE_CHATBOT_ID,
        stream: false,
        conversationId: conversationId || undefined
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.CHATBASE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Respuesta de Chatbase recibida');

    // Registrar conversación en ambos formatos
    registrarConversacionJSON(
      message,
      response.data.text,
      response.data.conversationId,
      req
    );
    
    registrarConversacionTXT(
      message,
      response.data.text,
      response.data.conversationId
    );

    res.json({
      message: response.data.text,
      conversationId: response.data.conversationId
    });

  } catch (error) {
    console.error('Error completo:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    res.status(500).json({ 
      error: 'Error al procesar el mensaje',
      details: error.response?.data || error.message 
    });
  }
});

// ========================================
// RUTAS DE LOGS (PROTEGIDAS)
// ========================================

// Listar todos los archivos de logs disponibles
app.get('/api/logs/files', authMiddleware, (req, res) => {
  const logDir = path.join(__dirname, 'logs');
  
  if (!fs.existsSync(logDir)) {
    return res.json({ files: [] });
  }

  const files = fs.readdirSync(logDir)
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const stats = fs.statSync(path.join(logDir, file));
      return {
        nombre: file,
        fecha: file.replace('conversaciones_', '').replace('.json', ''),
        tamaño: `${(stats.size / 1024).toFixed(2)} KB`,
        ultimaModificacion: stats.mtime
      };
    })
    .sort((a, b) => b.ultimaModificacion - a.ultimaModificacion);

  res.json({ files });
});

// Ver logs de un día específico
app.get('/api/logs/date/:fecha', authMiddleware, (req, res) => {
  const { fecha } = req.params; // formato: 2025-10-30
  const jsonFile = path.join(__dirname, 'logs', `conversaciones_${fecha}.json`);
  
  if (!fs.existsSync(jsonFile)) {
    return res.status(404).json({ error: 'No hay logs para esta fecha' });
  }

  const conversaciones = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
  res.json({
    fecha,
    total: conversaciones.length,
    conversaciones
  });
});

// Ver todos los logs (últimos 100)
app.get('/api/logs/all', authMiddleware, (req, res) => {
  const logDir = path.join(__dirname, 'logs');
  
  if (!fs.existsSync(logDir)) {
    return res.json({ conversaciones: [] });
  }

  const files = fs.readdirSync(logDir)
    .filter(file => file.endsWith('.json'))
    .sort()
    .reverse();

  let todasConversaciones = [];

  files.forEach(file => {
    const content = JSON.parse(fs.readFileSync(path.join(logDir, file), 'utf-8'));
    todasConversaciones = todasConversaciones.concat(content);
  });

  // Limitar a 100 más recientes
  todasConversaciones = todasConversaciones
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 100);

  res.json({
    total: todasConversaciones.length,
    conversaciones: todasConversaciones
  });
});

// Buscar en logs
app.get('/api/logs/search', authMiddleware, (req, res) => {
  const { q, fecha } = req.query; // ?q=nodejs&fecha=2025-10-30
  
  if (!q) {
    return res.status(400).json({ error: 'Parámetro de búsqueda "q" requerido' });
  }

  const logDir = path.join(__dirname, 'logs');
  
  if (!fs.existsSync(logDir)) {
    return res.json({ resultados: [] });
  }

  let files = fs.readdirSync(logDir).filter(file => file.endsWith('.json'));
  
  // Filtrar por fecha si se especifica
  if (fecha) {
    files = files.filter(file => file.includes(fecha));
  }

  let resultados = [];

  files.forEach(file => {
    const conversaciones = JSON.parse(fs.readFileSync(path.join(logDir, file), 'utf-8'));
    
    const coincidencias = conversaciones.filter(conv => 
      conv.userMessage.toLowerCase().includes(q.toLowerCase()) ||
      conv.botResponse.toLowerCase().includes(q.toLowerCase())
    );

    resultados = resultados.concat(coincidencias);
  });

  res.json({
    query: q,
    fecha: fecha || 'todas',
    total: resultados.length,
    resultados
  });
});

// Descargar logs en formato JSON
app.get('/api/logs/download/:fecha', authMiddleware, (req, res) => {
  const { fecha } = req.params;
  const jsonFile = path.join(__dirname, 'logs', `conversaciones_${fecha}.json`);
  
  if (!fs.existsSync(jsonFile)) {
    return res.status(404).send('No hay logs para esta fecha');
  }

  res.download(jsonFile, `conversaciones_${fecha}.json`);
});

// Estadísticas generales
app.get('/api/logs/stats', authMiddleware, (req, res) => {
  const logDir = path.join(__dirname, 'logs');
  
  if (!fs.existsSync(logDir)) {
    return res.json({ totalConversaciones: 0 });
  }

  const files = fs.readdirSync(logDir).filter(file => file.endsWith('.json'));
  let totalConversaciones = 0;
  let conversacionesPorDia = {};

  files.forEach(file => {
    const content = JSON.parse(fs.readFileSync(path.join(logDir, file), 'utf-8'));
    const fecha = file.replace('conversaciones_', '').replace('.json', '');
    
    conversacionesPorDia[fecha] = content.length;
    totalConversaciones += content.length;
  });

  res.json({
    totalConversaciones,
    diasRegistrados: files.length,
    conversacionesPorDia,
    promedioConversacionesPorDia: (totalConversaciones / files.length).toFixed(2)
  });
});

// ========================================
// RUTA PRINCIPAL
// ========================================

app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 API del portafolio de Jhojan Ricardo Velasco',
    version: '1.0.0',
    endpoints: {
      public: {
        chat: 'POST /api/chat'
      },
      auth: {
        login: 'POST /api/auth/login'
      },
      protected: {
        logs_files: 'GET /api/logs/files [requiere token]',
        logs_date: 'GET /api/logs/date/:fecha [requiere token]',
        logs_all: 'GET /api/logs/all [requiere token]',
        logs_search: 'GET /api/logs/search?q=palabra [requiere token]',
        logs_download: 'GET /api/logs/download/:fecha [requiere token]',
        logs_stats: 'GET /api/logs/stats [requiere token]'
      }
    }
  });
});

// Endpoint público - NO requiere autenticación
app.get('/api/stats/public', (req, res) => {
  const logDir = path.join(__dirname, 'logs');
  
  if (!fs.existsSync(logDir)) {
    return res.json({ 
      totalConversaciones: 0,
      diasActivo: 0,
      promedioRespuesta: '2s',
      temasPopulares: []
    });
  }

  const files = fs.readdirSync(logDir).filter(file => file.endsWith('.json'));
  let totalConversaciones = 0;
  let temasCounts = {};

  files.forEach(file => {
    const content = JSON.parse(fs.readFileSync(path.join(logDir, file), 'utf-8'));
    totalConversaciones += content.length;
    
    // Analizar temas comunes (palabras clave)
    content.forEach(conv => {
      const palabras = conv.userMessage.toLowerCase().split(' ');
      const temasRelevantes = ['experiencia', 'proyectos', 'tecnologías', 'nodejs', 'react', 'sql', 'habilidades'];
      
      temasRelevantes.forEach(tema => {
        if (palabras.includes(tema) || conv.userMessage.toLowerCase().includes(tema)) {
          temasCounts[tema] = (temasCounts[tema] || 0) + 1;
        }
      });
    });
  });

  const temasPopulares = Object.entries(temasCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([nombre, cantidad]) => ({ 
      nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1), 
      cantidad 
    }));

  res.json({
    totalConversaciones,
    diasActivo: files.length,
    promedioRespuesta: '2s',
    temasPopulares
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📝 Sistema de logs por fecha activado`);
  console.log(`🔐 Autenticación JWT habilitada`);
});