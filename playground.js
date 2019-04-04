
const promise = fetch('https://jsonplaceholder.typicode.com/todos/1');

let data;

promise.then((res) => {
  return res.json();
}).then(res => {
  data = res;
  return data.title;
})
.then(res => {
  data
}).then(res => {
})
.catch((err) => {
  console.log('some error', err);
})


const ownPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('yeaaaa resolved')
  }, 3000);
});

function onResolve(data) {
  // console.log('data: ', data);
}
ownPromise.then(onResolve)
  .catch((err) => {
  // console.log('some error', err);
})





const getPage = () => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/');
  
    xhr.onload = function() {
      resolve(this.response);
    }
    xhr.send();
  })
}

getPage().then((res) => {
  // console.log('res: ', res);
});



// Promise.all
// Promise.race
// Promise.resolve




Promise.all([getPage(), promise])
  .then((res) => {
    // console.log('res: ', res);
  });


const asyncFunc = async () => {
  try {
    // console.log('begin');
    const result = await Promise.all([ownPromise, getPage()]);
    // console.log('result', result);
  } catch(err) {
    console.log('err: ', err);
  }
}

asyncFunc();
