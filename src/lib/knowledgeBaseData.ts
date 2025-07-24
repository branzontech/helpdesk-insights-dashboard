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