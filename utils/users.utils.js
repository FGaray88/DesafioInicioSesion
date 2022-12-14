const formatUserForDB = (userObj) => {
  const newUser = {
    email: userObj.username,
    password: userObj.password,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return newUser;
};

module.exports = {
  formatUserForDB,
}