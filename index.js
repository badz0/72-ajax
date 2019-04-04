
const API = 'https://jsonplaceholder.typicode.com/';

let users = [];

const getUsers = () => {
  return fetch(API + 'users').then(res => {
    return res.json();
  }).catch(err => {
    console.log('couldnt get users', err);
    return [];
  })
};

const deleteUser = async (userId, userElement) => {
  try {
    const res = await fetch(API + 'users/' + userId, {method: 'DELETE'});
    if (res.status !== 200) throw new Error();
    users = users.filter((item) => item.id !== userId);
    userElement.remove();
  } catch(err) {
    console.log('couldnt delete user', err);
  }
}

const renderUsers = () => {
  const container = document.querySelector('.users');

  container.innerHTML = '';

  users.forEach(item => {
    const userElement = document.createElement('div');
    userElement.classList.add('user');
    userElement.innerHTML = `
      <h4>${item.name}</h4>
      <h5>${item.email}</h5>
    `;
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('user__remove');
    removeBtn.textContent = 'X';
    removeBtn.addEventListener('click', () => {
      deleteUser(item.id, userElement)
    });

    userElement.append(removeBtn);
    container.append(userElement);
  });
}

const loadUsers = async () => {
  users = await getUsers();
  renderUsers()
}


const createUser = () => {
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;

  fetch(API + 'users', {
    method: 'POST',
    body: JSON.stringify({name: name, email: email})
  }).then(res => {
    return res.json();
  }).then(({id}) => {
    const user = {
      name,
      email,
      id
    };
    users.unshift(user)
    renderUsers();
  })
  .catch(err => {
    console.log('couldnt create a user', err);
  })

}

document.addEventListener('DOMContentLoaded', () => {
  const loadBtn = document.querySelector('.load-users')
  loadBtn.addEventListener('click', loadUsers);

  const createUserBtn = document.querySelector('#create-user-btn')
  createUserBtn.addEventListener('click', createUser);
});


