// Tipos para la base de conocimiento
export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  author: {
    id: string;
    name: string;
    avatar?: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  version: number;
  viewCount: number;
  rating: {
    helpful: number;
    notHelpful: number;
    average: number;
  };
  relatedArticles?: string[];
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    size: string;
  }>;
  metadata: {
    estimatedReadTime: number; // en minutos
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    lastReviewedAt?: string;
    reviewedBy?: string;
  };
}

export interface KnowledgeBaseCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  articleCount: number;
  parentId?: string;
  order: number;
}

export interface ArticleHistory {
  id: string;
  articleId: string;
  version: number;
  title: string;
  content: string;
  changedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  changedAt: string;
  changeDescription: string;
  changeType: 'created' | 'updated' | 'published' | 'archived' | 'restored';
}

// Datos de muestra para categorías
export const knowledgeBaseCategories: KnowledgeBaseCategory[] = [
  {
    id: "cat-001",
    name: "Hardware y Equipos",
    description: "Guías para problemas de hardware, configuración de equipos y mantenimiento",
    icon: "Monitor",
    color: "#006D77",
    articleCount: 15,
    order: 1
  },
  {
    id: "cat-002", 
    name: "Software y Aplicaciones",
    description: "Tutoriales sobre software, aplicaciones y sistemas operativos",
    icon: "Laptop",
    color: "#83C5BE",
    articleCount: 23,
    order: 2
  },
  {
    id: "cat-003",
    name: "Redes y Conectividad",
    description: "Problemas de red, WiFi, VPN y conectividad",
    icon: "Wifi",
    color: "#4A8F9F",
    articleCount: 12,
    order: 3
  },
  {
    id: "cat-004",
    name: "Seguridad Informática",
    description: "Mejores prácticas de seguridad, antivirus y protección",
    icon: "Shield",
    color: "#F4A261",
    articleCount: 8,
    order: 4
  },
  {
    id: "cat-005",
    name: "Correo Electrónico",
    description: "Configuración y resolución de problemas de email",
    icon: "Mail",
    color: "#FFD166",
    articleCount: 18,
    order: 5
  },
  {
    id: "cat-006",
    name: "Desarrollo y Programación",
    description: "Guías técnicas para desarrolladores y programadores",
    icon: "Code",
    color: "#AEDCC0",
    articleCount: 9,
    order: 6
  }
];

