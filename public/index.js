const client = io();

const form = document.querySelector('form');
const input = document.querySelector('#textBox');
const user = document.querySelector("#username")

client.on('message', (data) => {

    const msg = document.createElement('div');

    const content = document.createElement('p');
    content.textContent = data.msg;

    const name = document.createElement('p');
    name.className = "username"

    if (data.username == user.value) {
        name.textContent = "Me";
        content.className = "me";
    }
    else {
        name.textContent = data.username;
        content.className = "others";
    }

    msg.append(user);
    msg.append(content);

    document.querySelector(".chatroom").append(msg);
    console.log(msg);
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        var data = {
            msg: input.value,
            username: user.value
        }
        client.emit('message', data);

        input.value = '';
    }
})



