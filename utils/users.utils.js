const moment = require('moment');

const formatUserForDB = (userObj) => {
  const today = moment();

  const birthdate = moment(userObj.birthdate, "MMMM DD, YYYY").startOf('day');
  const userAge = today.diff(birthdate, 'years');
  const newUser = {
    email: userObj.email,
    password: userObj.password,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return newUser;
};

module.exports = {
  formatUserForDB,
}