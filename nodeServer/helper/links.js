const UserValidate = require("./userValidate");
const UserHandler = require("./userHandler")

const link = (app) => {
    app.post("/SignIn", async function (req, res) {
      UserValidate.SignIn(req,res);
    });
  
    app.post("/SignUp", async function (req, res) {
      UserValidate.SignUp(req,res);
    });
    
    app.post("/account/getdata", async function (req, res) {
      UserHandler.getHomeData(req,res);
    });
    
    app.post("/account/addfriend", async function (req, res) {
      UserHandler.addFriend(req,res);
    });
    
    app.post("/account/AcceptFriend", async function (req, res) {
      UserHandler.AcceptFriend(req,res);
    });
  };
  
  module.exports = link;