const UserSchema = require("../schema/UserSchema.js");
const ChatSchema = require("../schema/ChatSchema.js");

const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const SECRET = process.env.JWT_SECRET;

const UserValidate = {
  getHomeData: async (req, res) => {
    try {
      const { token } = req.body;

      if (token) {
        const userObj = await JWT.verify(token, SECRET);
        const result = await UserSchema.findOne({ email: userObj.email });

        if (result) {
          const data = {
            username: result.name,
            email : result.email,
            friends: result.friends.map((single) => ({
              name: single.name,
              email: single.email,
              room_id : single.room_id
            })),
            requests: result.requests.map((single) => ({
              name: single.name,
              email: single.email,
            })),
          };
          return res
            .status(200)
            .json({ message: data, error: false, response_code: 200 });
        }
      }
      return res
        .status(200)
        .json({ message: "error occured", error: true, response_code: 400 });
    } catch (err) {
      console.log(err);
      return res
        .status(200)
        .json({ message: "server error", error: true, response_code: 500 });
    }
  },
  addFriend: async (req, res) => {
    try {
      const { token, email } = req.body;
      if (token && email) {
        const userObj = await JWT.verify(token, SECRET);
        const result = await UserSchema.findOne({ email: email });


        if (email && userObj.email) {
          return res.status(200).json({
            message: "Cannot send to self",
            error: true,
            response_code: 300,
          });
        }



        let found = false;

        for (var i of result.requests) {
          if (i.email == userObj.email) {
            found = true;
            break;
          }
        }

        if (result && userObj && found) {
          return res.status(200).json({
            message: "request already sent",
            error: true,
            response_code: 400,
          });
        }

        found = false;

        for (var i of result.friends) {
          if (i.email == userObj.email) {
            found = true;
            break;
          }
        }

        if (result && userObj && found) {
          return res.status(200).json({
            message: "already friends",
            error: true,
            response_code: 400,
          });
        }

        if (result) {
          const addUser = await UserSchema.updateOne(
            { email: email },
            {
              $push: { requests: { name: userObj.name, email: userObj.email } },
            }
          );
          return res
            .status(200)
            .json({
              message: "request sent",
              error: false,
              response_code: 200,
            });
        }
      }
      return res
        .status(200)
        .json({ message: "error occured", error: true, response_code: 400 });
    } catch (err) {
      console.log(err);
      return res
        .status(200)
        .json({ message: "server error", error: true, response_code: 500 });
    }
  },
  AcceptFriend: async (req, res) => {
    try {
      const { token, email } = req.body;
      if (token && email) {
        const userObj = await JWT.verify(token, SECRET);
        const result = await UserSchema.findOne({ email: email });
        const user = await UserSchema.findOne({ email: userObj.email });

        let found = false;

        for (var i of user.requests) {
          if (i.email == email) {
            found = true;
            break;
          }
        }

        if (result && userObj && found) {
          const room_id = JWT.sign({data:[userObj.email,email]},SECRET);

          const addUser = await UserSchema.updateOne(
            { email: userObj.email },
            {
              $pull: { requests: { email: email } },
              $push: { friends: { name: result.name, email: result.email , room_id } },
            }
          );

          
          const updateFriend = await UserSchema.updateOne(
            { email },
            {
              $push: { friends: { name: user.name, email: user.email , room_id } },
            }
          );

          const createChat = await ChatSchema.create({id:room_id});


          return res
            .status(200)
            .json({
              message: "friend added",
              error: false,
              response_code: 200,
            });
        }
      }
      return res
        .status(200)
        .json({ message: "error occured", error: true, response_code: 400 });
    } catch (err) {
      console.log(err);
      return res
        .status(200)
        .json({ message: "server error", error: true, response_code: 500 });
    }
  },
};

module.exports = UserValidate;
