const fs = require('fs');
const superagent = require('superagent');

// 1-callback method
// fs.readFile('./dog.txt', (err, data) => {
//   if (err) return console.log(`There was an error: ${err}`);
//   console.log(`Breed: ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//         if (err) return console.log(`There was an error: ${err}`);
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.log(`There was an error: ${err}`);
//         console.log('Random dog image saved!');
//       });
//     });
// });

// 2-Promises
fs.readFile('./dog.txt', (err, data) => {
  if (err) return console.log(`There was an error: ${err}`);
  console.log(`Breed: ${data}`);
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log('Random dog image saved!');
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