// Datos de muestra para artículos
export const knowledgeBaseArticles: KnowledgeBaseArticle[] = [
  {
    id: "kb-demo-001",
    title: "Guía completa para crear APIs REST con Node.js y Express",
    content: `# Guía completa para crear APIs REST con Node.js y Express

## Introducción

En esta guía aprenderás a crear una **API REST** completa utilizando Node.js y Express. Cubriremos desde la configuración inicial hasta la implementación de endpoints y manejo de errores.

![Desarrollo web con Node.js](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDYwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMjEzNTQ3Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMTUwIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPk5vZGUuanMgKyBFeHByZXNzIEFQSTwvdGV4dD4KPHN2ZyB4PSIyNTAiIHk9IjEwMCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IiM2OGQ0NTEiPgo8cGF0aCBkPSJNMTEuOTk4IDI0Yy0uMzIxIDAtLjY0MS0uMDgzLS45MjItLjI0N2wtMi45MzYtMS43MzdjLS40MzgtLjI0NS0uMjI0LS4zMy0uMDgtLjM4LjU4NS0uMjAzIDEuMDA3LS41OTEgMS4wMDctMS4wOTggMC0uNDA3LS40MjYtLjc5NS0uOTUtLjc5NWgtMy4wMDNjLS41MjQgMC0uOTUuMzg4LS45NS43OTUgMCAuNTA3LjQyMi44OTUgMS4wMDcgMS4wOTguMTQ0LjA1LjM1OC4xMzUtLjA4LjM4bC0yLjkzNiAxLjczN2MtLjI4MS4xNjQtLjYwMS4yNDctLjkyMi4yNDdzLS42NDEtLjA4My0uOTIyLS4yNDdsLTcuNjQxLTQuNTI2Yy0uNTY5LS4zMzctLjkyMi0uOTU2LS45MjItMS42MjV2LTkuMDUyYzAtLjY2OS4zNTMtMS4yODguOTIyLTEuNjI1bDcuNjQxLTQuNTI2Yy0uMjgxLS4xNjQtLjYwMS0uMjQ3LS45MjItLjI0N3ptLTQuOTA4IDguNzQ4Yy0uNDc0IDAtLjg1OS4zODUtLjg1OS44NTlzLjM4NS44NTkuODU5Ljg1OS44NTktLjM4NS44NTktLjg1OS0uMzg1LS44NTktLjg1OS0uODU5em0yLjk0MyAwYy0uNDc0IDAtLjg1OS4zODUtLjg1OS44NTlzLjM4NS44NTkuODU5Ljg1OS44NTktLjM4NS44NTktLjg1OS0uMzg1LS44NTktLjg1OS0uODU5eiIvPgo8L3N2Zz4KPC9zdmc+)

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 14 o superior)
- **npm** o **yarn** como gestor de paquetes
- Un editor de código (recomendado: VS Code)
- Conocimientos básicos de JavaScript

## Configuración inicial del proyecto

### 1. Crear el proyecto

\`\`\`bash
# Crear directorio del proyecto
mkdir api-rest-ejemplo
cd api-rest-ejemplo

# Inicializar proyecto Node.js
npm init -y

# Instalar dependencias principales
npm install express cors helmet dotenv

# Instalar dependencias de desarrollo
npm install --save-dev nodemon
\`\`\`

### 2. Estructura de carpetas

Organiza tu proyecto con la siguiente estructura:

\`\`\`text
api-rest-ejemplo/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
├── .env
├── .gitignore
├── package.json
└── server.js
\`\`\`

## Configuración del servidor Express

### Archivo principal (server.js)

\`\`\`javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use(helmet());

// Configurar CORS
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));

// Middleware para parsear JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(\`\${new Date().toISOString()} - \${req.method} \${req.path}\`);
  next();
});

// Rutas
app.use('/api/users', require('./src/routes/users'));
app.use('/api/products', require('./src/routes/products'));

// Ruta de salud
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Algo salió mal!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(\`🚀 Servidor ejecutándose en puerto \${PORT}\`);
  console.log(\`📡 Entorno: \${process.env.NODE_ENV || 'development'}\`);
});
\`\`\`

## Creación de rutas y controladores

### Archivo de rutas (src/routes/users.js)

\`\`\`javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser } = require('../middleware/validation');

// GET /api/users - Obtener todos los usuarios
router.get('/', userController.getAllUsers);

// GET /api/users/:id - Obtener usuario por ID
router.get('/:id', userController.getUserById);

// POST /api/users - Crear nuevo usuario
router.post('/', validateUser, userController.createUser);

// PUT /api/users/:id - Actualizar usuario
router.put('/:id', validateUser, userController.updateUser);

// DELETE /api/users/:id - Eliminar usuario
router.delete('/:id', userController.deleteUser);

module.exports = router;
\`\`\`

### Controlador (src/controllers/userController.js)

\`\`\`javascript
// Simulamos una base de datos en memoria
let users = [
  { id: 1, name: 'Juan Pérez', email: 'juan@ejemplo.com', age: 30 },
  { id: 2, name: 'María García', email: 'maria@ejemplo.com', age: 25 },
  { id: 3, name: 'Carlos López', email: 'carlos@ejemplo.com', age: 35 }
];

const userController = {
  // Obtener todos los usuarios
  getAllUsers: (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      
      const paginatedUsers = users.slice(startIndex, endIndex);
      
      res.status(200).json({
        success: true,
        data: paginatedUsers,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(users.length / limit),
          total: users.length
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Obtener usuario por ID
  getUserById: (req, res) => {
    try {
      const { id } = req.params;
      const user = users.find(u => u.id === parseInt(id));
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Usuario no encontrado'
        });
      }
      
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Crear nuevo usuario
  createUser: (req, res) => {
    try {
      const { name, email, age } = req.body;
      
      // Verificar si el email ya existe
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'El email ya está registrado'
        });
      }
      
      const newUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        name,
        email,
        age: parseInt(age)
      };
      
      users.push(newUser);
      
      res.status(201).json({
        success: true,
        data: newUser,
        message: 'Usuario creado exitosamente'
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Actualizar usuario
  updateUser: (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, age } = req.body;
      
      const userIndex = users.findIndex(u => u.id === parseInt(id));
      if (userIndex === -1) {
        return res.status(404).json({
          success: false,
          error: 'Usuario no encontrado'
        });
      }
      
      users[userIndex] = {
        ...users[userIndex],
        name: name || users[userIndex].name,
        email: email || users[userIndex].email,
        age: age ? parseInt(age) : users[userIndex].age
      };
      
      res.status(200).json({
        success: true,
        data: users[userIndex],
        message: 'Usuario actualizado exitosamente'
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Eliminar usuario
  deleteUser: (req, res) => {
    try {
      const { id } = req.params;
      const userIndex = users.findIndex(u => u.id === parseInt(id));
      
      if (userIndex === -1) {
        return res.status(404).json({
          success: false,
          error: 'Usuario no encontrado'
        });
      }
      
      const deletedUser = users.splice(userIndex, 1)[0];
      
      res.status(200).json({
        success: true,
        data: deletedUser,
        message: 'Usuario eliminado exitosamente'
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = userController;
\`\`\`

## Middleware de validación

### Archivo de validación (src/middleware/validation.js)

\`\`\`javascript
const validateUser = (req, res, next) => {
  const { name, email, age } = req.body;
  const errors = [];

  // Validar nombre
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('El nombre es requerido y debe tener al menos 2 caracteres');
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('El email debe tener un formato válido');
  }

  // Validar edad
  if (!age || isNaN(age) || parseInt(age) < 0 || parseInt(age) > 120) {
    errors.push('La edad debe ser un número entre 0 y 120');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Datos de entrada inválidos',
      details: errors
    });
  }

  next();
};

module.exports = {
  validateUser
};
\`\`\`

## Configuración de variables de entorno

### Archivo .env

\`\`\`env
NODE_ENV=development
PORT=3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
API_VERSION=v1
\`\`\`

## Scripts de desarrollo

### Actualizar package.json

\`\`\`json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \\"Error: no test specified\\" && exit 1"
  }
}
\`\`\`

## Probando la API

### Ejemplos con curl

\`\`\`bash
# Obtener todos los usuarios
curl -X GET http://localhost:3000/api/users

# Obtener usuario por ID
curl -X GET http://localhost:3000/api/users/1

# Crear un nuevo usuario
curl -X POST http://localhost:3000/api/users \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Ana Martínez",
    "email": "ana@ejemplo.com",
    "age": 28
  }'

# Actualizar usuario
curl -X PUT http://localhost:3000/api/users/1 \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Juan Carlos Pérez",
    "age": 31
  }'

# Eliminar usuario
curl -X DELETE http://localhost:3000/api/users/1
\`\`\`

![Ejemplo de respuesta API](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDYwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjMWExYTFhIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjU2MCIgaGVpZ2h0PSIyMTAiIGZpbGw9IiMyZDJkMmQiIHJ4PSI4Ii8+Cjx0ZXh0IHg9IjQwIiB5PSI1MCIgZmlsbD0iIzAwZmY3MyIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNCI+R0VUIC9hcGkvdXNlcnM8L3RleHQ+Cjx0ZXh0IHg9IjQwIiB5PSI4MCIgZmlsbD0iI2ZmZmZmZiIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiI+ew0KICAic3VjY2VzcyI6IHRydWUsDQogICJkYXRhIjogWw0KICAgIHsNCiAgICAgICJpZCI6IDEsDQogICAgICAibmFtZSI6ICJKdWFuIFDDqXJleiIsDQogICAgICAiZW1haWwiOiAianVhbkBlamVtcGxvLmNvbSINCiAgICB9DQogIF0NCn08L3RleHQ+Cjwvc3ZnPg==)

## Mejores prácticas

### 1. Manejo de errores consistente

\`\`\`javascript
// Crear un middleware personalizado para errores
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log del error
  console.error(err);

  // Error de Mongoose de ID inválido
  if (err.name === 'CastError') {
    const message = 'Recurso no encontrado';
    error = { message, statusCode: 404 };
  }

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Error del servidor'
  });
};
\`\`\`

### 2. Logging estructurado

\`\`\`javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'api-rest' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
\`\`\`

## Conclusión

Has aprendido a crear una API REST completa con Node.js y Express. Esta base te permitirá:

- ✅ Estructurar proyectos de API de manera profesional
- ✅ Implementar todas las operaciones CRUD
- ✅ Manejar errores de forma consistente
- ✅ Validar datos de entrada
- ✅ Aplicar buenas prácticas de seguridad

### Próximos pasos

1. **Integrar una base de datos** (MongoDB, PostgreSQL, MySQL)
2. **Implementar autenticación JWT**
3. **Agregar tests unitarios y de integración**
4. **Documentar con Swagger/OpenAPI**
5. **Implementar rate limiting y caching**

¡Felicitaciones por completar esta guía! 🎉`,
    summary: "Tutorial completo para crear APIs REST modernas con Node.js y Express, incluyendo ejemplos de código, mejores prácticas, y manejo de errores.",
    category: "cat-006",
    tags: ["nodejs", "express", "api", "rest", "javascript", "backend", "desarrollo"],
    status: "published",
    author: {
      id: "author-004",
      name: "Ana Martínez",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      email: "ana.martinez@empresa.com"
    },
    createdAt: "2024-01-25T08:00:00Z",
    updatedAt: "2024-01-25T08:00:00Z",
    publishedAt: "2024-01-25T08:00:00Z",
    version: 1,
    viewCount: 45,
    rating: {
      helpful: 12,
      notHelpful: 0,
      average: 5.0
    },
    relatedArticles: ["kb-010", "kb-006"],
    metadata: {
      estimatedReadTime: 15,
      difficulty: "intermediate",
      lastReviewedAt: "2024-01-25T08:00:00Z",
      reviewedBy: "Carlos Rodríguez"
    }
  },
  {
    id: "kb-001",
    title: "Cómo configurar el correo electrónico corporativo en dispositivos móviles",
    content: `# Configuración de correo corporativo en dispositivos móviles

## Para dispositivos iOS (iPhone/iPad)

### Configuración automática
1. Abra la aplicación **Configuración**
2. Desplácese hacia abajo y toque **Correo**
3. Toque **Cuentas** > **Agregar cuenta**
4. Seleccione **Exchange** o **Otra**
5. Ingrese su dirección de correo electrónico completa

### Configuración manual
Si la configuración automática no funciona, siga estos pasos:

**Servidor de correo entrante (IMAP):**
- Servidor: mail.empresa.com
- Puerto: 993
- Seguridad: SSL/TLS
- Nombre de usuario: su-email@empresa.com
- Contraseña: su-contraseña-de-email

**Servidor de correo saliente (SMTP):**
- Servidor: smtp.empresa.com  
- Puerto: 587
- Seguridad: STARTTLS
- Autenticación: Sí

## Para dispositivos Android

### Gmail App
1. Abra la aplicación **Gmail**
2. Toque el menú hamburguesa (≡)
3. Toque **Configuración**
4. Toque **Agregar cuenta**
5. Seleccione **Otra**
6. Ingrese su información de cuenta

### Configuración manual para Android
Use los mismos valores de servidor que para iOS.

## Solución de problemas comunes

### Error "No se puede verificar la identidad del servidor"
- Verifique que la fecha y hora del dispositivo sean correctas
- Asegúrese de usar los puertos correctos (993 para IMAP, 587 para SMTP)
- Contacte al administrador de TI si persiste el problema

### Problemas de sincronización
- Verifique la conexión a internet
- Reinicie la aplicación de correo
- Elimine y vuelva a agregar la cuenta si es necesario

## Notas importantes
- Siempre use conexiones seguras (SSL/TLS)
- No comparta sus credenciales de correo
- Contacte a soporte si experimenta problemas persistentes`,
    summary: "Guía paso a paso para configurar el correo electrónico corporativo en dispositivos iOS y Android, incluyendo configuración automática, manual y solución de problemas.",
    category: "cat-005",
    tags: ["email", "mobile", "iOS", "Android", "configuración", "IMAP", "SMTP"],
    status: "published",
    author: {
      id: "author-001",
      name: "Juan Pérez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      email: "juan.perez@empresa.com"
    },
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
    publishedAt: "2024-01-10T10:00:00Z",
    version: 3,
    viewCount: 245,
    rating: {
      helpful: 42,
      notHelpful: 3,
      average: 4.7
    },
    relatedArticles: ["kb-002", "kb-015"],
    metadata: {
      estimatedReadTime: 5,
      difficulty: "beginner",
      lastReviewedAt: "2024-01-15T14:30:00Z",
      reviewedBy: "María López"
    }
  },
  {
    id: "kb-002",
    title: "Solución de problemas de conectividad WiFi en el entorno corporativo",
    content: `# Solución de problemas de WiFi corporativo

## Diagnóstico inicial

### Verificar la conexión
1. **Comprobar el indicador de WiFi** en su dispositivo
2. **Verificar si otros dispositivos** tienen el mismo problema
3. **Probar con datos móviles** para descartar problemas de internet

### Pasos de resolución básicos

#### 1. Reiniciar la conexión WiFi
- Desactive WiFi por 10 segundos
- Reactive WiFi
- Seleccione la red corporativa
- Ingrese las credenciales si es necesario

#### 2. Olvidar y reconectar la red
**En Windows:**
1. Vaya a Configuración > Red e Internet > WiFi
2. Administrar redes conocidas
3. Seleccione la red corporativa y haga clic en "Olvidar"
4. Reconéctese ingresando las credenciales

**En MacOS:**
1. Menú Apple > Preferencias del Sistema > Red
2. Seleccione WiFi > Avanzado
3. Seleccione la red y haga clic en el botón "-"
4. Reconéctese a la red

#### 3. Verificar configuración de proxy
- Muchas redes corporativas requieren configuración de proxy
- Contacte al departamento de TI para obtener la configuración correcta

## Problemas avanzados

### Autenticación 802.1X
Si su empresa usa autenticación empresarial:
- Tipo de seguridad: WPA2-Enterprise
- Método EAP: PEAP o EAP-TTLS
- Usar credenciales de dominio

### Problemas de certificados
- Instale certificados corporativos si es requerido
- Verifique la fecha y hora del sistema
- Contacte a TI para certificados actualizados

## Cuándo contactar soporte
- Si ninguno de estos pasos resuelve el problema
- Problemas persistentes de velocidad
- Errores de autenticación repetidos
- Necesidad de acceso a recursos específicos de la red`,
    summary: "Guía completa para diagnosticar y resolver problemas de conectividad WiFi en entornos corporativos, desde pasos básicos hasta configuraciones avanzadas.",
    category: "cat-003",
    tags: ["wifi", "conectividad", "red", "troubleshooting", "802.1X", "proxy"],
    status: "published",
    author: {
      id: "author-002",
      name: "María López",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b993?w=150&h=150&fit=crop&crop=face",
      email: "maria.lopez@empresa.com"
    },
    createdAt: "2024-01-08T11:00:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
    publishedAt: "2024-01-08T12:00:00Z",
    version: 2,
    viewCount: 189,
    rating: {
      helpful: 35,
      notHelpful: 2,
      average: 4.6
    },
    relatedArticles: ["kb-001", "kb-008"],
    metadata: {
      estimatedReadTime: 7,
      difficulty: "intermediate",
      lastReviewedAt: "2024-01-12T16:45:00Z",
      reviewedBy: "Carlos Rodríguez"
    }
  },
  {
    id: "kb-003",
    title: "Instalación y configuración de software antivirus corporativo",
    content: `# Instalación de Antivirus Corporativo

## Antes de comenzar
- Desinstale cualquier software antivirus previo
- Asegúrese de tener permisos de administrador
- Cierre todas las aplicaciones abiertas

## Proceso de instalación

### Paso 1: Descarga del software
1. Acceda al portal de software corporativo
2. Busque "Antivirus Empresarial"
3. Descargue la versión más reciente
4. Verifique la integridad del archivo descargado

### Paso 2: Instalación
1. Ejecute el instalador como administrador
2. Acepte los términos de licencia
3. Seleccione instalación "Corporativa"
4. Ingrese la clave de licencia proporcionada por TI
5. Complete la instalación y reinicie si es necesario

### Paso 3: Configuración inicial
- **Actualizaciones automáticas:** Habilitadas
- **Análisis programado:** Diario a las 2:00 AM
- **Protección en tiempo real:** Siempre activa
- **Firewall integrado:** Configuración corporativa

## Configuraciones importantes

### Exclusiones necesarias
El antivirus debe excluir:
- Carpetas de aplicaciones empresariales
- Bases de datos locales
- Herramientas de desarrollo (si aplica)
- Carpetas de backup automático

### Políticas de seguridad
- No deshabilite la protección en tiempo real
- No agregue exclusiones sin autorización de TI
- Reporte inmediatamente cualquier amenaza detectada
- Mantenga el software siempre actualizado

## Solución de problemas

### El antivirus no se instala
- Verifique permisos de administrador
- Desactive temporalmente Windows Defender
- Asegúrese de que no hay otro antivirus instalado

### Problemas de rendimiento
- Ajuste la configuración de análisis en tiempo real
- Configure análisis programados fuera del horario laboral
- Agregue exclusiones para aplicaciones críticas (con aprobación de TI)

### Errores de activación
- Verifique la conexión a internet
- Confirme que la clave de licencia es correcta
- Contacte a soporte para reactivación si es necesario

## Mantenimiento regular
- Actualice definiciones de virus diariamente
- Ejecute análisis completo semanalmente
- Revise logs de seguridad mensualmente
- Reporte actividad sospechosa inmediatamente`,
    summary: "Instrucciones detalladas para instalar, configurar y mantener el software antivirus corporativo, incluyendo configuraciones de seguridad y solución de problemas.",
    category: "cat-004",
    tags: ["antivirus", "seguridad", "instalación", "configuración", "malware", "protección"],
    status: "published",
    author: {
      id: "author-003",
      name: "Carlos Rodríguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      email: "carlos.rodriguez@empresa.com"
    },
    createdAt: "2024-01-05T14:00:00Z",
    updatedAt: "2024-01-14T10:20:00Z",
    publishedAt: "2024-01-05T15:00:00Z",
    version: 4,
    viewCount: 156,
    rating: {
      helpful: 28,
      notHelpful: 1,
      average: 4.8
    },
    relatedArticles: ["kb-012", "kb-019"],
    metadata: {
      estimatedReadTime: 8,
      difficulty: "intermediate",
      lastReviewedAt: "2024-01-14T10:20:00Z",
      reviewedBy: "Ana Martínez"
    }
  },
  {
    id: "kb-004",
    title: "Cómo realizar una copia de seguridad completa de Windows 10",
    content: "Guía paso a paso para crear copias de seguridad completas en Windows 10...",
    summary: "Aprende a proteger tus datos con copias de seguridad automáticas y manuales en Windows 10.",
    category: "cat-002",
    tags: ["backup", "windows", "seguridad", "datos"],
    status: "published",
    author: { id: "author-001", name: "Juan Pérez", email: "juan.perez@empresa.com" },
    createdAt: "2024-01-20T09:00:00Z",
    updatedAt: "2024-01-20T09:00:00Z",
    version: 1,
    viewCount: 89,
    rating: { helpful: 15, notHelpful: 0, average: 4.5 },
    metadata: { estimatedReadTime: 6, difficulty: "beginner" }
  },
  {
    id: "kb-005",
    title: "Configuración de impresoras de red corporativas",
    content: "Instrucciones para conectar y configurar impresoras de red...",
    summary: "Guía completa para configurar impresoras compartidas en la red corporativa.",
    category: "cat-001",
    tags: ["impresora", "red", "configuración", "hardware"],
    status: "published",
    author: { id: "author-002", name: "María López", email: "maria.lopez@empresa.com" },
    createdAt: "2024-01-19T14:00:00Z",
    updatedAt: "2024-01-19T14:00:00Z",
    version: 1,
    viewCount: 124,
    rating: { helpful: 22, notHelpful: 1, average: 4.4 },
    metadata: { estimatedReadTime: 4, difficulty: "intermediate" }
  },
  {
    id: "kb-006",
    title: "Solución de problemas de Microsoft Teams",
    content: "Problemas comunes y soluciones para Microsoft Teams...",
    summary: "Resuelve los problemas más frecuentes de audio, video y conectividad en Teams.",
    category: "cat-002",
    tags: ["teams", "videoconferencia", "audio", "video"],
    status: "published",
    author: { id: "author-003", name: "Carlos Rodríguez", email: "carlos.rodriguez@empresa.com" },
    createdAt: "2024-01-18T11:00:00Z",
    updatedAt: "2024-01-18T11:00:00Z",
    version: 1,
    viewCount: 201,
    rating: { helpful: 38, notHelpful: 2, average: 4.7 },
    metadata: { estimatedReadTime: 5, difficulty: "beginner" }
  },
  {
    id: "kb-007",
    title: "Configuración de VPN para trabajo remoto",
    content: "Paso a paso para configurar y usar la VPN corporativa...",
    summary: "Conecta de forma segura a la red corporativa desde cualquier ubicación.",
    category: "cat-003",
    tags: ["vpn", "remoto", "seguridad", "conexión"],
    status: "published",
    author: { id: "author-001", name: "Juan Pérez", email: "juan.perez@empresa.com" },
    createdAt: "2024-01-17T16:00:00Z",
    updatedAt: "2024-01-17T16:00:00Z",
    version: 1,
    viewCount: 167,
    rating: { helpful: 31, notHelpful: 1, average: 4.6 },
    metadata: { estimatedReadTime: 7, difficulty: "intermediate" }
  },
  {
    id: "kb-008",
    title: "Actualización de controladores de hardware",
    content: "Cómo mantener los drivers de tu PC actualizados...",
    summary: "Mantén tu hardware funcionando correctamente con drivers actualizados.",
    category: "cat-001",
    tags: ["drivers", "hardware", "actualización", "rendimiento"],
    status: "published",
    author: { id: "author-002", name: "María López", email: "maria.lopez@empresa.com" },
    createdAt: "2024-01-16T13:00:00Z",
    updatedAt: "2024-01-16T13:00:00Z",
    version: 1,
    viewCount: 93,
    rating: { helpful: 18, notHelpful: 0, average: 4.8 },
    metadata: { estimatedReadTime: 4, difficulty: "intermediate" }
  },
  {
    id: "kb-009",
    title: "Configuración de autenticación de dos factores",
    content: "Mejora la seguridad de tus cuentas con 2FA...",
    summary: "Protege tus cuentas corporativas con autenticación de dos factores.",
    category: "cat-004",
    tags: ["2fa", "seguridad", "autenticación", "protección"],
    status: "published",
    author: { id: "author-003", name: "Carlos Rodríguez", email: "carlos.rodriguez@empresa.com" },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    version: 1,
    viewCount: 312,
    rating: { helpful: 54, notHelpful: 3, average: 4.9 },
    metadata: { estimatedReadTime: 6, difficulty: "beginner" }
  },
  {
    id: "kb-010",
    title: "Optimización del rendimiento de aplicaciones web",
    content: "Técnicas para mejorar la velocidad de aplicaciones...",
    summary: "Optimiza el rendimiento de tus aplicaciones web corporativas.",
    category: "cat-006",
    tags: ["desarrollo", "performance", "web", "optimización"],
    status: "published",
    author: { id: "author-001", name: "Juan Pérez", email: "juan.perez@empresa.com" },
    createdAt: "2024-01-14T09:00:00Z",
    updatedAt: "2024-01-14T09:00:00Z",
    version: 1,
    viewCount: 76,
    rating: { helpful: 14, notHelpful: 1, average: 4.3 },
    metadata: { estimatedReadTime: 8, difficulty: "advanced" }
  },
  {
    id: "kb-011",
    title: "Gestión de contraseñas corporativas",
    content: "Mejores prácticas para crear y gestionar contraseñas...",
    summary: "Aprende a crear y gestionar contraseñas seguras en el entorno corporativo.",
    category: "cat-004",
    tags: ["contraseñas", "seguridad", "políticas", "gestión"],
    status: "published",
    author: { id: "author-002", name: "María López", email: "maria.lopez@empresa.com" },
    createdAt: "2024-01-13T15:00:00Z",
    updatedAt: "2024-01-13T15:00:00Z",
    version: 1,
    viewCount: 145,
    rating: { helpful: 27, notHelpful: 2, average: 4.5 },
    metadata: { estimatedReadTime: 5, difficulty: "beginner" }
  }
];

