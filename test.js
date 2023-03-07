const promises = [
  new Promise((resolve, reject) => {
    console.log("Run 1")
    setTimeout(() => {
      resolve('Promise 1 resolved');
    }, 2000);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Promise 2 resolved');
    }, 1000);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Promise 3 resolved');
    }, 3000);
  })
];

Promise.all(promises)
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.error(error);
  });