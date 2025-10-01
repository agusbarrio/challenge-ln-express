# Challenge Backend - Gestor de Catálogo

Este proyecto implementa un pequeño **gestor de catálogo** usando Node.js y MySQL.  
Permite buscar productos, ver detalles, realizar pedidos y consultar órdenes.

La API está documentada con **Swagger** y preparada para ser levantada fácilmente usando **Docker** o de forma local.

---

## 🔹 Requisitos previos

- Docker & Docker Compose (recomendado)
- Node.js >= 22 (si no usás Docker)
- MySQL (si no usás Docker)
- npm

---

## 🔹 Instalación con Docker (recomendado)

1. Copiar el archivo de ejemplo de variables de entorno:

```bash
cp .env.docker-example .env
```

2. Modificar `.env` si es necesario (puertos, credenciales, etc).

3. Levantar los servicios:

```bash
docker-compose up --build -d
```

4. **Inicializar la base de datos**:

```bash
# Crear tablas
docker-compose exec app node db/scripts/1-setupDb/index.js


# Insertar datos de ejemplo
docker-compose exec app node db/scripts/2-seedExampleData/index.js

# Crear primer usuario (opcional si la registración está habilitada)
docker-compose exec app node db/scripts/3-seedFirstUser/index.js
```

### Resultado:

- Backend en `http://localhost:3000`
- MySQL con base de datos inicializada y datos de prueba
- Swagger disponible en `http://localhost:3000/api-docs`
- Usuario admin: `admin` / `admin123`

### Para detener y limpiar:

```bash
docker-compose down -v
```

---

## 🔹 Instalación sin Docker

1. Copiar variables de entorno:

```bash
cp example.env .env
```

2. Instalar dependencias:

```bash
npm install
```

3. Inicializar la base de datos:

```bash
# Crear tablas
node db/scripts/1-setupDb

# Insertar datos de ejemplo
node db/scripts/2-seedExampleData

# Crear primer usuario (opcional)
node db/scripts/3-seedFirstUser
```

4. Ejecutar el backend:

```bash
npm start
```

5. Acceder a Swagger:

```
http://localhost:3000/api-docs
```

---

## 🔹 Variables de entorno

Ejemplo de `.env`:

```env
# APP
PORT=3000
JWT_SECRET=my_secret
JWT_EXPIRES_IN=1h
ENABLE_REGISTRATION=true
ENABLE_SWAGGER_DOCUMENTATION=true

# MYSQL CONFIG
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_ROOT_PASSWORD=root-password
MYSQL_DATABASE=challenge-ln

# DATABASE SEED
FIRST_USERNAME=ln-user
FIRST_PASSWORD=ln-password
```

**Explicación:**

- `PORT`: puerto donde corre el backend.
- `JWT_SECRET` / `JWT_EXPIRES_IN`: token de autenticación.
- `ENABLE_REGISTRATION`: permite registrar usuarios nuevos.
- `ENABLE_SWAGGER_DOCUMENTATION`: habilita la UI de Swagger.
- `MYSQL_*`: configuración de la base de datos.
- `FIRST_USERNAME` / `FIRST_PASSWORD`: primer usuario seed para pruebas.

---

## 🔹 Estructura del proyecto

```
├─ app.js            # Aplicación principal Express
├─ bin/              # Scripts de inicio
│  └─ www            # Servidor HTTP
├─ common/           # Utilidades comunes
│  ├─ ApiError.js    # Clase de error personalizada
│  └─ constants/     # Constantes de la aplicación
│     ├─ db.js       # Configuración de base de datos
│     └─ errorMessages.js # Mensajes de error
├─ constants/        # Constantes específicas
├─ controllers/      # Lógica de controladores
├─ db/               # Configuración y scripts de base de datos
│  ├─ index.js       # Conexión a MySQL
│  └─ scripts/       # Scripts de inicialización
├─ middlewares/      # Middlewares de Express
├─ repositories/     # Capa de acceso a datos
├─ routes/           # Rutas de Express
├─ services/         # Capa de servicios
├─ utils/            # Utilidades generales
├─ package.json      # Dependencias y scripts
└─ README.md         # Este archivo
```

---

## 🔹 Arquitectura

### ¿Por qué Express.js?

Se eligió **Express.js** como framework principal considerando las decisiones de diseño:

#### Decisiones de diseño

- **Esquema de base de datos preservado**: Se decidió mantener el esquema y datos de ejemplo proporcionados sin cambios o con modificaciones mínimas para respetar la estructura original del challenge.
- **Limitaciones de Strapi**: Esta decisión de preservar el esquema implicaba que no se podía aprovechar fácilmente el **Content Type Builder** de Strapi, una de sus características más potentes, debido a que el esquema ya estaba definido externamente.

#### Ventajas de Express para este caso

- **Flexibilidad total**: Permite trabajar directamente con el esquema existente sin restricciones de framework.
- **Control granular**: Acceso directo a MySQL sin capas de abstracción que limiten las consultas.
- **Simplicidad**: Framework ligero que no impone estructura rígida sobre datos predefinidos.
- **Rendimiento**: Sin overhead de ORM o generadores automáticos innecesarios.
- **Middleware personalizable**: Implementación directa de autenticación JWT, validación y manejo de errores.
