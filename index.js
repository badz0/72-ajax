// get users -> 
// GET https://jsonplaceholder.typicode.com/users?search=Ihor&limit=20
// get user -> GET https://jsonplaceholder.typicode.com/users?id=212312
// get user -> GET https://jsonplaceholder.typicode.com/users/212312
// create user -> POST https://jsonplaceholder.typicode.com/users
// update user -> PUT https://jsonplaceholder.typicode.com/users/212312
// delete user -> DELETE https://jsonplaceholder.typicode.com/users/212312

// path variable / query params


const API = 'https://jsonplaceholder.typicode.com/';

let users = [];
const container = document.querySelector('.users');
const nameEl = document.querySelector('#name');
const emailEl = document.querySelector('#email');
const btnCreate = document.querySelector('#create');

btnCreate.addEventListener('click', (event) => {
  const user = {
    name: nameEl.value,
    email: emailEl.value
  };
  console.log('user: ', user);
  fetch(API + 'users', {
    method: 'POST',
    body: JSON.stringify(user)
  }).then((res) => {
      return res.json(); 
    })
    .then((data) => {
      user.id = data.id;
      users.unshift(user);
      renderUsers();
    }).catch(err => {
      console.log(err);
    }) 
})

function getUsers() {
  return fetch(API + 'users').then(res => res.json())
    .catch(err => {
      console.log('Cant get users', err);
    });
}

async function deleteUser(userId) {
  await fetch(API + 'users/' + userId, {
    method: 'DELETE'
  })
  users = users.filter((user) => user.id !== userId);
  renderUsers();
}

function renderUsers() {
  container.innerHTML = '';
  users.forEach((user) => {
    const div = document.createElement('div')
    div.className = 'user';
    div.innerHTML = `
      <h4>${user.name}</h4>
      <h5>${user.email}</h5>
    `
    const btn = document.createElement('button');
    btn.className = 'user__remove';
    btn.textContent = 'X';

    btn.addEventListener('click', () => {
      deleteUser(user.id);
    })
    div.append(btn);
    container.append(div);
  })
}

getUsers().then(data => {
  users = data;
  console.log('users: ', users);
  renderUsers();
});