// Historial de versiones de muestra
export const articleHistory: ArticleHistory[] = [
  {
    id: "hist-001",
    articleId: "kb-001",
    version: 1,
    title: "Configuración de correo corporativo en dispositivos móviles",
    content: "Versión inicial del artículo...",
    changedBy: {
      id: "author-001",
      name: "Juan Pérez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    changedAt: "2024-01-10T09:00:00Z",
    changeDescription: "Creación inicial del artículo",
    changeType: "created"
  },
  {
    id: "hist-002",
    articleId: "kb-001",
    version: 2,
    title: "Cómo configurar el correo electrónico corporativo en dispositivos móviles",
    content: "Versión actualizada con más detalles...",
    changedBy: {
      id: "author-001",
      name: "Juan Pérez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    changedAt: "2024-01-12T11:30:00Z",
    changeDescription: "Agregada sección de solución de problemas para Android",
    changeType: "updated"
  },
  {
    id: "hist-003",
    articleId: "kb-001",
    version: 3,
    title: "Cómo configurar el correo electrónico corporativo en dispositivos móviles",
    content: "Versión actual con correcciones...",
    changedBy: {
      id: "author-002",
      name: "María López",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b993?w=150&h=150&fit=crop&crop=face"
    },
    changedAt: "2024-01-15T14:30:00Z",
    changeDescription: "Corrección de configuraciones SMTP y adición de notas de seguridad",
    changeType: "updated"
  }
];

// Datos para estadísticas de la base de conocimiento
export const knowledgeBaseStats = {
  totalArticles: 85,
  publishedArticles: 78,
  draftArticles: 5,
  archivedArticles: 2,
  totalViews: 12450,
  totalAuthors: 8,
  averageRating: 4.6,
  monthlyViews: [
    { month: "Ene", views: 1820 },
    { month: "Feb", views: 2150 },
    { month: "Mar", views: 1950 },
    { month: "Abr", views: 2380 },
    { month: "May", views: 2200 },
    { month: "Jun", views: 1950 }
  ],
  topCategories: [
    { name: "Software y Aplicaciones", articles: 23, views: 3450 },
    { name: "Correo Electrónico", articles: 18, views: 2890 },
    { name: "Hardware y Equipos", articles: 15, views: 2240 },
    { name: "Redes y Conectividad", articles: 12, views: 1980 }
  ],
  recentActivity: [
    {
      type: "article_created",
      articleTitle: "Configuración de VPN corporativa",
      author: "Roberto Sánchez",
      timestamp: "2024-01-16T10:30:00Z"
    },
    {
      type: "article_updated", 
      articleTitle: "Instalación de software antivirus",
      author: "Carlos Rodríguez",
      timestamp: "2024-01-15T16:20:00Z"
    },
    {
      type: "article_published",
      articleTitle: "Guía de respaldo en la nube",
      author: "Ana Martínez",
      timestamp: "2024-01-15T14:10:00Z"
    }
  ]
};