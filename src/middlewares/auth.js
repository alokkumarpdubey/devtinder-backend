const adminAuth = (req, res, next) => {
  console.log("verifying adminauthentication");
  const token = "1234567890";
  const isUserAuthenticated = token === "1234567890";
  if (!isUserAuthenticated) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("verifying user authentication");
  const token = "1234567890";
  const isUserAuthenticated = token === "1234567890";
  if (!isUserAuthenticated) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
