const bcrypt = require('bcrypt');

async function run(){
    const salt = await bcrypt.genSalt(10); //no. of times to run the alg. to generate the salt
    const hashed = await bcrypt.hash('1234', salt);
    console.log(salt);
    console.log(hashed);
}

run();