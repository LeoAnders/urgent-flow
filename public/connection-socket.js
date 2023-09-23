const socket = io();

socket.on("new-request-notification", () => {
  if (Notification.permission === "granted") {
    new Notification("Um Novo Pedido Foi Adicionado", {
      body: "Isso e um texto",
    });
  }
});

document.getElementById("form-modal").addEventListener("submit", () => {
  socket.emit("new-notification");
});
