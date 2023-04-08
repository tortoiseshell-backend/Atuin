const { getUsersOver, insertUser } = require('./users.js');

const name = process.argv[2];
const age = process.argv[3];

console.log(name, age);
insertUser({name, age})
.then(() => {
  return getUsersOver(0);
})
.then((users) => {
  console.log(users);
})
.catch((err) => {
  throw new Error(err);
});
