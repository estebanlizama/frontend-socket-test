const io = require("socket.io")(3001, {
  cors: { origin: "*" }
});

console.log("🚀 Servidor de Chat Realtime ejecutándose en http://localhost:3001");

io.on("connection", (socket) => {
  const userId = socket.id;
  console.log(`[INFO] Nuevo usuario conectado: ${userId}`);

  // Manejo de mensajes entrantes
  socket.on("message", (msg) => {
    console.log(`[CHAT] Mensaje de ${userId}:`, msg);
    
    // Retransmitir a todos los clientes conectados
    io.emit("message", {
      id: Date.now(),
      user: userId.substring(0, 5), // Avatar simplificado
      text: msg,
      timestamp: new Date().toISOString()
    });
  });

  socket.on("disconnect", (reason) => {
    console.log(`[WARN] Usuario ${userId} desconectado. Razón: ${reason}`);
  });

  // Manejo de errores básico
  socket.on("error", (err) => {
    console.error(`[ERROR] Error en socket ${userId}:`, err);
  });
});
