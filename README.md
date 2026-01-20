# 🏥 Neo SISOL - Sistema de Gestión de Citas Médicas

Sistema web completo para la gestión de citas médicas desarrollado con Angular y Node.js.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración de Base de Datos](#configuración-de-base-de-datos)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Usuarios de Prueba](#usuarios-de-prueba)
- [Funcionalidades](#funcionalidades)

---

## ✨ Características

- ✅ Sistema de autenticación con roles (Paciente, Médico, Administrador)
- ✅ Gestión completa de citas médicas
- ✅ Dashboard personalizado por tipo de usuario
- ✅ Verificación de disponibilidad en tiempo real
- ✅ Procesamiento de pagos con múltiples métodos
- ✅ Historial médico de pacientes
- ✅ Gestión de especialidades y médicos
- ✅ Interfaz moderna y responsive

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Angular 21.0.0** - Framework principal
- **TypeScript 5.9.2** - Lenguaje de programación
- **RxJS 7.8.0** - Programación reactiva
- **CSS Vanilla** - Estilos personalizados (sin frameworks)

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js 4.18.2** - Framework web
- **MySQL 2** - Base de datos relacional
- **bcryptjs** - Encriptación de contraseñas
- **jsonwebtoken** - Autenticación JWT

---

## 📦 Requisitos Previos

Antes de instalar el proyecto, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** (viene con Node.js)
- **MySQL** (versión 8 o superior) - [Descargar aquí](https://dev.mysql.com/downloads/mysql/)
- **Git** (opcional) - [Descargar aquí](https://git-scm.com/)

### Verificar instalaciones:
```bash
node --version    # Debe mostrar v18.x.x o superior
npm --version     # Debe mostrar 9.x.x o superior
mysql --version   # Debe mostrar 8.x.x o superior
```

---

## 🚀 Instalación

### 1. Clonar o Descargar el Proyecto

Si tienes Git:
```bash
git clone <url-del-repositorio>
cd neo_sisol_angular
```

O simplemente descomprime el archivo ZIP en una carpeta.

### 2. Instalar Dependencias del Backend

```bash
cd backend
npm install
```

### 3. Instalar Dependencias del Frontend

```bash
cd ../frontend
npm install
```

---

## 🗄️ Configuración de Base de Datos

### 1. Crear la Base de Datos

Abre MySQL Workbench o la terminal de MySQL y ejecuta:

```sql
CREATE DATABASE sisol_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Crear archivo de configuración `.env`

En la carpeta `backend`, crea un archivo llamado `.env` con el siguiente contenido:

```env
# Configuración de Base de Datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=sisol_db
DB_PORT=3306

# Configuración del Servidor
PORT=3000
NODE_ENV=development

# JWT Secret (puedes usar cualquier texto largo y aleatorio)
JWT_SECRET=mi_clave_secreta_super_segura_123456
```

**⚠️ IMPORTANTE:** Reemplaza `tu_contraseña_mysql` con tu contraseña real de MySQL.

### 3. Ejecutar Scripts SQL

En el orden indicado, ejecuta los siguientes archivos SQL desde MySQL Workbench o terminal:

```bash
# Desde la carpeta database/
mysql -u root -p sisol_db < schema.sql
mysql -u root -p sisol_db < populate-especialidades.sql
mysql -u root -p sisol_db < seed_medicos.sql
mysql -u root -p sisol_db < create_admin.sql
```

O desde MySQL Workbench:
1. Abre cada archivo `.sql` en orden
2. Selecciona la base de datos `sisol_db`
3. Ejecuta el script (botón ⚡ o Ctrl+Shift+Enter)

**Orden de ejecución:**
1. `schema.sql` - Crea las tablas
2. `populate-especialidades.sql` - Inserta especialidades médicas
3. `seed_medicos.sql` - Inserta médicos de prueba
4. `create_admin.sql` - Crea usuario administrador

---

## ▶️ Ejecución del Proyecto

### 1. Iniciar el Backend

Abre una terminal en la carpeta `backend`:

```bash
cd backend
npm run dev
```

Deberías ver:
```
✅ Conexión exitosa a la base de datos MySQL
🚀 Servidor corriendo en http://localhost:3000
```

### 2. Iniciar el Frontend

Abre **OTRA** terminal en la carpeta `frontend`:

```bash
cd frontend
npm start
```

Deberías ver:
```
** Angular Live Development Server is listening on localhost:4200 **
```

### 3. Abrir en el Navegador

Abre tu navegador y ve a:
```
http://localhost:4200
```

---

## 👥 Usuarios de Prueba

### Administrador
- **Email:** `admin@sisol.com`
- **Contraseña:** `admin123`

### Médico (Ejemplo)
- **Email:** `doctor@sisol.com`
- **Contraseña:** `doctor123`

### Paciente
Puedes registrarte desde la interfaz o crear uno manualmente en la base de datos.

---

## 📁 Estructura del Proyecto

```
neo_sisol_angular/
├── backend/                    # Servidor Node.js + Express
│   ├── config/                 # Configuración de BD
│   ├── routes/                 # Rutas de la API
│   │   ├── auth.js            # Autenticación
│   │   ├── citas.js           # Gestión de citas
│   │   ├── pagos.js           # Procesamiento de pagos
│   │   └── ...
│   ├── server.js              # Punto de entrada
│   ├── package.json           # Dependencias backend
│   └── .env                   # Variables de entorno (crear)
│
├── frontend/                   # Aplicación Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # Componentes de la app
│   │   │   │   ├── login/
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── patient/
│   │   │   │   │   ├── doctor/
│   │   │   │   │   └── admin/
│   │   │   │   └── ...
│   │   │   └── services/      # Servicios Angular
│   │   └── styles.css         # Estilos globales
│   └── package.json           # Dependencias frontend
│
├── database/                   # Scripts SQL
│   ├── schema.sql             # Estructura de tablas
│   ├── populate-especialidades.sql
│   ├── seed_medicos.sql
│   └── create_admin.sql
│
└── README.md                   # Este archivo
```

---

## 🎯 Funcionalidades

### Para Pacientes
- ✅ Registro e inicio de sesión
- ✅ Agendar citas médicas
- ✅ Seleccionar especialidad y médico
- ✅ Verificar disponibilidad de horarios
- ✅ Procesar pagos (Tarjeta, Transferencia, Yape/Plin)
- ✅ Ver historial de citas
- ✅ Descargar informes médicos

### Para Médicos
- ✅ Ver agenda de citas
- ✅ Iniciar consultas
- ✅ Registrar triaje (signos vitales)
- ✅ Registrar antecedentes médicos
- ✅ Crear diagnósticos
- ✅ Prescribir tratamientos
- ✅ Ver historial de pacientes

### Para Administradores
- ✅ Gestión de médicos
- ✅ Asignación de horarios
- ✅ Gestión de especialidades
- ✅ Modificación de precios
- ✅ Reportes del sistema

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to MySQL"
- Verifica que MySQL esté corriendo
- Revisa las credenciales en el archivo `.env`
- Asegúrate de que la base de datos `sisol_db` exista

### Error: "Port 3000 already in use"
- Cierra otras aplicaciones que usen el puerto 3000
- O cambia el puerto en el archivo `.env`

### Error: "Port 4200 already in use"
- Cierra otras instancias de Angular
- O usa: `ng serve --port 4201`

### Error: "Module not found"
- Ejecuta `npm install` en las carpetas `backend` y `frontend`

---

## 📞 Contacto

Para dudas o consultas sobre el proyecto, contactar al desarrollador.

---

## 📄 Licencia

Este proyecto es de uso académico para el curso de Desarrollo de Aplicaciones Backend.

---

**Desarrollado con ❤️ usando Angular + Node.js + MySQL**