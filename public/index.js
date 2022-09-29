const client = io();

const form = document.querySelector('form');
const input = document.querySelector('#textBox');

client.on('message', (data) => {

    const msg = document.createElement('div');

    const content = document.createElement('p');
    content.className = "others";
    content.textContent = data.msg;

    const user = document.createElement('p');
    user.className = "username"
    user.textContent = data.username

    msg.append(user);
    msg.append(content);

    document.querySelector(".chatroom").append(msg);
    console.log(msg);
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        const user = document.querySelector("#username").value
        var data = {
            msg: input.value,
            username: user
        }
        client.emit('message', data);

        input.value = '';


        const msg = document.createElement('div');

        const content = document.createElement('p');
        content.className = "me";
        content.textContent = data.msg;

        const username = document.createElement('p');
        username.className = "username";
        username.textContent = "Me";

        msg.append(username);
        msg.append(content);

        document.querySelector(".chatroom").append(msg);
    }
})



