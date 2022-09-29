const client = io();

const form = document.querySelector('form');
const input = document.querySelector('#textBox');

client.on('message', (data) => {

    const msg = document.createElement('div');

    const content = document.createElement('p');
    if (data.username == input.value) {
        content.className = "me";
        content.textContent = "Me";
    }
    else {
        content.className = "others";
        content.textContent = data.msg;
    }

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
    }
})



