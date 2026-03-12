# Multi-Framework Chat Realtime (React + Vue 3)

Este repositorio contiene la implementación de una prueba técnica que evalúa la capacidad de integrar comunicación en tiempo real siguiendo los estándares de **Rubrik App**.

## ✅ Funcionalidades Implementadas

- **Conexión en tiempo real** con Socket.io (con reconexión automática).
- **Persistencia de mensajes** en `localStorage` (los mensajes sobreviven al recargar la página).
- **Scroll automático** al recibir nuevos mensajes.
- **Interfaz moderna** con animaciones (Framer Motion / Vue Transitions).
- **TypeScript** estricto en ambos proyectos.
- **Manejo de estado robusto**: `Zustand` (React) y `Pinia` (Vue).

## 🚀 Demos en Vivo

- **React App**: [https://frontend-socket-test-react-chat.vercel.app/](https://frontend-socket-test-react-chat.vercel.app/)
- **Vue App**: [https://frontend-socket-test-vue-chat.vercel.app/](https://frontend-socket-test-vue-chat.vercel.app/)
- **Backend (API/Socket)**: [https://nestjs-socket-server.onrender.com](https://nestjs-socket-server.onrender.com)

---

## 🏛️ Arquitectura y Decisiones Técnicas

El proyecto fue construido siguiendo principios **SOLID**, con un fuerte enfoque en SRP (Separation Rules of Principles) dictaminado por la guía técnica de Rubrik:

### React Chat (`/react-chat`)
1.  **Capa de Servicios**: La conexión, desconexión y emisión principal del webSocket se encapsula de forma **singleton** en `SocketService`.
2.  **Manejo de Estado Global (Zustand)**: En lugar de mezclar hooks locales que pudiesen producir *multi-listeners* al socket, se decidió implementar `Zustand` en la capa de `stores`. Su función de inicialización conecta listeners e hidrata el estado general sin depender de la UI.
3.  **UI Components**: `App.tsx` solo reacciona a los cambios en el Store (`isConnected`, `messages`) delegando completamente la representación visual a componentes base tipados y modulares (Card, Button, Input) siguiendo el patrón de *Smart & Dumb Components*.

### Vue Chat (`/vue-chat`)
1.  **Capa de Servicios**: Igual que en React, `socket.service.ts` se encarga de la comunicación base pura.
2.  **Manejo de Estado Centralizado (Pinia)**: Se expone el origen de los datos a través del Store `useChatStore`. Dispone de `initialize()` y `destroy()` explícitos para suscribirse y desuscribirse garantizando el correcto Cleanup del ciclo de vida (evitando fugas de memoria).
3.  **Composición Funcional**: Con *Composition API* y `<script setup>` la reactividad está completamente enrutada a las interfaces UI.

---

## 🛠️ Requisitos del Sistema

| Herramienta | Versión mínima |
| :--- | :--- |
| **Node.js** | v18.x o superior |
| **npm** | v9.x o superior |

---

## 🚀 Cómo empezar

### 1. Backend de Sockets (NestJS)
El servidor oficial está desplegado en: **[https://nestjs-socket-server.onrender.com](https://nestjs-socket-server.onrender.com)**.

Si prefieres ejecutarlo localmente:
```bash
cd D:\Pruebas tecnicas\nestjs-socket-server
npm install
npm run start:dev
```
*Por defecto corre en `http://localhost:3001`.*

### 2. Configuración de Variables de Entorno
Cada frontend utiliza un archivo `.env` para apuntar al servidor. Hemos incluido un `.env.example` en cada carpeta.

Asegúrate de tener un archivo `.env` en cada frontend:
```bash
# Ejemplo de contenido en .env
VITE_SOCKET_URL=https://nestjs-socket-server.onrender.com
```

### 3. Instalación de dependencias (Frontend)
Ejecuta los siguientes comandos desde la raíz del proyecto `frontend-socket-test`:

```bash
# Instalar dependencias de React
cd react-chat && npm install

# Instalar dependencias de Vue
cd ../vue-chat && npm install
```

### 3. Iniciar Aplicaciones Frontend

Una vez el backend esté corriendo, inicia los frontends en terminales separadas.

**React:**
```bash
cd react-chat
npm run dev
```
*Acceso: http://localhost:5173 (o puerto indicado por Vite)*

**Vue 3:**
```bash
cd vue-chat
npm run dev
```
*Acceso: http://localhost:5174 (o puerto indicado por Vite)*


