const fs = require('fs');
const superagent = require('superagent');

const content = fs.readFile('./dog.txt', (err, data) => {
  if (err) return console.log(`There was an error: ${err}`);
  console.log(`Breed: ${data}`);
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
        if (err) return console.log(`There was an error: ${err}`);
      console.log(res.body.message);

      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        if (err) return console.log(`There was an error: ${err}`);
        console.log('Random dog image saved!');
      });
    });
});
