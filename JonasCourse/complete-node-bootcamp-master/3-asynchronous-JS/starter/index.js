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
// fs.readFile('./dog.txt', (err, data) => {
//   if (err) return console.log(`There was an error: ${err}`);
//   console.log(`Breed: ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log('Random dog image saved!');
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

// 3-Building Promises (Retrun a promise everytime to create a chain of then())
const readFileProm = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('Couldnt find the file');
      resolve(data);
    });
  });
};
const writeFileProm = (imgUrl) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./dog-img.txt', imgUrl, (err) => {
      if (err) reject('Couldnt write to the file🥶');
      resolve('Success🥳');
    });
  });
};

// 4-Async/Await
// readFileProm('./dog.txt')
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFileProm(res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image saved!');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

const getDogPic = async () => {
  try {
    const data = await readFileProm('./dog.txt');
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFileProm(res.body.message);
    console.log('Random dog image saved!');
  } catch (err) {
    console.log(err.message);
    throw(err)
  }
};
getDogPic();
