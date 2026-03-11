# Multi-Framework Chat Realtime (React + Vue 3)

Este repositorio contiene la base para una prueba técnica que evalúa la capacidad de integrar comunicación en tiempo real en dos de los frameworks más populares del ecosistema JavaScript.

---

## 🛠️ Requisitos del Sistema

| Herramienta | Versión mínima |
| :--- | :--- |
| **Node.js** | v18.x o superior |
| **npm** | v9.x o superior |

---

## 🚀 Cómo empezar

### 1. Instalación de dependencias
Ejecuta los siguientes comandos desde la raíz del proyecto para preparar los entornos:

```bash
# Instalar dependencias del servidor
npm install socket.io

# Instalar dependencias de React
cd react-chat && npm install

# Instalar dependencias de Vue
cd ../vue-chat && npm install
```

### 2. Levantar el Servidor de WebSocket
En una terminal aparte, inicia el backend de referencia:
```bash
node server.js
```

### 3. Iniciar Aplicaciones Frontend

**React:**
```bash
cd react-chat
npm run dev
```

**Vue 3:**
```bash
cd vue-chat
npm run dev
```

---

## 📑 Documentación Adicional
- [**Instrucciones Detalladas**](instrucciones_prueba_tecnica.md): Objetivos y criterios de evaluación.
- [**Respuestas Técnicas**](answers.md): Cuestionario para completar.
- [**Análisis de Arquitectura**](architecture.md): Documento para describir tu solución.

---

## ✅ Criterios de Éxito
- Ambas aplicaciones se conectan al servidor.
- Los mensajes enviados desde una aplicación se reciben en la otra en tiempo real.
- El código sigue estándares de limpieza y modularidad.
- Se entregan los documentos de arquitectura y respuestas completos.

¡Mucho éxito en la prueba!
