const UserSchema = require("../schema/UserSchema");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const SECRET = process.env.JWT_SECRET;

const UserValidate = {
  SignIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const result = await UserSchema.findOne({ email });
        if (result && result.password == password) {
          const token = await JWT.sign(
            { name: result.name, email: result.email },
            SECRET
          );
          return res
            .status(200)
            .json({ message: token, error: false, response_code: 200 });
        }
      }
      return res
        .status(200)
        .json({ message: "error occured", error: true, response_code: 400 });
    } catch (err) {
      return res
        .status(200)
        .json({ message: "server error", error: true, response_code: 500 });
    }
  },
  SignUp: async (req, res) => {
    try {
      const { email, name, password } = req.body;
      if (email && password && name) {
        const result = await UserSchema.findOne({ email });
        if (!result) {
          const create = await UserSchema.create({ email, password, name });
          if (create) {
            return res
              .status(200)
              .json({ message: "created", error: false, response_code: 200 });
          }
        } else {
          return res
            .status(200)
            .json({ message: "user exists", error: true, response_code: 400 });
        }
      }
      return res
        .status(200)
        .json({ message: "check values", error: true, response_code: 400 });
    } catch {
      return res
        .status(200)
        .json({ message: "server error", error: true, response_code: 500 });
    }
  },
};

module.exports = UserValidate;
