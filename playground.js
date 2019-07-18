
// setTimeout(() => {
//   console.log('hello');
//   setTimeout(() => {
//     console.log('How are you?');
//     setTimeout(() => {
//       console.log('Are you here?');
//       setTimeout(() => {
//         console.log('ok');
//         setTimeout(() => {
//           console.log('buy');
//         }, 3000);
//       }, 3000);
//     }, 3000);
//   }, 3000);
// }, 2000);

// pending -> resolved, reject.

function defer(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

// defer(2000)
//   .then(() => {
//     console.log('hello');
//     return defer(3000);
//   }).then(() => {
//     console.log('How are you?');
//     return defer(2000);
//   }).then(() => {
//     console.log('Are you here?');
//     return defer(1000);
//   }).then(() => {
//     console.log('ok');
//     return defer(500);
//   }).then(() => {
//     console.log('buy');
//   });

// async function dialog() {
//   await defer(2000)
//   console.log('hello');
//   await defer(3000);
//   console.log('How are you?');
//   await defer(2000);
//   console.log('Are you here?');
//   await defer(1000);
//   console.log('ok');
//   await defer(500);
//   console.log('buy');
// }

// dialog();

function ownFetch(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
  
    xhr.addEventListener('load', (event) => {
      resolve(xhr.response);
    });

    xhr.addEventListener('error', (err) => {
      reject(err);
    });

    xhr.send();
  })
}

async function getSmth() {
  try {
    const res = await ownFetch('https://google.com');
  } catch(err) {
    console.log('err: ', err);
  }
}

// getSmth();

// ownFetch('https://jsonplaceholder.typicode.com/')
//   .then((res) => {
//     console.log('first res');
//   }).catch((err) => {
//     console.dir(err);
//     console.log('Catch2 err: ', err);
//   }).finally(() => {
//     console.log('always called');
//   })
