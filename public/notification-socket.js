const socket = io();

//notification new request
socket.on("new-notification", (data) => {
  if (Notification.permission === "granted") {
    const { name, date } = data;
    const localDate = new Date(date);
    const day = localDate.getUTCDate();
    const month = localDate.getMonth() + 1;
    const year = localDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    new Notification("Um Novo Pedido Foi Adicionado", {
      body: `Nome: ${name}\nData de Entrega: ${formattedDate}`,
      icon: "assets/icon-urgent-flow-1080px.png",
      requireInteraction: true,
    });
  }
});

document.getElementById("form-modal").addEventListener("submit", () => {
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  socket.emit("notification", { name, date });
});

//notification request concluded
socket.on("new-notification-concluded", (data) => {
  let { name } = data;
  if (Notification.permission === "granted") {
    new Notification("Pedido Concluído", {
      body: `Cliente: ${name}`,
      icon: "assets/icon-urgent-flow-1080px.png",
      requireInteraction: true,
    });
  }
});

document.getElementById("form-concluded").addEventListener("submit", () => {
  const name = document.querySelector('input[name="name"]').value;
  socket.emit("notification-concluded", { name });
});
