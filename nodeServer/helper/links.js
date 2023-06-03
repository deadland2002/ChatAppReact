const UserValidate = require("./userValidate");

const link = (app) => {
    app.post("/SignIn", async function (req, res) {
      UserValidate.SignIn(req,res);
    });
  
    app.post("/SignUp", async function (req, res) {
      UserValidate.SignUp(req,res);
    });
  };
  
  module.exports = link;