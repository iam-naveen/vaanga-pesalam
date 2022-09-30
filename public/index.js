const client = io();

const form = document.querySelector("form");
const input = document.querySelector("#textBox");
const user = document.querySelector("#username");
const chatbox = document.querySelector(".chatroom");

client.on("message", (data) => {
  const content = document.createElement("p");
  content.textContent = data.msg;
  content.className = "message";
  const msg = document.createElement("div");

  const name = document.createElement("p");
  name.className = "username";

  const last = chatbox.lastChild;

  if (data.id === client.id) {
    if (last == null || last.id != client.id) name.textContent = "You";
    msg.className = "me";
  } else {
    if (last.id != data.id) name.textContent = data.username;
    msg.className = "others";
  }

  if (last.id != data.id) {
    msg.append(name);
    msg.append(content);
    msg.id = data.id;
    chatbox.append(msg);
  } else last.append(content);

  chatbox.scrollTo(0, chatbox.scrollHeight);

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

client.on("traffic", (message) => {
  let p = document.createElement("p");
  p.append(message);
  chatbox.append(p);
});
