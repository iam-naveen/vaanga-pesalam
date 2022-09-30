const client = io();

const form = document.querySelector("form");
const input = document.querySelector("#textBox");
const user = document.querySelector("#username");
const chatbox = document.querySelector(".chatroom");

client.on("message", (data) => {
  const content = document.createElement("p");
  content.textContent = data.msg;
  content.id = data.id;

  const name = document.createElement("p");
  name.className = "username";

  const last = chatbox.lastChild;

  if (data.id === client.id) {
    if (last == null || last.id != client.id) name.textContent = "You";
    content.className = "me";
  } else {
    if (last.id != data.id) name.textContent = data.username;
    content.className = "others";
  }

  if (last.id != data.id) {
    const msg = document.createElement("div");
    msg.append(name);
    msg.append(content);
    msg.className = "message";
    msg.id = data.id;
    chatbox.append(msg);
  } else last.append(content);

  console.log(last.id);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    var data = {
      msg: input.value,
      username: user.value,
      id: client.id,
    };
    client.emit("message", data);

    input.value = "";
  }
});
