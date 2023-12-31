// Origins permitidos para hacer peticiones a la API
const allowedOrigins = [
  'http://localhost:5173'
]

// Opciones de configuración de CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
  optionsSuccessStatus: 204
}

export default corsOptions
