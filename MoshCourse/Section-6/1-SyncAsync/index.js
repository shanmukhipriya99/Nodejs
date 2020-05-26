console.log('Before');
// getUser(1, (user) => {
//     console.log('User: ', user);
//     getRepo(user.gitHubUsername, (repos) => {
//         getCommits(repos[0], (commits) => {
//             console.log(commits);
//         });
//     });
// }); 

//Promise-based approach
// getUser(1)
// .then(user => getRepo(user.gitHubUsername))
// .then(repos => getCommits(repos[0]))
// .then(commits => console.log('Commits', commits))
// .catch(err => console.log('Error: ', err.message));

//Async await approach
async function displayCommits() {
    try {
        const user = await getUser(1);
    const repos = await getRepo(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
    }
    catch (err) {
        console.log ('Error ', err.message);
    }
    
}
displayCommits();

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        //some asynchronous code
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'shanmukhi'});
        }, 2000);    
    });  
}

function getRepo(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling github api...');
            resolve(['repo1', 'repo2']);
        }, 2000);
    }); 
}

function getCommits (repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling github api...');
            resolve(['commit']);
        }, 2000);
    });
}